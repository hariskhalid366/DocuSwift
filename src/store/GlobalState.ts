import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { mmkvStorage } from './Storage';
import { DocumentPickerResponse } from '@react-native-documents/picker';
import { Scan } from '../types/TabTypes';

type useDocuSwiftProps = {
  fileImported: DocumentPickerResponse[];
  scans: Scan[];
  handleScans: (val: string[]) => void;
  newImports: (file: DocumentPickerResponse) => void;
  pageSize: string;
  setPageSize: (val: string) => void;
};

export const useDocuSwift = create<useDocuSwiftProps>()(
  persist(
    set => ({
      fileImported: [],
      pageSize: 'A4',
      scans: [],
      
      setPageSize: (val: string) => {
        set(s => ({ pageSize: val }));
      },
      newImports: file => {
        set(s => ({ fileImported: [...s.fileImported, file] }));
      },

      handleScans: (scannedUris: string[]) => {
        set(state => {
          const existingUris = new Set(state.scans.map((s: Scan) => s.uri));

          const normalized = scannedUris
            .filter(uri => !existingUris.has(uri))
            .map(uri => ({
              id: `${uri}_${Date.now()}`,
              uri,
              createdAt: Date.now(),
            }));

          return {
            scans: [...state.scans, ...normalized],
          };
        });
      },
    }),
    {
      name: 'com.docuswift',
      storage: createJSONStorage(() => mmkvStorage),
      partialize: state => ({
        fileImported: state.fileImported,
        scans: state.scans,
        pageSize: state.pageSize,
      }),
    },
  ),
);
