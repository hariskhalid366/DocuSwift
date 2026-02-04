import React, { useCallback, useMemo, useState } from 'react';
import {
  FlatList,
  Image,
  LayoutAnimation,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {
  DocumentPickerResponse,
  pick,
  types,
} from '@react-native-documents/picker';
import * as RNFS from 'react-native-fs';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { FileScan, FolderTree } from 'lucide-react-native';
import { TextSelect } from 'lucide-react-native/icons';

import { useAppTheme } from '../../hooks/useAppTheme';
import { useDocuSwift } from '../../store/GlobalState';
import FileItem from '../../components/Ui/FileItem';
import { Toast } from '../../components/Global/ShowToast';
import { navigate } from '../../navigation/NavigationRef';
import LibraryHeader from '../../components/Header/LibraryHeader';
import RowHeading from '../../components/Ui/RowHeading';
import FileAction from '../../components/Ui/FileAction';
import FileItemGrid from '../../components/Ui/FileItemGrid';

const File = () => {
  const [rootUri, setRootUri] = useState<DocumentPickerResponse | null>(null);
  const [isGrid, setIsGrid] = useState<boolean>(false);

  const { colors } = useAppTheme();

  // Zustand selectors
  const fileImported = useDocuSwift(s => s.fileImported);
  const newImports = useDocuSwift(s => s.newImports);
  const { scans } = useDocuSwift();

  const displayedFiles = useMemo(
    () => fileImported.slice(0, 6),
    [fileImported],
  );

  /* ───────────── File Picker ───────────── */
  const handlePicker = useCallback(async () => {
    try {
      const [picked] = await pick({
        type: [types.pdf, types.doc, types.docx, types.xls, types.xlsx],
        mode: 'open',
        allowMultiSelection: false,
        allowVirtualFiles: true,
        requestLongTermAccess: true,
      });
      const timestamp = Date.now();
      const safeName =
        picked.name?.replace(/[^a-zA-Z0-9.\-_]/g, '_') ?? 'document.pdf';

      const destPath = `${RNFS.DocumentDirectoryPath}/${timestamp}_${safeName}`;

      try {
        await RNFS.copyFile(picked.uri, destPath);
      } catch {
        const data = await RNFS.readFile(picked.uri, 'base64');
        await RNFS.writeFile(destPath, data, 'base64');
      }

      if (!(await RNFS.exists(destPath))) {
        throw new Error('File copy failed');
      }

      const newFile = { ...picked, uri: `file://${destPath}` };
      setRootUri(newFile);
      newImports(newFile);
    } catch (err) {
      console.log(err);
      Toast('Unable to access file');
    }
  }, [newImports]);

  /* ───────────── Navigation ───────────── */
  const openScanner = useCallback(() => {
    navigate('Create');
  }, []);

  const openOcr = useCallback(() => {
    navigate('ocr');
  }, []);

  /* ───────────── Static Actions ───────────── */
  const actionItems = useMemo(
    () => [
      {
        id: 'browse',
        title: 'Browse Device Files',
        desc: 'Open internal storage',
        icon: FolderTree,
        onPress: handlePicker,
      },
      {
        id: 'scan',
        title: 'Scan Document',
        desc: 'Scan using camera',
        icon: FileScan,
        onPress: openScanner,
      },
      {
        id: 'ocr',
        title: 'Scan Image',
        desc: 'OCR using camera',
        icon: TextSelect,
        onPress: openOcr,
      },
    ],
    [handlePicker, openScanner, openOcr],
  );

  /* ───────────── Renderers ───────────── */
  const renderItem = useCallback(
    ({ item }: { item: DocumentPickerResponse }) => {
      return isGrid ? <FileItemGrid item={item} /> : <FileItem item={item} />;
    },
    [isGrid],
  );

  const handleToggleGrid = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsGrid(!isGrid);
  };

  const handlePressAll = useCallback(({ data, type }: any) => {
    navigate('AllFiles', { item: data, type: type });
  }, []);

  return (
    <>
      <ScrollView
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, backgroundColor: colors.background }}
      >
        <LibraryHeader onPress={handleToggleGrid} />

        {actionItems.map(item => (
          <FileAction key={item?.id} item={item} />
        ))}

        {scans.length > 0 && (
          <>
            <View style={styles.vertical}>
              <RowHeading
                onPress={() => handlePressAll({ data: scans, type: 'scans' })}
                title="Scaned Docs."
                isAll={scans.length > 8 ? true : false}
              />
            </View>
            <FlatList
              contentContainerStyle={{
                alignSelf: 'center',
              }}
              numColumns={4}
              scrollEnabled={false}
              data={scans.slice(0, 8)}
              renderItem={({ item }) => (
                <View key={item?.id} style={{ padding: 10 }}>
                  <Image
                    source={{ uri: item?.uri }}
                    style={{ width: 80, height: 80, borderRadius: 20 }}
                  />
                </View>
              )}
            />
          </>
        )}

        <View style={styles.vertical}>
          <RowHeading
            onPress={() =>
              handlePressAll({ data: fileImported, type: 'files' })
            }
            title="Recent Files"
            isAll={displayedFiles.length > 5 ? true : false}
          />
        </View>

        <Animated.FlatList
          key={isGrid ? 'grid' : 'list'}
          entering={FadeInDown.duration(500)}
          numColumns={isGrid ? 2 : 1}
          columnWrapperStyle={isGrid ? styles.columnWrapper : undefined}
          contentContainerStyle={
            isGrid ? styles.gridContainer : styles.listContainer
          }
          scrollEnabled={false}
          data={displayedFiles}
          renderItem={renderItem}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={5}
          removeClippedSubviews
          showsVerticalScrollIndicator={false}
        />
      </ScrollView>

      {rootUri && (
        <Animated.View
          style={{ position: 'absolute', bottom: 0, width: '100%' }}
        >
          <FileItem item={rootUri} isSelected setRootUri={setRootUri} />
        </Animated.View>
      )}
    </>
  );
};

export default File;

const styles = StyleSheet.create({
  flex: { flex: 1 },
  vertical: { paddingVertical: 10 },
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  gridContainer: {
    paddingBottom: 20,
    paddingHorizontal: 5,
  },
  listContainer: {
    paddingBottom: 20,
  },
});
