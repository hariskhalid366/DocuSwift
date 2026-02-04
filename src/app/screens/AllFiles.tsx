import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState, useCallback, memo } from 'react';
import FileItem from '../../components/Ui/FileItem';
import { wp } from '../../constant/Dimensions';
import SettingHeader from '../../components/Header/ScreenHeader';
import { useAppTheme } from '../../hooks/useAppTheme';
import * as Lucide from 'lucide-react-native';
import CustomText from '../../components/Global/CustomText';
import { saveImageToGallery, saveToPdf } from '../../utils/helper';
import { Toast } from '../../components/Global/ShowToast';
import { useDocuSwift } from '../../store/GlobalState';
import { PDF_PAGE_SIZES } from '../../constant/data';

type ScanProps = {
  uri: string;
  isSelected: boolean;
  onPress: () => void;
  onLongPress: () => void;
  colors: any;
};

const ScanItem = memo(({ uri, isSelected, onPress, onLongPress, colors }: ScanProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      onLongPress={onLongPress}
      style={[
        styles.imageItemContainer,
        { borderColor: isSelected ? colors.primary : 'transparent', borderWidth: isSelected ? 2 : 0 },
      ]}
    >
      <Image source={{ uri }} style={styles.image} />
      {isSelected && (
        <View style={[styles.checkBadge, { backgroundColor: colors.primary }]}>
          <Lucide.Check color="#fff" size={wp(4)} />
        </View>
      )}
    </TouchableOpacity>
  );
});

const AllFiles = ({ route }: any) => {
  const { item = [], type } = route.params || {};
  const { colors } = useAppTheme();

  const [selectedImages, setSelectedImages] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);

  const isSelectionMode = selectedImages.size > 0;

  const toggleSelection = useCallback((uri: string) => {
    setSelectedImages(prev => {
      const next = new Set(prev);
      next.has(uri) ? next.delete(uri) : next.add(uri);
      return next;
    });
  }, []);

  const handleLongPress = useCallback(
    (uri: string) => {
      if (!isSelectionMode) toggleSelection(uri);
    },
    [isSelectionMode, toggleSelection],
  );

  const { pageSize } = useDocuSwift();

  const handleConvertPdf = useCallback(async () => {
    const images = Array.from(selectedImages);
    if (!images.length) return;

    try {
      setLoading(true);
      await saveToPdf(images, pageSize, PDF_PAGE_SIZES);
      Toast('PDF created successfully');
      setSelectedImages(new Set());
    } catch (err) {
      console.log('PDF error:', err);
      Toast('Failed to create PDF');
    } finally {
      setLoading(false);
    }
  }, [selectedImages, pageSize]);

  const handleSaveLocally = useCallback(async () => {
    const images = Array.from(selectedImages);
    if (!images.length) return;

    try {
      setLoading(true);
      await Promise.all(images.map(img => saveImageToGallery(img)));
      Toast(`Saved ${images.length} images`);
      setSelectedImages(new Set());
    } catch (err) {
      console.log('Save error:', err);
      Toast('Failed to save images');
    } finally {
      setLoading(false);
    }
  }, [selectedImages]);

  const renderItem = useCallback(
    ({ item: fileItem }: { item: any }) => {
      if (type === 'files') return <FileItem item={fileItem} />;

      const uri = fileItem?.uri;
      return (
        <ScanItem
          uri={uri}
          isSelected={selectedImages.has(uri)}
          onPress={() =>
            isSelectionMode ? toggleSelection(uri) : handleLongPress(uri)
          }
          onLongPress={() => handleLongPress(uri)}
          colors={colors}
        />
      );
    },
    [type, selectedImages, isSelectionMode, toggleSelection, handleLongPress, colors],
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <SettingHeader label="All Files" />

      <FlatList
        showsVerticalScrollIndicator={false}
        style={{paddingTop:20}}
        data={item}
        numColumns={type === 'scans' ? 3 : 1}
        keyExtractor={(it,index) => it?.uri+index }
        renderItem={renderItem}
        extraData={selectedImages}
        contentContainerStyle={styles.listContent}
        initialNumToRender={15}
        maxToRenderPerBatch={15}
        windowSize={10}
      />

      {isSelectionMode && (
        <View
          style={[
            styles.actionBar,
            { backgroundColor: colors.card, borderTopColor: colors.border },
          ]}
        >
          <TouchableOpacity style={styles.actionBtn} onPress={handleConvertPdf}>
            <Lucide.FileType color={colors.primary} size={wp(6)} />
            <CustomText fontSize={wp(3)} color={colors.primary}>
              To PDF
            </CustomText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionBtn} onPress={handleSaveLocally}>
            <Lucide.Download color={colors.primary} size={wp(6)} />
            <CustomText fontSize={wp(3)} color={colors.primary}>
              Save
            </CustomText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => setSelectedImages(new Set())}
          >
            <Lucide.X color={colors.textLight} size={wp(6)} />
            <CustomText fontSize={wp(3)} color={colors.textLight}>
              Cancel
            </CustomText>
          </TouchableOpacity>
        </View>
      )}

      {loading && (
        <View style={styles.loaderOverlay}>
          <ActivityIndicator size="large" color={colors.primary} />
          <CustomText style={{ marginTop: 10 }}>Processing…</CustomText>
        </View>
      )}
    </View>
  );
};

export default AllFiles;

const styles = StyleSheet.create({
  container: { flex: 1 },
  listContent: { paddingBottom: 140 },

  imageItemContainer: {
    margin: wp(1),
    borderRadius: wp(4),
    overflow: 'hidden',
    width: wp(31),
    height: wp(31),
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: { width: '100%', height: '100%' },

  checkBadge: {
    position: 'absolute',
    top: wp(2),
    right: wp(2),
    borderRadius: wp(4),
    padding: wp(1),
    borderWidth: 1,
    borderColor: '#fff',
  },

  actionBar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: wp(4),
    paddingBottom: wp(8),
    borderTopWidth: 1,
    borderTopLeftRadius: wp(6),
    borderTopRightRadius: wp(6),
    elevation: 10,
  },

  actionBtn: { alignItems: 'center', gap: 5 },

  loaderOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
});
