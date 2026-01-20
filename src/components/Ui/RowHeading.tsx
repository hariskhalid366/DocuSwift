import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import CustomText from '../Global/CustomText';
import { ChevronRight } from 'lucide-react-native';
import { wp } from '../../constant/Dimensions';
import { navigate } from '../../navigation/NavigationRef';
import { useAppTheme } from '../../hooks/useAppTheme';

const RowHeading = ({ title, isAll }: any) => {
  const { colors } = useAppTheme();
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
          <CustomText fontWeight="regular" variant="h6" color={colors.primary}>
            View All
          </CustomText>
          <ChevronRight color={colors.primary} size={wp(4.5)} />
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
