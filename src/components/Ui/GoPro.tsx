import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Gem } from 'lucide-react-native/icons';
import { wp } from '../../constant/Dimensions';
import CustomText from '../Global/CustomText';
import Button from '../Global/Button';
import { useAppTheme } from '../../hooks/useAppTheme';
import { useAuth } from '../../context/AuthContext';

const GoPro = () => {
  const { colors } = useAppTheme();
  const { premium, purchasePremium } = useAuth();
  return (
    <>
      <View style={[styles.container, { backgroundColor: colors.container }]}>
        {premium && (
          <View
            style={[styles.overlay, { backgroundColor: colors.primary + 99 }]}
          >
            <CustomText color={'#fff'} fontWeight="bold" variant="h3">
              Activated
            </CustomText>
          </View>
        )}
        <View style={styles.goPro}>
          <Gem color={colors.primary} size={wp(6)} />
          <CustomText fontWeight="bold" fontSize={wp(3.5)}>
            Go Pro
          </CustomText>
        </View>
        <CustomText fontWeight="regular" variant="h6">
          Unlimited OCR, 100GB cloud storage & removed ads.
        </CustomText>
        <Button title="Upgrade for $4.99" onPress={purchasePremium} />
      </View>
    </>
  );
};

export default GoPro;

const styles = StyleSheet.create({
  container: {
    margin: 15,
    padding: 15,
    borderRadius: 15,
    elevation: 4,
    gap: 5,
    zIndex: 1,
  },
  goPro: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    zIndex: 100,
    borderRadius: 15,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
