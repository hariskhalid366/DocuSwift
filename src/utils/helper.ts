import moment from 'moment';
import RNFS from 'react-native-fs';
import { Scan } from '../types/TabTypes';
import { createPdf } from 'react-native-images-to-pdf';

export function getDayPeriod() {
  const hour = moment().hour();

  if (hour >= 5 && hour < 12) return 'Good Morning';
  if (hour >= 12 && hour < 17) return 'Good Afternoon';
  if (hour >= 17 && hour < 24) return 'Good Evening';
  return 'Have some rest';
}

export const generateFileName = () => {
  const rand = Math.floor(100000 + Math.random() * 900000);
  return `DocuSwift-${Date.now()}-${rand}`;
};

export const formatFileSize = (sizeInBytes: number): string => {
  if (sizeInBytes >= 1024 ** 3) {
    return (sizeInBytes / 1024 ** 3).toFixed(2) + ' GB';
  } else if (sizeInBytes >= 1024 ** 2) {
    return (sizeInBytes / 1024 ** 2).toFixed(2) + ' MB';
  } else if (sizeInBytes >= 1024) {
    return (sizeInBytes / 1024).toFixed(2) + ' KB';
  } else {
    return sizeInBytes + ' B';
  }
};

export const saveImageToGallery = async (filePath: string) => {
  const destDir = `${RNFS.PicturesDirectoryPath}/docuswift`;
  const dirExists = await RNFS.exists(destDir);
  if (!dirExists) {
    await RNFS.mkdir(destDir);
  }
  const cleanPath = filePath.replace('file://', '');

  const originalFileName = cleanPath.split('/').pop();
  const destFileName = `DS_${Date.now()}_${originalFileName}`;
  const destFullPath = `${destDir}/${destFileName}`;

  await RNFS.copyFile(cleanPath, destFullPath);

  await RNFS.scanFile(destFullPath);

  // Toast('Image saved to gallery');

  return destFullPath;
};

export const normalizeScans = (uris: string[]): Scan[] => {
  return uris.map(uri => ({
    id: `${uri}_${Date.now()}`,
    uri,
    createdAt: Date.now(),
  }));
};

export const saveToPdf = async (images: string[], pageSize: string, PDF_PAGE_SIZES: any[]) => {
  if (!images.length) return;

  const dir =
    RNFS.DownloadDirectoryPath ||
    RNFS.ExternalDirectoryPath ||
    RNFS.DocumentDirectoryPath;

  const outputPath = `${dir}/DocuSwift_${Date.now()}.pdf`;
  const sizeEntry = PDF_PAGE_SIZES.find(s => s.label === pageSize);
  const dimensions = sizeEntry ? sizeEntry.value : { width: 595, height: 842 };

  await createPdf({
    pages: images.map(img => ({
      imagePath: img,
      imageFit: 'cover',
      width: dimensions.width,
      height: dimensions.height,
    })),
    outputPath,
  });

  if (RNFS.scanFile) await RNFS.scanFile(outputPath);
  return outputPath;
};
