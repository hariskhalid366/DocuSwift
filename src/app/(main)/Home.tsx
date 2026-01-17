import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import React, { useCallback, useEffect } from 'react';
import HomeHeader from '../../components/Header/HomeHeader';
import SearchBar from '../../components/Ui/SearchBar';
import Tile from '../../components/Ui/Tile';
import { wp } from '../../constant/Dimensions';
import { ChipList, FILES, TilesList } from '../../constant/data';
import { ChipProps, FileProps, TileProps } from '../../types/TabTypes';
import Chip from '../../components/Ui/Chip';
import RowHeading from '../../components/Ui/RowHeading';
import FileItem from '../../components/Ui/FileItem';
import { ensurePermission } from '../../utils/Permission';
import { useDocuSwift } from '../../store/GlobalState';
import { DocumentPickerResponse } from '@react-native-documents/picker';

const Home = () => {
  const { fileImported } = useDocuSwift();

  useEffect(() => {
    ensurePermission();
  }, []);

  const data = FILES.slice(0, 5);

  const renderTile = useCallback(
    ({ item }: { item: TileProps }) => <Tile item={item} />,
    [],
  );

  const renderFile = useCallback(
    ({ item }: { item: DocumentPickerResponse }) => <FileItem item={item} />,
    [],
  );

  return (
    <ScrollView contentContainerStyle={{ gap: 10 }} stickyHeaderIndices={[0]}>
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
          <Chip
            onPress={() => {
              console.log(item.label);
            }}
            key={item?.id}
            {...{ item }}
          />
        ))}
      </View>
      <RowHeading title={'Recent Document'} isAll={true} />
      <FlatList
        scrollEnabled={false}
        removeClippedSubviews
        contentContainerStyle={{
          marginBottom: 20,
        }}
        showsHorizontalScrollIndicator={false}
        data={fileImported}
        renderItem={renderFile}
      />
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
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
