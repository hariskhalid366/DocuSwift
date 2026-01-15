import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import LibraryHeader from '../../components/Header/LibraryHeader';
import SearchBar from '../../components/Ui/SearchBar';
import CustomText from '../../components/Global/CustomText';
import { FileScan, FolderTree } from 'lucide-react-native';
import { colors } from '../../constant/colors';
import { wp } from '../../constant/Dimensions';
import { navigate } from '../../navigation/NavigationRef';
import {
  DocumentPickerResponse,
  pick,
  types,
} from '@react-native-documents/picker';
import FileItem from '../../components/Ui/FileItem';
import Animated from 'react-native-reanimated';
import { useDocuSwift } from '../../store/GlobalState';
import { Toast } from '../../components/Global/ShowToast';

const File = () => {
  const [files, setFiles] = useState<any[]>([]);
  const [rootUri, setRootUri] = useState<DocumentPickerResponse | undefined>();
  const { newImports } = useDocuSwift();

  const handlePicker = async () => {
    try {
      const picker = await pick({
        type: [types.pdf, types.doc, types.docx, types.xls, types.xlsx],
        mode: 'import',
        allowMultiSelection: false,
        allowVirtualFiles: false,
      });
      setRootUri(picker[0]);
      newImports(picker[0]);
    } catch (error) {
      console.log(error);
      Toast('Unable to access file');
    }
  };

  const openScanner = () => {
    navigate('Create');
  };

  const data = [
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
    <View style={{ flex: 1 }}>
      <LibraryHeader />
      {files.length > 8 && <SearchBar />}

      {data.map(item => (
        <TouchableOpacity
          key={item.id}
          onPress={item.onPress}
          style={styles.rowTouchable}
        >
          <item.icon color={colors.primery} size={wp(6)} />
          <View style={{ flex: 1 }}>
            <CustomText fontWeight="medium" variant="h5">
              {item.title}
            </CustomText>
            <CustomText>{item.desc}</CustomText>
          </View>
        </TouchableOpacity>
      ))}
      {rootUri && (
        <Animated.View
          style={{ position: 'absolute', bottom: 0, alignSelf: 'center' }}
        >
          <FileItem item={rootUri} />
        </Animated.View>
      )}
    </View>
  );
};

export default File;

const styles = StyleSheet.create({
  rowTouchable: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    backgroundColor: colors.container,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginTop: 10,
    elevation: 4,
    gap: 10,
  },
});
