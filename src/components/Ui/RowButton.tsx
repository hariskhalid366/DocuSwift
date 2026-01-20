import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import CustomText from '../Global/CustomText';
import { Check, ImagePlus } from 'lucide-react-native';
import { wp } from '../../constant/Dimensions';
import { useAppTheme } from '../../hooks/useAppTheme';

const RowButton = ({ leftAdd }: any) => {
  const { colors } = useAppTheme();
  return (
    <View style={[styles.container, { backgroundColor: colors.container }]}>
      <TouchableOpacity
        onPress={leftAdd}
        style={[styles.button, { backgroundColor: colors.buttonDark }]}
      >
        <ImagePlus color={colors.icon} size={wp(6)} />
        <CustomText>Add Pages</CustomText>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.primary }]}
      >
        <Check color={colors.container} size={wp(6)} />
        <CustomText color={colors.container} fontWeight="medium">
          Save PDF
        </CustomText>
      </TouchableOpacity>
    </View>
  );
};

export default RowButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingVertical: 20,
    elevation: 4,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,

    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
});
