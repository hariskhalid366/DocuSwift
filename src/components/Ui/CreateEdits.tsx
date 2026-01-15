import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import CustomText from '../Global/CustomText';
import {
  BrushCleaning,
  ChevronRight,
  LucideTrash2,
  Trash2,
} from 'lucide-react-native';
import { colors } from '../../constant/colors';
import { wp } from '../../constant/Dimensions';

const CreateEdits = ({ setImages }: any) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.touchable}>
        <View style={styles.iconBg}>
          <Trash2 color={colors.icon} size={wp(6)} />
        </View>
        <CustomText fontWeight="medium" variant="h6">
          Delete
        </CustomText>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setImages([])} style={styles.touchable}>
        <View style={styles.iconBg}>
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
    backgroundColor: colors.container,
    padding: 12,
    borderRadius: 30,
  },
});
