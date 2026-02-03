import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  Pressable,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import { Image as ImageIcon, Copy } from 'lucide-react-native';
import MlkitOcr from 'rn-mlkit-ocr';
import { launchImageLibrary } from 'react-native-image-picker';
import Clipboard from '@react-native-clipboard/clipboard';

import { useAppTheme } from '../../hooks/useAppTheme';
import { hp, wp } from '../../constant/Dimensions';
import { Toast } from '../../components/Global/ShowToast';
import CustomText from '../../components/Global/CustomText';

const OcrCamera = () => {
  const device = useCameraDevice('back');
  const { hasPermission } = useCameraPermission();
  const cameraRef = useRef<Camera>(null);
  const { colors } = useAppTheme();

  const [ocrText, setOcrText] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  /* ───────────── Permissions ───────────── */
  useEffect(() => {
    if (!hasPermission) {
      Camera.requestCameraPermission();
    }
  }, [hasPermission]);

  /* ───────────── OCR Logic ───────────── */
  const runOCR = useCallback(async (imagePath: string) => {
    try {
      const result = await MlkitOcr.recognizeText(imagePath);

      if (!result?.text) {
        Toast('Language not supported');
        return;
      }

      setOcrText(result.text);
      Toast('OCR completed');
    } catch (err) {
      console.error('OCR Error:', err);
      Toast('OCR failed');
    } finally {
      setLoading(false);
    }
  }, []);

  /* ───────────── Camera Capture ───────────── */
  const captureImage = useCallback(async () => {
    if (!cameraRef.current) return;

    try {
      setLoading(true);
      setModalVisible(true);

      const photo = await cameraRef.current.takePhoto();
      if (photo?.path) {
        runOCR(photo.path);
      }
    } catch (err) {
      setLoading(false);
      Toast('Camera error');
      console.error(err);
    }
  }, [runOCR]);

  /* ───────────── Gallery Picker ───────────── */
  const openGallery = useCallback(async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
      quality: 1,
    });

    const uri = result.assets?.[0]?.uri;
    if (uri) {
      setLoading(true);
      setModalVisible(true);
      runOCR(uri);
    }
  }, [runOCR]);

  /* ───────────── Close Modal ───────────── */
  const closeModal = useCallback(() => {
    setModalVisible(false);
    setOcrText(null);
    setLoading(false);
  }, []);

  /* ───────────── Copy OCR ───────────── */
  const copyText = useCallback(() => {
    if (!ocrText) return;
    Clipboard.setString(ocrText);
    Toast('Copied successfully');
  }, [ocrText]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {device && (
        <Camera
          ref={cameraRef}
          style={StyleSheet.absoluteFill}
          device={device}
          isActive
          photo
          photoHdr
          photoQualityBalance="speed"
        />
      )}

      {/* Bottom Controls */}
      <View style={styles.bottomControls}>
        <TouchableOpacity
          onPress={openGallery}
          style={[styles.galleryButton, { borderColor: colors.icon }]}
        >
          <ImageIcon color={colors.icon} size={wp(8)} />
        </TouchableOpacity>

        <Pressable
          onPress={captureImage}
          style={[styles.captureButton, { borderColor: colors.primary }]}
        />

        <View style={styles.placeholderIcon} />
      </View>

      {/* OCR Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          {loading ? (
            <ActivityIndicator size="large" color={colors.icon} />
          ) : (
            <>
              <View
                style={[
                  styles.ocrContainer,
                  { backgroundColor: colors.container },
                ]}
              >
                <ScrollView
                  showsVerticalScrollIndicator
                  contentContainerStyle={styles.scrollContent}
                >
                  <CustomText selectable fontWeight="medium" variant="h6">
                    {ocrText}
                  </CustomText>
                </ScrollView>
              </View>

              <TouchableOpacity style={styles.copy} onPress={copyText}>
                <Copy color={colors.icon} size={wp(8)} />
              </TouchableOpacity>
            </>
          )}
        </View>
      </Modal>
    </View>
  );
};

export default OcrCamera;

const styles = StyleSheet.create({
  previewContainer: {
    flex: 1,
  },
  previewImage: {
    flex: 1,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
  actionButton: {
    bottom: 50,
    alignSelf: 'center',
    padding: 15,
    borderRadius: 100,
  },
  bottomControls: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  galleryButton: {
    borderRadius: 100,
    padding: 8,
    borderWidth: 2,
    backgroundColor: '#ffffff55',
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 100,
    borderWidth: 6,
    backgroundColor: '#ffffff55',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderIcon: {
    opacity: 0,
    width: wp(10),
    height: wp(10),
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: '#00000099',
    justifyContent: 'center',
    alignItems: 'center',
  },

  ocrContainer: {
    width: wp(90),
    maxHeight: hp(75),
    borderRadius: 12,
    paddingVertical: hp(2),
    paddingHorizontal: wp(4),
  },

  scrollContent: {
    flexGrow: 1,
  },
  copy: { position: 'relative', bottom: 50, right: -wp(35) },
});
