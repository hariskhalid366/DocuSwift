import * as RNFS from 'react-native-fs';

export const requestRootAccess = async () => {
  try {
    const result = await RNFS.readDir(RNFS.ExternalStorageDirectoryPath);
    

    if (result.length === 0) return null;

    const stats = await RNFS.stat(result[0].path);
    return [stats, result[0].path];
  } catch (error) {
    console.error('Error accessing directory:', error);
    throw error;
  }
};

// export const persistPermission = async uri => {
//   await ReactNativeBlobUtil.android.takePersistablePermission(uri);
// };

// export const listFiles = async treeUri => {
//   const files = await ReactNativeBlobUtil.android.ls(treeUri);
//   return files;
// };

import { NativeModules } from 'react-native';
const { SAFBridge } = NativeModules;

export const openRootDirectory = async () => {
  try {
    const uri = await SAFBridge.openRootDirectory();
    return uri;
  } catch (err) {
    console.log('Error opening root:', err);
    return null;
  }
};

export const listFiles = async (uri: string) => {
  try {
    const files = await SAFBridge.listFiles(uri);
    return files;
  } catch (err) {
    console.log('Error listing files:', err);
    return [];
  }
};
