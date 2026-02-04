import { VirtualFileMeta } from '@react-native-documents/picker';

export type TileProps = {
  id: number;
  label: string;
  icon: any;
  title: any;
  desc: string;
  color: any;
  fill: boolean;
};
export type ChipProps = {
  id: number;
  label: string;
  icon: any;
  onPress: (val: string) => void;
  type: string;
};

export type FileProps = {
  id?: string;
  name?: string;
  type?: string;
  size?: string;
  time?: string;
  icon?: any;
};

export type UserProps = {
  email: string | null;
  familyName: string | null;
  givenName: string | null;
  id: string | null;
  name: string | null;
  photo: string | null;
};

export interface ImportProps {
  uri: string;
  name: string | null;
  error: string | null;
  type: string | null;
  nativeType: string | null;
  size: number | null;
  isVirtual: boolean | null;
  convertibleToMimeTypes: VirtualFileMeta[] | null;
  hasRequestedType: boolean;
}

export type Scan = {
  id: string;
  uri: string;
  createdAt: number;
};

export type actionItems = {
  id: string;
  title: string;
  desc: string;
  icon: any;
  onPress: () => void;
};



export type PageSize = {
  label: string;
  value: { width: number; height: number };
};
