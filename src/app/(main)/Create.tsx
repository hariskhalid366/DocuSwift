import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import DocumentScanner from 'react-native-document-scanner-plugin';
import * as Lucide from 'lucide-react-native';
import CustomText from '../../components/Global/CustomText';
import { hp, wp } from '../../constant/Dimensions';
import RowButton from '../../components/Ui/RowButton';
import { useAuth } from '../../context/AuthContext';
import { Toast } from '../../components/Global/ShowToast';
import CreateEdits from '../../components/Ui/CreateEdits';
import Animated from 'react-native-reanimated';
import CreatorHeader from '../../components/Header/CreateHeader';
import { useAppTheme } from '../../hooks/useAppTheme';

const CarouselItem = ({ item, index, total }: any) => {
  return (
    <Animated.View style={[styles.listContainer]}>
      <Image source={{ uri: item }} style={styles.preview} />
      <View style={styles.pages}>
        <CustomText color="#fff">
          {index + 1}/{total}
        </CustomText>
      </View>
    </Animated.View>
  );
};

const Create = () => {
  const [images, setImages] = useState<string[]>([]);
  const { premium } = useAuth();
  const { colors } = useAppTheme();

  const scanDocument = useCallback(async () => {
    if (images.length >= 20 && !premium) {
      Toast('Use premium to access more functions');
      return;
    }

    try {
      const { scannedImages } = await DocumentScanner.scanDocument({
        maxNumDocuments: 20,
      });

      if (scannedImages?.length) {
        setImages(prev => [...scannedImages, ...prev]);
      }
    } catch (e) {
      console.log(e);
    }
  }, [images, premium]);

  useEffect(() => {
    scanDocument();
  }, [scanDocument]);

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

        <TouchableOpacity
          style={[styles.scanBtn, { backgroundColor: colors.primary }]}
          onPress={scanDocument}
        >
          <CustomText color="#fff">Start Scanning</CustomText>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
        },
      ]}
    >
      <CreatorHeader />
      <FlatList
        horizontal
        renderToHardwareTextureAndroid
        data={images}
        contentContainerStyle={styles.contentContainer}
        decelerationRate="fast"
        renderItem={({ item, index }) => (
          <CarouselItem item={item} index={index} total={images?.length} />
        )}
      />

      <CreateEdits setImages={setImages} length={images?.length} />
      <RowButton leftAdd={scanDocument} />
    </View>
  );
};

export default Create;

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
  listContainer: {
    width: wp(70),
    height: hp(55),
    borderRadius: 20,
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
  preview: {
    flex: 1,
    resizeMode: 'cover',
    borderRadius: wp(3),
  },
  pages: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 30,
    backgroundColor: '#00000077',
    alignSelf: 'flex-end',
    margin: 20,
    position: 'absolute',
  },
});
