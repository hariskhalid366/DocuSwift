import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import CustomText from '../Global/CustomText';
import { colors } from '../../constant/colors';

const RowHeading = () => {
  return (
    <View style={styles.container}>
      <CustomText fontWeight="bold" variant="h4">
        Recent Document
      </CustomText>
      <TouchableOpacity>
        <CustomText fontWeight="regular" variant="h6" color={colors.primery}>
          View All
        </CustomText>
      </TouchableOpacity>
    </View>
  );
};

export default RowHeading;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
  },
});
