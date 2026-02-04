import * as Lucide from 'lucide-react-native';
import { colors } from './colors';
import { ThemeMode } from '../store/ThemeStore';
export const TabIcons = [
  { id: 1, label: 'Home', icon: Lucide.Home },
  { id: 2, label: 'Files', icon: Lucide.Folder },
  { id: 3, label: 'Create', icon: Lucide.PlusIcon },
  { id: 4, label: 'Stats', icon: Lucide.ChartArea },
  { id: 5, label: 'Setting', icon: Lucide.Settings },
];

export const buildTilesList = ({
  scansCount,
  importsCount,
}: {
  scansCount: number;
  importsCount: number;
}) => [
  {
    id: 1,
    label: 'Scans',
    icon: Lucide.ScanText,
    fill: false,
    color: colors.primery,
    title: scansCount,
    desc: 'This Week',
  },
  {
    id: 2,
    label: 'Storage',
    icon: Lucide.Cloud,
    fill: true,
    color: colors.orange,
    title: '1.2 GB',
    desc: '15 GB Available',
  },
  {
    id: 3,
    label: 'Imports',
    icon: Lucide.FolderDown,
    fill: false,
    color: colors.dark,
    title: importsCount,
    desc: 'Pdf, Docs, ...',
  },
  {
    id: 4,
    label: 'Upcoming Tools',
    icon: Lucide.Wrench,
    fill: true,
    color: colors.green,
    title: 'OCR',
    desc: 'Available soon',
  },
];

export const ChipList = [
  {
    id: 1,
    label: 'New Scan',
    icon: Lucide.Camera,
  },
  {
    id: 2,
    label: 'Scan ID',
    icon: Lucide.IdCard,
  },
  {
    id: 3,
    label: 'Import',
    icon: Lucide.LucideFilePlus2,
  },
];

export const FILES = [
  {
    id: '1',
    name: 'Haris_Khalid.pdf',
    type: 'pdf',
    size: '2.4 MB',
    time: '2 min ago',
    icon: require('../../assets/icons/pdf.png'),
  },
  {
    id: '2',
    name: 'Project_Report.docx',
    type: 'docx',
    size: '1.8 MB',
    time: '12 min ago',
    icon: require('../../assets/icons/doc.png'),
  },
  {
    id: '3',
    name: 'Invoice_2025.xlsx',
    type: 'xlsx',
    size: '980 KB',
    time: '1 hour ago',
    icon: require('../../assets/icons/pdf.png'),
  },
  {
    id: '4',
    name: 'Design_Preview.png',
    type: 'image',
    size: '3.2 MB',
    time: 'Today',
    icon: require('../../assets/icons/pdf.png'),
  },
  {
    id: '5',
    name: 'Meeting_Audio.m4a',
    type: 'audio',
    size: '5.7 MB',
    time: 'Yesterday',
    icon: require('../../assets/icons/doc.png'),
  },
  {
    id: '6',
    name: 'Resume_Haris.pdf',
    type: 'pdf',
    size: '620 KB',
    time: '3 days ago',
    icon: require('../../assets/icons/pdf.png'),
  },
  {
    id: '7',
    name: 'Budget_2025.xlsx',
    type: 'xlsx',
    size: '1.2 MB',
    time: '1 week ago',
    icon: require('../../assets/icons/pdf.png'),
  },
  {
    id: '8',
    name: 'Contract_Final.docx',
    type: 'docx',
    size: '890 KB',
    time: '2 weeks ago',
    icon: require('../../assets/icons/doc.png'),
  },
];

export const PAGE_COLORS = ['#DECBA8', '#EDA988', '#E9E9E9', '#EEF4FF'];


export const PDF_PAGE_SIZES = [
  { label: 'A4', value: { width: 595, height: 842 } },
  { label: 'A5', value: { width: 420, height: 595 } },
  { label: 'A3', value: { width: 842, height: 1191 } },
  { label: 'Letter', value: { width: 612, height: 792 } },
  { label: 'Legal', value: { width: 612, height: 1008 } },
  { label: 'B5', value: { width: 499, height: 709 } },
  { label: 'Executive', value: { width: 522, height: 756 } },
  { label: 'Square', value: { width: 595, height: 595 } },
];

export const themes: { label: string; value: ThemeMode }[] = [
    { label: 'System Default', value: 'system' },
    { label: 'Light', value: 'light' },
    { label: 'Dark', value: 'dark' },
    { label: 'Premium', value: 'premium' },
  ];