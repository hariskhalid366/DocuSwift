import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import CustomText from '../Global/CustomText';
import { colors } from '../../constant/colors';
import { ChevronRight } from 'lucide-react-native';
import { wp } from '../../constant/Dimensions';
import { navigate } from '../../navigation/NavigationRef';

const RowHeading = ({ title, isAll }: any) => {
  return (
    <View style={styles.container}>
      <CustomText fontWeight="bold" variant="h5">
        {title}
      </CustomText>

      {isAll && (
        <TouchableOpacity
          onPress={() => navigate('Files')}
          style={styles.touchable}
        >
          <CustomText fontWeight="regular" variant="h6" color={colors.primery}>
            View All
          </CustomText>
          <ChevronRight color={colors.primery} size={wp(4.5)} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default RowHeading;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 15,
    paddingTop: 10,
  },
  touchable: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
