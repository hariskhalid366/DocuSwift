import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import CustomText from '../../components/Global/CustomText';
import { colors } from '../../constant/colors';
import { useAuth } from '../../context/AuthContext';
import { wp } from '../../constant/Dimensions';

GoogleSignin.configure({
  webClientId:
    '883434392574-c5f40krraq76ppmbd55g0cabmd8pqron.apps.googleusercontent.com',
  offlineAccess: true,
});

const SignUp = () => {
  const { loginWithGoogle } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Image
          source={require('../../../assets/icons/google.png')}
          style={styles.google}
          resizeMode="cover"
        />
        <CustomText variant="h2" fontWeight="bold">
          Google Signin
        </CustomText>
        <CustomText fontWeight="medium" variant="h6">
          Signin with Google to get extra features
        </CustomText>

        <TouchableOpacity
          onPress={loginWithGoogle}
          activeOpacity={0.6}
          style={styles.signinButton}
        >
          <Image
            source={require('../../../assets/icons/google.png')}
            style={styles.buttonImage}
          />
          <CustomText fontWeight="medium" color={colors.container} variant="h6">
            Signin
          </CustomText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    backgroundColor: colors.container,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 30,
    elevation: 4,
  },
  google: {
    marginBottom: 20,
    width: wp(10),
    height: wp(10),
  },
  signinButton: {
    backgroundColor: colors.primery,
    flexDirection: 'row',
    gap: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 12,
    borderRadius: 15,
    width: wp(40),
    paddingVertical: 12,
  },
  buttonImage: {
    width: 20,
    height: 20,
    tintColor: colors.container,
  },
});
