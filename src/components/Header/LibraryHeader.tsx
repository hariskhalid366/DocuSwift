import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import CustomText from '../Global/CustomText';
import { EllipsisVertical, LayoutGrid } from 'lucide-react-native';
import { wp } from '../../constant/Dimensions';
import HeaderParent from './HeaderParent';
import { useAppTheme } from '../../hooks/useAppTheme';

const LibraryHeader = ({ onPress }: { onPress: () => void }) => {
  const { colors } = useAppTheme();

  return (
    <HeaderParent index={30}>
      <Image
        source={require('../../../assets/images/vector.jpeg')}
        style={styles.avatar}
      />

      <View style={styles.titleContainer}>
        <CustomText fontWeight="semibold" variant="h4">
          Library
        </CustomText>
      </View>

      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={onPress}>
          <LayoutGrid size={wp(6)} color={colors.icon} fill={colors.icon} />
        </TouchableOpacity>
        <EllipsisVertical size={wp(6)} color={colors.icon} />
      </View>
    </HeaderParent>
  );
};

export default LibraryHeader;

const styles = StyleSheet.create({
  avatar: {
    width: wp(12),
    height: wp(12),
    resizeMode: 'contain',
    borderRadius: 100,
  },
  titleContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 30,
  },
});
