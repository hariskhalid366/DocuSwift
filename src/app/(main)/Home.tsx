import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import HomeHeader from '../../components/Header/HomeHeader';
import SearchBar from '../../components/Ui/SearchBar';
import Tile from '../../components/Ui/Tile';
import Chip from '../../components/Ui/Chip';
import RowHeading from '../../components/Ui/RowHeading';
import FileItem from '../../components/Ui/FileItem';
import { buildTilesList } from '../../constant/data';
import { wp } from '../../constant/Dimensions';
import { useDocuSwift } from '../../store/GlobalState';
import { ensurePermission } from '../../utils/Permission';
import * as Lucide from 'lucide-react-native';
import { navigate } from '../../navigation/NavigationRef';
import type { ChipProps, TileProps } from '../../types/TabTypes';
import type { DocumentPickerResponse } from '@react-native-documents/picker';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const Home = () => {
  const { fileImported, scans } = useDocuSwift();
  const [search, setSearch] = useState<string>('');

  /* ───────────── Permissions ───────────── */
  useEffect(() => {
    ensurePermission();
  }, []);

  const tiles = useMemo(
    () =>
      buildTilesList({
        scansCount: scans?.length,
        importsCount: fileImported?.length,
      }),
    [scans, fileImported],
  );

  /* ───────────── Render Handlers ───────────── */
  const renderTile = useCallback(
    ({ item }: { item: TileProps }) => <Tile item={item} />,
    [scans],
  );

  const renderFile = useCallback(
    ({ item }: { item: DocumentPickerResponse }) => <FileItem item={item} />,
    [],
  );

  /* ───────────── Navigation Handler ───────────── */
  const handleScan = useCallback((type: string) => {
    switch (type) {
      case 'scan':
        navigate('Create', { create: true });
        break;
      case 'text':
        navigate('ocr');
        break;
      case 'import':
        navigate('Files', { import: true });
        break;
    }
  }, []);

  /* ───────────── Chip List ───────────── */
  const chipList: ChipProps[] = useMemo(
    () => [
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
    ],
    [handleScan],
  );
  const aniVal = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    const height = interpolate(
      aniVal.value,
      [0, 1],
      [245, 0],
      Extrapolation.CLAMP,
    );
    const opacity = interpolate(
      aniVal.value,
      [0, 1],
      [1, 0],
      Extrapolation.CLAMP,
    );
    return { height, opacity };
  });
  const timeoutRef = useRef<number | null>(null);

  const handleFocus = () => {
    aniVal.value = withTiming(1, { duration: 500 });
  };

  useEffect(() => {
    let timer: number | undefined;

    if (search.length <= 1) {
      timer = setTimeout(() => {
        aniVal.value = withTiming(0, { duration: 500 });
      }, 3000);
    } else if (search.length > 0) {
      aniVal.value = withTiming(1, { duration: 500 });
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [search.length]);

  const filteredData = useMemo(() => {
    if (!search.trim()) return fileImported;

    return fileImported.filter(item =>
      item?.name?.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, fileImported]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}
      stickyHeaderIndices={[0]}
    >
      {/* Header */}
      <HomeHeader />
      <SearchBar
        search={search}
        setSearch={setSearch}
        handleFocus={handleFocus}
        ref={timeoutRef}
      />
      <Animated.View style={[animatedStyle, { gap: 4 }]}>
        {/* Tiles Horizontal List */}
        <FlatList
          data={tiles}
          renderItem={renderTile}
          keyExtractor={(_, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tileContainer}
          removeClippedSubviews
        />

        {/* Chips */}
        <View style={styles.chipContainer}>
          {chipList.map(item => (
            <Chip key={item.id} item={item} />
          ))}
        </View>

        {/* Recent Documents */}
        <RowHeading
          title="Recent Document"
          isAll
          onPress={() =>
            navigate('AllFiles', { item: fileImported, type: 'files' })
          }
        />
      </Animated.View>
      <FlatList
        data={filteredData}
        renderItem={renderFile}
        keyExtractor={(_, index) => index.toString()}
        scrollEnabled={false}
        contentContainerStyle={styles.flatlist}
        removeClippedSubviews
      />
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  contentContainer: { gap: 10 },
  tileContainer: {
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
  flatlist: { marginBottom: 20 },
});
