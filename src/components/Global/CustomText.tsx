import React, { FC, memo } from 'react';
import { Platform, StyleSheet, Text, TextStyle } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useAppTheme } from '../../hooks/useAppTheme';
// import { theme } from '../../constants/Colors';

type Variant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'h7';
type PlatformType = 'android' | 'ios';

type FontWeight = 'bold' | 'semibold' | 'medium' | 'regular' | 'light';

interface CustomTextProps {
  variant?: Variant;
  fontWeight?: FontWeight;
  fontSize?: number;
  color?: string;
  style?: TextStyle | TextStyle[];
  children?: React.ReactNode;
  numberOfLines?: number;
  onLayout?: (event: any) => void;
  selectable?: boolean;
}

// 🔠 Font weight map — easy shorthand → actual font names
const fontFamilyMap: Record<FontWeight, string> = {
  bold: 'Poppins-Bold',
  semibold: 'Poppins-SemiBold',
  medium: 'Poppins-Medium',
  regular: 'Poppins-Regular',
  light: 'Poppins-Light',
};

// 🔢 Default sizes by variant
const fontSizeMap: Record<Variant, Record<PlatformType, number>> = {
  h1: { android: 24, ios: 22 },
  h2: { android: 22, ios: 20 },
  h3: { android: 20, ios: 18 },
  h4: { android: 18, ios: 16 },
  h5: { android: 16, ios: 14 },
  h6: { android: 12, ios: 10 },
  h7: { android: 10, ios: 9 },
};

const CustomText: FC<CustomTextProps> = ({
  variant,
  fontWeight = 'regular',
  fontSize,
  style,
  color,
  children,
  numberOfLines,
  onLayout,
  selectable = false,
  ...props
}) => {
  const { colors } = useAppTheme();
  // ✅ Compute font size using variant map or fallback
  let computedFontSize: number =
    Platform.OS === 'android'
      ? RFValue(fontSize || 12)
      : RFValue(fontSize || 10);

  if (variant && fontSizeMap[variant]) {
    const defaultSize = fontSizeMap[variant][Platform.OS as PlatformType];
    computedFontSize = RFValue(fontSize || defaultSize);
  }

  const fontFamilyStyle = {
    fontFamily: fontFamilyMap[fontWeight],
  };

  return (
    <Text
      style={[
        styles.text,
        {
          color: color || colors.text,
          fontSize: computedFontSize,
        },
        fontFamilyStyle,
        style,
      ]}
      onLayout={onLayout}
      numberOfLines={numberOfLines}
      selectable={selectable}
      {...props}
    >
      {children}
    </Text>
  );
};

export default memo(CustomText);

const styles = StyleSheet.create({
  text: {
    textAlign: 'left',
    includeFontPadding: false,
  },
});
