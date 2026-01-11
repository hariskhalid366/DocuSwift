import { Image, StyleSheet, View } from 'react-native';
import React from 'react';
import CustomText from '../Global/CustomText';
import moment from 'moment';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { wp } from '../../constant/Dimensions';

const HomeHeader = () => {
  const { top } = useSafeAreaInsets();
  return (
    <View style={[{ paddingTop: top }, styles.container]}>
      <View>
        <CustomText fontWeight="regular" fontSize={wp(3)}>
          {moment().format('dddd, DD MMM')}
        </CustomText>
        <CustomText fontWeight="semibold" variant="h4">
          Good morning, Haris
        </CustomText>
      </View>
      <Image
        source={require('../../../assets/images/vector.jpeg')}
        style={styles.profile}
      />
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    elevation: 4,
  },
  profile: {
    width: 50,
    aspectRatio: 1,
    resizeMode: 'cover',
    borderRadius: 100,
  },
});
