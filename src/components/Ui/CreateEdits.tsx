import { StyleSheet,  TouchableOpacity, View } from 'react-native';
import React from 'react';
import CustomText from '../Global/CustomText';
import {
  BrushCleaning,
  Trash2,
} from 'lucide-react-native';
import { wp } from '../../constant/Dimensions';
import { useAppTheme } from '../../hooks/useAppTheme';

const CreateEdits = ({ setImages }: any) => {
  const { colors } = useAppTheme();
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.touchable}>
        <View style={[styles.iconBg, { backgroundColor: colors.container }]}>
          <Trash2 color={colors.icon} size={wp(6)} />
        </View>
        <CustomText fontWeight="medium" variant="h6">
          Delete
        </CustomText>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setImages([])} style={styles.touchable}>
        <View style={[styles.iconBg, { backgroundColor: colors.container }]}>
          <BrushCleaning color={colors.icon} size={wp(6)} />
        </View>
        <CustomText fontWeight="medium" variant="h6">
          Clear All
        </CustomText>
      </TouchableOpacity>
    </View>
  );
};

export default CreateEdits;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginHorizontal: 15,
    paddingBottom: 10,
  },
  touchable: {
    alignItems: 'center',
    gap: 10,
  },
  iconBg: {
    padding: 12,
    borderRadius: 30,
  },
});
