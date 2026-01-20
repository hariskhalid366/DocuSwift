import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback, useState } from 'react';
import LibraryHeader from '../../components/Header/LibraryHeader';
import SearchBar from '../../components/Ui/SearchBar';
import CustomText from '../../components/Global/CustomText';
import { FileScan, FolderTree } from 'lucide-react-native';
import { wp } from '../../constant/Dimensions';
import { navigate } from '../../navigation/NavigationRef';
import {
  DocumentPickerResponse,
  pick,
  types,
} from '@react-native-documents/picker';
import * as RNFS from 'react-native-fs';
import FileItem from '../../components/Ui/FileItem';
import Animated from 'react-native-reanimated';
import { useDocuSwift } from '../../store/GlobalState';
import { Toast } from '../../components/Global/ShowToast';
import PDFView from '../../components/Ui/PDFView';
import RowHeading from '../../components/Ui/RowHeading';
import { useAppTheme } from '../../hooks/useAppTheme';

const File = () => {
  const [files, setFiles] = useState<any[]>([]);
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
      style={{ flex: 1, backgroundColor: colors.background }}
      stickyHeaderIndices={[0]}
    >
      <LibraryHeader />
      {files.length > 8 && <SearchBar />}

      {MappingComp.map(item => (
        <TouchableOpacity
          key={item.id}
          onPress={item.onPress}
          style={[styles.rowTouchable, { backgroundColor: colors.container }]}
        >
          <item.icon color={colors.primary} size={wp(6)} />
          <View style={{ flex: 1 }}>
            <CustomText fontWeight="medium" variant="h5">
              {item.title}
            </CustomText>
            <CustomText>{item.desc}</CustomText>
          </View>
        </TouchableOpacity>
      ))}

      <FlatList
        scrollEnabled={false}
        data={fileImported}
        renderItem={({ item, index }) => <PDFView key={index} item={item} />}
      />
      {rootUri && (
        <Animated.View
          style={{ position: 'absolute', bottom: 0, alignSelf: 'center' }}
        >
          <FileItem item={rootUri} />
        </Animated.View>
      )}

      <View style={{ paddingTop: 20, paddingBottom: 10 }}>
        <RowHeading title={'This Month'} isAll={false} />
      </View>
      <FlatList
        scrollEnabled={false}
        removeClippedSubviews
        contentContainerStyle={{
          marginBottom: 20,
          paddingTop: 5,
        }}
        showsHorizontalScrollIndicator={false}
        data={fileImported}
        renderItem={renderFile}
      />
    </ScrollView>
  );
};

export default File;

const styles = StyleSheet.create({
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
});
