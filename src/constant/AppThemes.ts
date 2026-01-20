export interface ThemeColors {
  primary: string;
  background: string;
  card: string;
  text: string;
  textLight: string;
  border: string;
  notification: string;
  icon: string;
  container: string;
  buttonDark: string;
  // Accents
  orange: string;
  green: string;
  purple: string;
  // Background variants
  bg1: string;
  bg2: string;
  bg3: string;
  bg4: string;
  light: string; // Used in some places as light gray/border
  dark: string; // Used as dark accent
}

export const LightTheme: ThemeColors = {
  primary: '#1867E7',
  background: '#F6F7F8',
  card: '#ffffff',
  text: '#000000',
  textLight: '#00000055',
  border: '#E0E3E8',
  notification: '#FF3B30',
  icon: '#000000',
  container: '#ffffff',
  buttonDark: '#F0F2F4',

  orange: '#F97316',
  green: '#20C45D',
  purple: '#aa1cec',

  bg1: '#DECBA8',
  bg2: '#EDA988',
  bg3: '#E9E9E9',
  bg4: '#EEF4FF',

  light: '#E0E3E8',
  dark: '#0F172A',
};

export const DarkTheme: ThemeColors = {
  primary: '#3B82F6', // Lighter blue for dark mode
  background: '#0F172A', // Slate 900
  card: '#1E293B', // Slate 800
  text: '#F1F5F9', // Slate 100
  textLight: '#94A3B8', // Slate 400
  border: '#334155', // Slate 700
  notification: '#FF453A',
  icon: '#F1F5F9',
  container: '#1E293B',
  buttonDark: '#334155',

  orange: '#FB923C',
  green: '#4ADE80',
  purple: '#C084FC',

  bg1: '#3D342B', // Darker versions of inputs
  bg2: '#4A352A',
  bg3: '#2A2A2A',
  bg4: '#1E293B',

  light: '#334155',
  dark: '#F8FAFC',
};

export const PremiumTheme: ThemeColors = {
  primary: '#D4AF37', // Gold
  background: '#000000', // Pure Black
  card: '#121212', // Dark Gray
  text: '#EAEAEA',
  textLight: '#A0A0A0',
  border: '#333333',
  notification: '#D4AF37',
  icon: '#D4AF37', // Gold Icons
  container: '#121212',
  buttonDark: '#2C2C2C',

  orange: '#D4AF37', // Gold override or keep orange? Let's keep accents but gold-shifted? No, keep logic.
  green: '#20C45D',
  purple: '#aa1cec',

  bg1: '#2C2518', // Gold tint
  bg2: '#2C1F18',
  bg3: '#1A1A1A',
  bg4: '#121212',

  light: '#333333',
  dark: '#FFFFFF',
};
