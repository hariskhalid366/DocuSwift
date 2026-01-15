// import {
//   Camera,
//   useCameraDevice,
//   useCameraPermission,
//   useFrameProcessor,
// } from 'react-native-vision-camera';
// import { performOcr } from '@bear-block/vision-camera-ocr';
// import { StyleSheet, View } from 'react-native';
// import { useEffect, useState } from 'react';
// import { runOnJS } from 'react-native-worklets';
// import CustomText from '../../components/Global/CustomText';

// export const OcrCamera = () => {
//   const { hasPermission, requestPermission } = useCameraPermission();
//   const [detectedText, setDetectedText] = useState<string>('');
//   const [isProcessing, setIsProcessing] = useState(false);

//   useEffect(() => {
//     if (!hasPermission) requestPermission();
//   }, []);

//   const frameProcessor = useFrameProcessor(frame => {
//     'worklet';
//     try {
//       setIsProcessing(true);
//       const result = performOcr(frame);

//       if (result?.text) {
//         setDetectedText(result.text);
//         // You can also send to your app's state management
//         runOnJS(handleTextDetected)(result.text);
//       }
//     } catch (error) {
//       console.error('OCR processing error:', error);
//     } finally {
//       setIsProcessing(false);
//     }
//   }, []);

//   const handleTextDetected = (text: string) => {
//     // Handle the detected text in your app
//     console.log('New text detected:', text);
//   };

//   const device = useCameraDevice('back', {
//     physicalDevices: ['wide-angle-camera'],
//   });

//   if (!device) {
//     return null;
//   }

//   return (
//     <View style={styles.container}>
//       <Camera
//         style={StyleSheet.absoluteFill}
//         device={device}
//         isActive={true}
//         frameProcessor={frameProcessor}
//       />
//       {detectedText && (
//         <View style={styles.textOverlay}>
//           <CustomText style={styles.text}>{detectedText}</CustomText>
//         </View>
//       )}

//       {isProcessing && (
//         <View style={styles.processingIndicator}>
//           <CustomText>Processing...</CustomText>
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   textOverlay: {
//     position: 'absolute',
//     bottom: 100,
//     left: 20,
//     right: 20,
//     backgroundColor: 'rgba(0,0,0,0.7)',
//     padding: 15,
//     borderRadius: 10,
//   },
//   text: {
//     color: 'white',
//     fontSize: 16,
//     textAlign: 'center',
//   },
//   processingIndicator: {
//     position: 'absolute',
//     top: 50,
//     alignSelf: 'center',
//     backgroundColor: 'rgba(0,0,0,0.7)',
//     padding: 10,
//     borderRadius: 20,
//   },
// });
