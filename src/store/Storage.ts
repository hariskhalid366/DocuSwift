import { createMMKV } from 'react-native-mmkv';

export const Storage = createMMKV({
  id: 'com.harris.docuswift',
  encryptionKey: '38834343925745924b9249f069d1fa84eaf',
});

export const tokenStore = createMMKV({
  id: 'com.harris.docutokenswift',
  encryptionKey: '328b9249f069d1fa84eaf8349249f069d1f3439257',
});

export const mmkvStorage = {
  setItem: (key: string, value: any) => {
    Storage.set(key, value);
  },
  getItem: (key: string) => {
    let value = Storage.getString(key);
    return value ?? null;
  },
  removeItem: (key: string) => {
    Storage.remove(key);
  },
};
