import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { memo } from 'react';
import { wp } from '../../constant/Dimensions';
import { ChipProps } from '../../types/TabTypes';
import CustomText from '../Global/CustomText';
import { colors } from '../../constant/colors';

const Chip = ({ item, onPress }: { item: ChipProps; onPress: () => void }) => {
  const isFirst = item?.id === 1;
  return (
    <TouchableOpacity
      onPress={onPress}
      key={item?.id}
      style={[
        styles.container,
        { backgroundColor: isFirst ? colors.primery : '#fff' },
      ]}
    >
      <item.icon
        color={isFirst ? colors.container : colors.primery}
        size={wp(6)}
      />
      <CustomText
        color={isFirst ? colors.container : colors.text}
        fontWeight="medium"
      >
        {item?.label}
      </CustomText>
    </TouchableOpacity>
  );
};

export default memo(Chip);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignSelf: 'center',
    elevation: 4,
    gap: 5,
  },
});
