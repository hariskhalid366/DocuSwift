// import React, { useState } from 'react';
// import {
//   View,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
//   ScrollView,
//   Alert,
//   ActivityIndicator,
// } from 'react-native';
// import DocumentScanner from '../../../react-native-documents-plugin/src';
// import CustomText from '../../components/Global/CustomText';
// import { useAppTheme } from '../../hooks/useAppTheme';

// const DocumentPluginTest = () => {
//   const { colors } = useAppTheme();
//   const [scannedImages, setScannedImages] = useState<string[]>([]);
//   const [ocrText, setOcrText] = useState<string>('');
//   const [pdfPath, setPdfPath] = useState<string>('');
//   const [loading, setLoading] = useState(false);

//   const handleScan = async () => {
//     try {
//       setLoading(true);
//       const result = await DocumentScanner.scanDocument({
//         maxNumDocuments: 5,
//         responseType: 'imageFilePath',
//       });

//       if (result.status === 'success' && result.scannedImages) {
//         setScannedImages(result.scannedImages);
//       }
//     } catch (error: any) {
//       Alert.alert('Scan Error', error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleOCR = async () => {
//     if (scannedImages.length === 0) {
//       Alert.alert('Error', 'Scan a document first');
//       return;
//     }

//     try {
//       setLoading(true);
//       const result = await DocumentScanner.recognizeText({
//         uri: scannedImages[0],
//       });
//       setOcrText(result.resultText);
//     } catch (error: any) {
//       Alert.alert('OCR Error', error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCreatePdf = async () => {
//     if (scannedImages.length === 0) {
//       Alert.alert('Error', 'Scan a document first');
//       return;
//     }

//     try {
//       setLoading(true);
//       const dir = await DocumentScanner.getDocumentsDirectory();
//       const outputPath = `${dir}/test_${Date.now()}.pdf`;

//       const path = await DocumentScanner.createPdf({
//         outputPath,
//         pages: scannedImages.map(img => ({
//           imagePath: img,
//           imageFit: 'contain',
//         })),
//       });
//       setPdfPath(path);
//       Alert.alert('PDF Created', `Saved to: ${path}`);
//     } catch (error: any) {
//       Alert.alert('PDF Error', error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSaveToGallery = async () => {
//     if (scannedImages.length === 0) {
//       Alert.alert('Error', 'Scan a document first');
//       return;
//     }

//     try {
//       setLoading(true);
//       const count = await DocumentScanner.saveToGallery(scannedImages);
//       Alert.alert('Success', `Saved ${count} images to gallery`);
//     } catch (error: any) {
//       Alert.alert('Gallery Error', error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
//       <CustomText variant="h4" fontWeight="bold" style={styles.title}>
//         Plugin Test Suite
//       </CustomText>

//       <View style={styles.buttonContainer}>
//         <TouchableOpacity
//           style={[styles.button, { backgroundColor: colors.primary }]}
//           onPress={handleScan}
//         >
//           <CustomText color="#fff">Scan Document</CustomText>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={[styles.button, { backgroundColor: colors.primary }]}
//           onPress={handleOCR}
//         >
//           <CustomText color="#fff">Recognize Text</CustomText>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={[styles.button, { backgroundColor: colors.primary }]}
//           onPress={handleCreatePdf}
//         >
//           <CustomText color="#fff">Create PDF</CustomText>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={[styles.button, { backgroundColor: colors.primary }]}
//           onPress={handleSaveToGallery}
//         >
//           <CustomText color="#fff">Save to Gallery</CustomText>
//         </TouchableOpacity>
//       </View>

//       {loading && <ActivityIndicator size="large" color={colors.primary} />}

//       {scannedImages.length > 0 && (
//         <View style={styles.section}>
//           <CustomText variant="h6">Scanned Images:</CustomText>
//           <ScrollView horizontal style={styles.imageScroll}>
//             {scannedImages.map((uri, index) => (
//               <Image key={index} source={{ uri }} style={styles.image} />
//             ))}
//           </ScrollView>
//         </View>
//       )}

//       {ocrText ? (
//         <View style={styles.section}>
//           <CustomText variant="h6">OCR Result:</CustomText>
//           <View style={[styles.resultBox, { backgroundColor: colors.card }]}>
//             <CustomText>{ocrText}</CustomText>
//           </View>
//         </View>
//       ) : null}

//       {pdfPath ? (
//         <View style={styles.section}>
//           <CustomText variant="h6">PDF Path:</CustomText>
//           <CustomText style={styles.pathText}>{pdfPath}</CustomText>
//         </View>
//       ) : null}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//   },
//   title: {
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//   },
//   button: {
//     width: '48%',
//     padding: 15,
//     borderRadius: 10,
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   section: {
//     marginTop: 20,
//   },
//   imageScroll: {
//     marginTop: 10,
//   },
//   image: {
//     width: 200,
//     height: 300,
//     marginRight: 10,
//     borderRadius: 5,
//     backgroundColor: '#eee',
//   },
//   resultBox: {
//     padding: 15,
//     borderRadius: 10,
//     marginTop: 10,
//   },
//   pathText: {
//     fontSize: 12,
//     marginTop: 5,
//     color: '#666',
//   },
// });

// export default DocumentPluginTest;
