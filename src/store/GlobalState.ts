import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { mmkvStorage } from './Storage';
import { DocumentPickerResponse } from '@react-native-documents/picker';

type useDocuSwiftProps = {
  fileImported: DocumentPickerResponse[];
  newImports: (file: DocumentPickerResponse) => void;
  importCount: number;
  setImportCount: (count: number) => void;
};

export const useDocuSwift = create<useDocuSwiftProps>()(
  persist(
    set => ({
      fileImported: [],
      importCount: 0,
      newImports: file => {
        set(s => ({ fileImported: [...s.fileImported, file] }));
        set(s => ({ importCount: s.importCount + 1 }));
      },
      setImportCount: count => {
        set(s => ({ importCount: s.importCount + count }));
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
