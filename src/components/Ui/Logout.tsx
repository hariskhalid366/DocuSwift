import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Button from '../Global/Button';
import { colors } from '../../constant/colors';
import CustomText from '../Global/CustomText';
import { wp } from '../../constant/Dimensions';

const Logout = () => {
  return (
    <View style={styles.container}>
      <Button
        title="Sign Out"
        backgroundColor={colors.container}
        color={'red'}
      />
      <View style={{ alignItems: 'center' }}>
        <Image
          style={styles.image}
          source={require('../../../assets/images/logo.png')}
        />
        <CustomText color={colors.textLight} fontWeight="light" variant="h7">
          DocuSwift v1.2.0 (Build 07)
        </CustomText>
        <CustomText
          color={colors.textLight}
          fontWeight="light"
          fontSize={wp(2)}
        >
          Made wih care for productivity
        </CustomText>
      </View>
    </View>
  );
};

export default Logout;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    gap: 20,
  },
  image: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
});
