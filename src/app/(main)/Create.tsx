import React, { memo, useCallback, useMemo, useRef, useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as Lucide from 'lucide-react-native';

import CustomText from '../../components/Global/CustomText';
import { wp } from '../../constant/Dimensions';
import RowButton from '../../components/Ui/RowButton';
import { useAuth } from '../../context/AuthContext';
import { Toast } from '../../components/Global/ShowToast';
import CreateEdits from '../../components/Ui/CreateEdits';
import CreatorHeader from '../../components/Header/CreateHeader';
import { useAppTheme } from '../../hooks/useAppTheme';
import { goBack } from '../../navigation/NavigationRef';
import DocumentScanner from 'react-native-document-scanner-plugin';
import Carousal from '../../components/Ui/Carousal';
import { useDocuSwift } from '../../store/GlobalState';
import { saveImageToGallery, saveToPdf } from '../../utils/helper';
import { PDF_PAGE_SIZES } from '../../constant/data';

const Create = () => {
  const [images, setImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { premium } = useAuth();
  const { colors } = useAppTheme();
  const { handleScans, scans, pageSize } = useDocuSwift();
  const [loading, setLoading] = useState(false);

  console.log(scans);

  /** ---------------- VIEWABILITY ---------------- */
  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  });

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems?.length) {
      setCurrentIndex(viewableItems[0].index ?? 0);
    }
  });

  /** ---------------- ACTIONS ---------------- */

  const scanDocument = useCallback(async () => {
    if (images.length >= 20 && !premium) {
      Toast('Use premium to access more functions');
      return;
    }

    try {
      const { scannedImages } = await DocumentScanner.scanDocument();
      if (scannedImages?.length) {
        setImages(prev => [...prev, ...scannedImages]);
      }
    } catch (e) {
      console.log(e);
    }
  }, [images.length, premium]);

  const handleFinish = useCallback(() => {
    if (!images.length) return;

    handleScans(images);
    setImages([]);
    Toast('Saved locally');
    goBack();
  }, [images, handleScans]);

  const deleteCurrentImage = useCallback(() => {
    setImages(prev => prev.filter((_, i) => i !== currentIndex));
  }, [currentIndex]);

  const saveCurrentImage = useCallback(async () => {
    const uri = images[currentIndex];
    if (uri) await saveImageToGallery(uri);
  }, [images, currentIndex]);

  const handleSavePdf = useCallback(async () => {
    if (!images.length) return;
    try {
      setLoading(true);
      await saveToPdf(images, pageSize, PDF_PAGE_SIZES);
      Toast('PDF created successfully');
    } catch (e) {
      console.log(e);
      Toast('Failed to create PDF');
    } finally {
      setLoading(false);
    }
  }, [images, pageSize]);

  /** ---------------- RENDERERS ---------------- */

  const renderCarousal = useCallback(
    ({ item, index }: { item: string; index: number }) => (
      <Carousal item={item} index={index} total={images.length} />
    ),
    [images.length],
  );

  const keyExtractor = useCallback((item: string) => item, []);

  /** ---------------- THEME STYLES ---------------- */

  const themedStyles = useMemo(
    () => ({
      container: [styles.container, { backgroundColor: colors.background }],
      scanBtn: [styles.scanBtn, { backgroundColor: colors.primary }],
      finishBtn: [styles.finishBtn, { backgroundColor: colors.primary }],
    }),
    [colors],
  );

  /** ---------------- EMPTY STATE ---------------- */

  if (!images.length) {
    return (
      <View style={styles.emptyContainer}>
        <Lucide.Scan size={wp(18)} color={colors.primary} />
        <CustomText fontSize={wp(5)} fontWeight="semibold">
          Scan Documents
        </CustomText>
        <CustomText color={colors.textLight}>
          Capture and convert your documents into PDF
        </CustomText>

        <TouchableOpacity style={themedStyles.scanBtn} onPress={scanDocument}>
          <CustomText color="#fff">Start Scanning</CustomText>
        </TouchableOpacity>
      </View>
    );
  }

  /** ---------------- MAIN UI ---------------- */

  return (
    <View style={themedStyles.container}>
      <CreatorHeader />

      <FlatList
        horizontal
        data={images}
        renderItem={renderCarousal}
        keyExtractor={keyExtractor}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        decelerationRate="fast"
        removeClippedSubviews
        initialNumToRender={3}
        maxToRenderPerBatch={3}
        windowSize={5}
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={viewabilityConfig.current}
      />

      <CreateEdits
        setImages={setImages}
        length={images.length}
        deleteItem={deleteCurrentImage}
        saveItem={saveCurrentImage}
      />

      <View style={styles.actionContainer}>
        <RowButton leftAdd={scanDocument} onSavePdf={handleSavePdf} />
        <TouchableOpacity style={themedStyles.finishBtn} onPress={handleFinish}>
          <CustomText color="#fff" fontWeight="bold">
            Finish
          </CustomText>
        </TouchableOpacity>
      </View>

      {loading && (
        <View style={styles.loaderOverlay}>
          <ActivityIndicator size="large" color={colors.primary} />
          <CustomText style={{ marginTop: 10 }}>Processing…</CustomText>
        </View>
      )}
    </View>
  );
};

export default memo(Create);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  contentContainer: {
    alignItems: 'center',
    gap: 20,
    paddingHorizontal: wp(15),
  },

  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: wp(4),
  },
  scanBtn: {
    marginTop: wp(3),
    paddingHorizontal: wp(8),
    paddingVertical: wp(3),
    borderRadius: wp(3),
  },

  actionContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 15,
  },
  finishBtn: {
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loaderOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
});
