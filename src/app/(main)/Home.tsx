import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import React, { useCallback, useEffect } from 'react';
import HomeHeader from '../../components/Header/HomeHeader';
import SearchBar from '../../components/Ui/SearchBar';
import Tile from '../../components/Ui/Tile';
import { wp } from '../../constant/Dimensions';
import { TilesList } from '../../constant/data';
import { ChipProps, TileProps } from '../../types/TabTypes';
import Chip from '../../components/Ui/Chip';
import RowHeading from '../../components/Ui/RowHeading';
import FileItem from '../../components/Ui/FileItem';
import { ensurePermission } from '../../utils/Permission';
import { useDocuSwift } from '../../store/GlobalState';
import { DocumentPickerResponse } from '@react-native-documents/picker';
import * as Lucide from 'lucide-react-native';
import { navigate } from '../../navigation/NavigationRef';

const Home = () => {
  const { fileImported } = useDocuSwift();

  useEffect(() => {
    ensurePermission();
  }, []);

  const renderTile = useCallback(
    ({ item }: { item: TileProps }) => <Tile item={item} />,
    [],
  );

  const renderFile = useCallback(
    ({ item }: { item: DocumentPickerResponse }) => <FileItem item={item} />,
    [],
  );
  const handleScan = (type: string) => {
    if (type === 'scan') navigate('Create', { create: true });
    if (type === 'text') navigate('Create');
    if (type === 'import') navigate('Files', { import: true });
  };

  const ChipList = [
    {
      id: 1,
      label: 'New Scan',
      icon: Lucide.Camera,
      onPress: handleScan,
      type: 'scan',
    },
    {
      id: 2,
      label: 'Text Scan',
      icon: Lucide.ScanTextIcon,
      onPress: handleScan,
      type: 'text',
    },
    {
      id: 3,
      label: 'Import',
      icon: Lucide.LucideFilePlus2,
      onPress: handleScan,
      type: 'import',
    },
    // {
    //   id: 4,
    //   label: 'Test Plugin',
    //   icon: Lucide.TestTube,
    //   onPress: () => navigate('pluginTest'),
    //   type: 'test',
    // },
  ];

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}
      stickyHeaderIndices={[0]}
    >
      <HomeHeader />
      <SearchBar />
      <FlatList
        removeClippedSubviews
        horizontal
        contentContainerStyle={styles.container}
        showsHorizontalScrollIndicator={false}
        data={TilesList}
        renderItem={renderTile}
      />
      <View style={styles.chipContainer}>
        {ChipList.map((item: ChipProps) => (
          <Chip key={item?.id} {...{ item }} />
        ))}
      </View>
      <RowHeading title={'Recent Document'} isAll={true} />
      <FlatList
        scrollEnabled={false}
        removeClippedSubviews
        contentContainerStyle={styles.flatlist}
        showsHorizontalScrollIndicator={false}
        data={fileImported}
        renderItem={renderFile}
      />
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  contentContainer: { gap: 10 },
  flatlist: {
    marginBottom: 20,
  },
  container: {
    gap: wp(6),
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  chipContainer: {
    gap: wp(2.5),
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingBottom: 5,
    flexDirection: 'row',
  },
});
