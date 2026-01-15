import { create, createStore } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { mmkvStorage } from './Storage';
import { ImportProps } from '../types/TabTypes';
import { DocumentPickerResponse } from '@react-native-documents/picker';

type useDocuSwiftProps = {
  fileImported: DocumentPickerResponse[];
  newImports: (file: DocumentPickerResponse) => void;
};

export const useDocuSwift = create<useDocuSwiftProps>()(
  persist(
    (set, get) => ({
      fileImported: [],
      newImports: file => {
        set(s => ({ fileImported: [...s.fileImported, file] }));
      },
    }),
    {
      name: 'com.docuswift',
      storage: createJSONStorage(() => mmkvStorage),
      partialize: state => ({
        fileImported: state.fileImported,
      }),
    },
  ),
);
