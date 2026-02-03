import moment from 'moment';
import { Platform } from 'react-native';
import RNFS from 'react-native-fs';
import { Toast } from '../components/Global/ShowToast';
import { Scan } from '../types/TabTypes';

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

  Toast('Image saved to gallery');

  return destFullPath;
};

export const normalizeScans = (uris: string[]): Scan[] => {
  return uris.map(uri => ({
    id: `${uri}_${Date.now()}`,
    uri,
    createdAt: Date.now(),
  }));
};
