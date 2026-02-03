import { StyleSheet, TouchableOpacity } from 'react-native';
import React, { memo } from 'react';
import { wp } from '../../constant/Dimensions';
import { ChipProps } from '../../types/TabTypes';
import CustomText from '../Global/CustomText';
import { useAppTheme } from '../../hooks/useAppTheme';

const Chip = ({ item }: { item: ChipProps }) => {
  const isFirst = item?.id === 1;
  const { colors } = useAppTheme();
  return (
    <TouchableOpacity
      onPress={() => item?.onPress(item.type)}
      key={item?.id}
      style={[
        styles.container,
        { backgroundColor: isFirst ? colors.primary : colors.container },
      ]}
    >
      <item.icon
        color={isFirst ? colors.background : colors.primary} // If selected, white/container color. If not, primary.
        size={wp(6)}
      />
      <CustomText
        color={isFirst ? colors.background : colors.text}
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
