import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import DocumentScanner from '../../../react-native-documents-plugin/src';
import CustomText from '../../components/Global/CustomText';
import { useAppTheme } from '../../hooks/useAppTheme';
import { wp, hp } from '../../constant/Dimensions';
import * as Lucide from 'lucide-react-native';

const Scan = ({ route, navigation }: any) => {
  const { colors } = useAppTheme();
  const [scannedImages, setScannedImages] = useState<string[]>(route.params?.images || []);
  const [ocrText, setOcrText] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleOCR = async (uri: string) => {
    try {
      setLoading(true);
      const result = await DocumentScanner.recognizeText({ uri });
      setOcrText(result.resultText);
    } catch (error: any) {
      Alert.alert('OCR Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePdf = async () => {
    if (scannedImages.length === 0) return;

    try {
      setLoading(true);
      const dir = await DocumentScanner.getDocumentsDirectory();
      const outputPath = `${dir}/scan_${Date.now()}.pdf`;
      
      const path = await DocumentScanner.createPdf({
        outputPath,
        pages: scannedImages.map(img => ({
          imagePath: img,
          imageFit: 'contain',
        })),
      });
      Alert.alert('PDF Created', `Saved to: ${path}`);
    } catch (error: any) {
      Alert.alert('PDF Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveToGallery = async () => {
    if (scannedImages.length === 0) return;

    try {
      setLoading(true);
      const count = await DocumentScanner.saveToGallery(scannedImages);
      Alert.alert('Success', `Saved ${count} images to gallery`);
    } catch (error: any) {
      Alert.alert('Gallery Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Lucide.ChevronLeft color={colors.text} size={24} />
        </TouchableOpacity>
        <CustomText variant="h5" fontWeight="bold">Editor</CustomText>
        <TouchableOpacity onPress={handleCreatePdf}>
          <Lucide.FileText color={colors.primary} size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <ScrollView horizontal pagingEnabled style={styles.imagePager}>
          {scannedImages.map((uri, index) => (
            <View key={index} style={styles.imageContainer}>
              <Image source={{ uri }} style={styles.image} />
              <TouchableOpacity 
                style={[styles.ocrBadge, { backgroundColor: colors.primary }]}
                onPress={() => handleOCR(uri)}
              >
                <Lucide.ScanText color="#fff" size={16} />
                <CustomText color="#fff" fontSize={12} style={{ marginLeft: 4 }}>OCR</CustomText>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        {loading && <ActivityIndicator size="large" color={colors.primary} style={styles.loader} />}

        {ocrText ? (
          <View style={[styles.ocrResult, { backgroundColor: colors.card }]}>
            <CustomText fontWeight="bold" style={{ marginBottom: 8 }}>OCR Result:</CustomText>
            <CustomText>{ocrText}</CustomText>
          </View>
        ) : null}

        <View style={styles.footer}>
          <TouchableOpacity style={styles.footerBtn} onPress={handleSaveToGallery}>
            <Lucide.Image color={colors.text} size={24} />
            <CustomText fontSize={12}>Gallery</CustomText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerBtn} onPress={() => setScannedImages([])}>
            <Lucide.Trash2 color="#FF3B30" size={24} />
            <CustomText fontSize={12}>Clear</CustomText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  content: { padding: 16 },
  imagePager: { height: hp(50), marginBottom: 20 },
  imageContainer: { width: wp(100) - 32, height: hp(50), justifyContent: 'center', alignItems: 'center' },
  image: { width: '100%', height: '100%', borderRadius: 12, resizeMode: 'contain' },
  ocrBadge: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 20,
  },
  loader: { marginVertical: 20 },
  ocrResult: { padding: 16, borderRadius: 12, marginBottom: 20 },
  footer: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 20 },
  footerBtn: { alignItems: 'center' },
});

export default Scan;
