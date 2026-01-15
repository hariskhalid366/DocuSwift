import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CustomText from '../Global/CustomText';
import { EllipsisVertical, LayoutGrid } from 'lucide-react-native';
import { colors } from '../../constant/colors';
import { wp } from '../../constant/Dimensions';
import HeaderParent from './HeaderParent';

const LibraryHeader = () => {
  return (
    <HeaderParent index={1}>
      <Image
        source={require('../../../assets/images/vector.jpeg')}
        style={{
          width: wp(12),
          height: wp(12),
          resizeMode: 'contain',
          borderRadius: 100,
        }}
      />
      <View style={{ flex: 1, paddingHorizontal: 10 }}>
        <CustomText fontWeight="semibold" variant="h4">
          Library
        </CustomText>
        {/* <CustomText fontWeight="medium" fontSize={10}>
          123 Documents
        </CustomText> */}
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 30 }}>
        <LayoutGrid color={colors.icon} size={wp(6)} fill={colors.icon} />
        <EllipsisVertical color={colors.icon} size={wp(6)} />
      </View>
    </HeaderParent>
  );
};

export default LibraryHeader;

const styles = StyleSheet.create({});
