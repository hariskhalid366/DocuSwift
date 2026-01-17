import { StyleSheet, View } from 'react-native';
import React from 'react';
import { colors } from '../../constant/colors';
import { Gem } from 'lucide-react-native/icons';
import { wp } from '../../constant/Dimensions';
import CustomText from '../Global/CustomText';
import Button from '../Global/Button';

const GoPro = () => {
  return (
    <View style={styles.container}>
      <View style={styles.goPro}>
        <Gem color={colors.primery} size={wp(6)} />
        <CustomText fontWeight="bold" fontSize={wp(3.5)}>
          Go Pro
        </CustomText>
      </View>
      <CustomText fontWeight="regular" variant="h6">
        Unlimited OCR, 100GB cloud storage & removed ads.
      </CustomText>
      <Button title="Upgrade for $4.99" />
    </View>
  );
};

export default GoPro;

const styles = StyleSheet.create({
  container: {
    margin: 15,
    padding: 15,
    borderRadius: 15,
    backgroundColor: colors.container,
    elevation: 4,
    gap: 5,
  },
  goPro: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
});
