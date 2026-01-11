import { ToastAndroid } from 'react-native';

export const Toast = (value: string) => {
  return ToastAndroid.showWithGravity(
    value,
    ToastAndroid.CENTER,
    ToastAndroid.LONG,
  );
};
