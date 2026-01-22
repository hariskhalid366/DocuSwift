import {
  checkMultiple,
  requestMultiple,
  openSettings,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';

const LEGACY_PERMISSIONS = [
  PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
  PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
];

export const ensurePermission = async () => {
  const status = await checkMultiple(LEGACY_PERMISSIONS);

  const values = Object.values(status);

  if (values.every(v => v === RESULTS.GRANTED)) return true;

  if (values.some(v => v === RESULTS.BLOCKED)) {
    openSettings();
    return false;
  }

  const result = await requestMultiple(LEGACY_PERMISSIONS);

  const resultValues = Object.values(result);

  if (resultValues.some(v => v === RESULTS.BLOCKED)) {
    openSettings();
    return false;
  }

  return resultValues.every(v => v === RESULTS.GRANTED);
};
