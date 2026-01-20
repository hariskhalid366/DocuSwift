import { StyleSheet, View } from 'react-native';
import React, { memo } from 'react';
import { hp, wp } from '../../constant/Dimensions';
import CustomText from '../Global/CustomText';
import { useAppTheme } from '../../hooks/useAppTheme';
import { TileProps } from '../../types/TabTypes';

const Tile = ({ item }: { item: TileProps }) => {
  const { colors } = useAppTheme();
  return (
    <View style={[styles.container, { backgroundColor: colors.container }]}>
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          gap: 10,
        }}
      >
        <View
          style={{
            backgroundColor: item.color + 44,
            borderRadius: 20,
            padding: 8,
          }}
        >
          <item.icon
            fill={item.fill ? item.color : 'none'}
            color={item.color}
            size={wp(5)}
            strokeWidth={2.5}
          />
        </View>
        <CustomText
          numberOfLines={2}
          style={{ width: 90 }}
          fontWeight="medium"
          variant="h6"
        >
          {item?.label}
        </CustomText>
      </View>
      <CustomText style={{ padding: 5 }} fontWeight="semibold" variant="h4">
        {item?.title}
      </CustomText>
      <CustomText
        color={colors.textLight}
        style={{
          paddingHorizontal: 5,
        }}
        fontWeight="semibold"
        variant="h6"
      >
        {item?.desc}
      </CustomText>
    </View>
  );
};

export default memo(Tile);

const styles = StyleSheet.create({
  container: {
    width: wp(42),
    height: hp(15),
    justifyContent: 'space-between',
    padding: 15,
    borderRadius: 15,
    alignSelf: 'center',
    elevation: 4,
  },
});
