import React, { useCallback, useMemo, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import {
  DocumentPickerResponse,
  pick,
  types,
} from '@react-native-documents/picker';
import * as RNFS from 'react-native-fs';
import Animated from 'react-native-reanimated';
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
import SearchBar from '../../components/Ui/SearchBar';

const File = () => {
  const [rootUri, setRootUri] = useState<DocumentPickerResponse | null>(null);

  const { colors } = useAppTheme();

  // Zustand selectors
  const fileImported = useDocuSwift(s => s.fileImported);
  const newImports = useDocuSwift(s => s.newImports);

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
  const renderFile = useCallback(
    ({ item }: { item: DocumentPickerResponse }) => <FileItem item={item} />,
    [],
  );

  return (
    <>
      <ScrollView
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, backgroundColor: colors.background }}
      >
        <LibraryHeader />

        {fileImported.length > 1 && (
          <View style={styles.vertical}>
            <SearchBar />
          </View>
        )}

        {actionItems.map(item => (
          <FileAction key={item?.id} item={item} />
        ))}

        <View style={styles.vertical}>
          <RowHeading title="This Month" isAll={false} />
        </View>

        <FlatList
          scrollEnabled={false}
          removeClippedSubviews
          data={fileImported}
          renderItem={renderFile}
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

  rowContainer: { paddingTop: 20, paddingBottom: 10 },

  animatedContainer: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    width: '100%',
  },
  contentContainer: {
    // marginBottom: 20,
    paddingTop: 5,
  },
  vertical: { paddingTop: 10 },
});
