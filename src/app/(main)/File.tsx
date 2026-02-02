import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback, useState } from 'react';
import { FileScan, FolderTree } from 'lucide-react-native';
import {
  DocumentPickerResponse,
  pick,
  types,
} from '@react-native-documents/picker';
import * as RNFS from 'react-native-fs';
import { useAppTheme } from '../../hooks/useAppTheme';
import { useDocuSwift } from '../../store/GlobalState';
import FileItem from '../../components/Ui/FileItem';
import { Toast } from '../../components/Global/ShowToast';
import { navigate } from '../../navigation/NavigationRef';
import LibraryHeader from '../../components/Header/LibraryHeader';
import { SearchBar } from 'react-native-screens';
import { wp } from '../../constant/Dimensions';
import CustomText from '../../components/Global/CustomText';
import Animated from 'react-native-reanimated';
import RowHeading from '../../components/Ui/RowHeading';

const File = () => {
  // const [files, setFiles] = useState<any[]>([]);
  const [rootUri, setRootUri] = useState<DocumentPickerResponse | undefined>();
  const { newImports, fileImported } = useDocuSwift();
  const { colors } = useAppTheme();

  const renderFile = useCallback(
    ({ item }: { item: DocumentPickerResponse }) => <FileItem item={item} />,
    [],
  );

  const handlePicker = async () => {
    try {
      const picker = await pick({
        type: [types.pdf, types.doc, types.docx, types.xls, types.xlsx],
        mode: 'open',
        allowMultiSelection: false,
        allowVirtualFiles: true,
        requestLongTermAccess: true,
      });
      const timestamp = new Date().getTime();
      const safeName =
        picker[0].name?.replace(/[^a-zA-Z0-9.\-_]/g, '_') || 'document.pdf';
      const destPath = `${RNFS.DocumentDirectoryPath}/${timestamp}_${safeName}`;

      try {
        await RNFS.copyFile(picker[0].uri, destPath);
      } catch (err) {
        console.log('Copy failed, trying read/write fallback', err);
        const data = await RNFS.readFile(picker[0].uri, 'base64');
        await RNFS.writeFile(destPath, data, 'base64');
      }

      if (await RNFS.exists(destPath)) {
        const newFile = { ...picker[0], uri: 'file://' + destPath };
        setRootUri(newFile);
        newImports(newFile);
      } else {
        throw new Error('File copy failed');
      }
    } catch (error) {
      console.log(error);
      Toast('Unable to access file');
    }
  };

  const openScanner = () => {
    navigate('Create');
  };

  const MappingComp = [
    {
      id: 1,
      title: 'Browse Device Files',
      desc: 'Open internal storage',
      onPress: handlePicker,
      icon: FolderTree,
    },
    {
      id: 2,
      title: 'Scan Document',
      desc: 'Scan using camera',
      onPress: openScanner,
      icon: FileScan,
    },
  ];

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={[styles.flex, { backgroundColor: colors.background }]}
      stickyHeaderIndices={[0]}
    >
      <LibraryHeader />
      {fileImported.length > 8 && <SearchBar />}

      {MappingComp.map(item => (
        <TouchableOpacity
          key={item.id}
          onPress={item.onPress}
          style={[styles.rowTouchable, { backgroundColor: colors.container }]}
        >
          <item.icon color={colors.primary} size={wp(6)} />
          <View style={styles.flex}>
            <CustomText fontWeight="medium" variant="h5">
              {item.title}
            </CustomText>
            <CustomText>{item.desc}</CustomText>
          </View>
        </TouchableOpacity>
      ))}

      {/* <FlatList
        scrollEnabled={false}
        data={fileImported}
        renderItem={({ item, index }) => <PDFView key={index} item={item} />}
      /> */}
      {rootUri && (
        <Animated.View style={styles.animatedContainer}>
          <FileItem item={rootUri} />
        </Animated.View>
      )}

      <View style={styles.rowContainer}>
        <RowHeading title={'This Month'} isAll={false} />
      </View>
      <FlatList
        scrollEnabled={false}
        removeClippedSubviews
        contentContainerStyle={styles.contentContainer}
        showsHorizontalScrollIndicator={false}
        data={fileImported}
        renderItem={renderFile}
      />
    </ScrollView>
  );
};

export default File;

const styles = StyleSheet.create({
  flex: { flex: 1 },

  rowContainer: { paddingTop: 20, paddingBottom: 10 },
  rowTouchable: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginTop: 10,
    elevation: 4,
    gap: 10,
  },
  animatedContainer: { position: 'absolute', bottom: 0, alignSelf: 'center' },
  contentContainer: {
    marginBottom: 20,
    paddingTop: 5,
  },
});
