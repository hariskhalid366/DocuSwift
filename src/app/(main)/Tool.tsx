import { FlatList, ScrollView, StyleSheet } from 'react-native';
import React, { useCallback, useMemo } from 'react';
import SettingHeader from '../../components/Header/ScreenHeader';
import { buildTilesList } from '../../constant/data';
import { wp } from '../../constant/Dimensions';
import { TileProps } from '../../types/TabTypes';
import Tile from '../../components/Ui/Tile';
import RowHeading from '../../components/Ui/RowHeading';
import StorageChart from '../../components/Ui/StorageChart';
import Bar from '../../components/Ui/BarCart';
import { useDocuSwift } from '../../store/GlobalState';

const Tool = () => {
  const { fileImported, scans } = useDocuSwift();
  const renderTile = useCallback(
    ({ item }: { item: TileProps }) => <Tile item={item} />,
    [],
  );

  const tiles = useMemo(
    () =>
      buildTilesList({
        scansCount: scans?.length,
        importsCount: fileImported?.length,
      }),
    [scans, fileImported],
  );

  return (
    <ScrollView
      style={styles.scrollView}
      stickyHeaderIndices={[0]}
      showsVerticalScrollIndicator={false}
    >
      <SettingHeader label={'Your Productivity'} />
      <RowHeading title={'Usage'} />
      <FlatList
        removeClippedSubviews
        horizontal
        contentContainerStyle={styles.container}
        showsHorizontalScrollIndicator={false}
        data={tiles.slice(0, 3)}
        renderItem={renderTile}
      />
      <RowHeading title={'Scanning Activity'} />
      <Bar />
      <RowHeading title={'Storage Breakdown'} />
      <StorageChart />
    </ScrollView>
  );
};

export default Tool;

const styles = StyleSheet.create({
  scrollView: { flex: 1 },
  container: {
    gap: wp(6),
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
