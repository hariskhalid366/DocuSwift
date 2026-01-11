import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import React from 'react';
import HomeHeader from '../components/Header/HomeHeader';
import SearchBar from '../components/Ui/SearchBar';
import Tile from '../components/Ui/Tile';
import { wp } from '../constant/Dimensions';
import { ChipList, FILES, TilesList } from '../constant/data';
import { ChipProps, FileProps, TileProps } from '../types/TabTypes';
import Chip from '../components/Ui/Chip';
import RowHeading from '../components/Ui/RowHeading';
import FileItem from '../components/Ui/FileItem';

const Home = () => {
  const data = FILES.slice(0, 5);
  return (
    <ScrollView contentContainerStyle={{ gap: 10 }} stickyHeaderIndices={[0]}>
      <HomeHeader />
      <SearchBar />
      <FlatList
        removeClippedSubviews
        horizontal
        contentContainerStyle={{
          gap: wp(6),
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}
        showsHorizontalScrollIndicator={false}
        data={TilesList}
        renderItem={({ item }: { item: TileProps }) => <Tile {...{ item }} />}
      />
      <View style={styles.chipContainer}>
        {ChipList.map((item: ChipProps) => (
          <Chip key={item?.id} {...{ item }} />
        ))}
      </View>
      <RowHeading />
      <FlatList
        scrollEnabled={false}
        removeClippedSubviews
        contentContainerStyle={{
          marginBottom: 20,
          gap: wp(4),
          paddingVertical: 10,
        }}
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={({ item }: { item: FileProps }) => <FileItem {...item} />}
      />
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  chipContainer: {
    gap: wp(2.5),
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingBottom: 5,
    flexDirection: 'row',
  },
});
