import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useAppTheme } from '../../hooks/useAppTheme';
import { wp } from '../../constant/Dimensions';
import CustomText from '../Global/CustomText';

const FileAction = ({ item }: any) => {
  const { colors } = useAppTheme();
  return (
    <TouchableOpacity
      key={item?.id}
      onPress={item.onPress}
      style={[styles.rowTouchable, { backgroundColor: colors.container }]}
    >
      <item.icon color={colors.primary} size={wp(6)} />
      <View>
        <CustomText fontWeight="medium" variant="h5">
          {item.title}
        </CustomText>
        <CustomText>{item.desc}</CustomText>
      </View>
    </TouchableOpacity>
  );
};

export default FileAction;

const styles = StyleSheet.create({
  rowTouchable: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginTop: 10,
    elevation: 4,
    gap: 10,
  },
});
