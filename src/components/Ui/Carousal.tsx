import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useMemo } from 'react';
import CustomText from '../Global/CustomText';
import { hp, wp } from '../../constant/Dimensions';

const Carousal = useMemo(
  () =>
    ({ item, index, total }: any) => {
      return (
        <View style={[styles.listContainer]}>
          <Image source={{ uri: item }} style={styles.preview} />
          <View style={styles.pages}>
            <CustomText color="#fff">
              {index + 1}/{total}
            </CustomText>
          </View>
        </View>
      );
    },
  [],
);
export default Carousal;

const styles = StyleSheet.create({
  preview: {
    flex: 1,
    resizeMode: 'cover',
    borderRadius: wp(3),
  },
  pages: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 30,
    backgroundColor: '#00000077',
    alignSelf: 'flex-end',
    margin: 20,
    position: 'absolute',
  },
  listContainer: {
    width: wp(70),
    height: hp(55),
    borderRadius: 20,
  },
});
