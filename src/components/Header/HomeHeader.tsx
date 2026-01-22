import { Image, StyleSheet, View } from 'react-native';
import React from 'react';
import CustomText from '../Global/CustomText';
import moment from 'moment';
import { wp } from '../../constant/Dimensions';
import { useAuth } from '../../context/AuthContext';
import { getDayPeriod } from '../../utils/helper';
import HeaderParent from './HeaderParent';

const HomeHeader = () => {
  const { user } = useAuth();

  return (
    <HeaderParent index={0}>
      <View style={{ width: wp(80) }}>
        <CustomText fontWeight="regular" fontSize={wp(3)}>
          {moment().format('dddd, DD MMM')}
        </CustomText>
        <CustomText numberOfLines={1} fontWeight="semibold" variant="h4">
          {getDayPeriod()}, {user?.name}
        </CustomText>
      </View>
      <Image source={{ uri: user?.photo }} style={styles.profile} />
    </HeaderParent>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  profile: {
    width: 50,
    aspectRatio: 1,
    resizeMode: 'cover',
    borderRadius: 100,
  },
});
