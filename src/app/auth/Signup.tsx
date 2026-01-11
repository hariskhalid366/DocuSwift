import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Breaker from '../../component/Breaker';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithCredential,
} from '@react-native-firebase/auth';
import { Toast } from '../../components/Global/ShowToast';
import { resetAndNavigate } from '../../navigation/NavigationRef';

GoogleSignin.configure({
  webClientId:
    '870382999773-b2g22lu82mrkt5nl3pvsh68oqmkaik4v.apps.googleusercontent.com',
  offlineAccess: true,
});

type UserData = {
  skip?: boolean;
  [key: string]: any;
};

const GoogleSigninScreen = () => {
  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      const { data } = await GoogleSignin.signIn();

      if (!data?.idToken) {
        throw new Error('No ID token found');
      }

      const googleCredential = GoogleAuthProvider.credential(data.idToken);
      const fire = await signInWithCredential(getAuth(), googleCredential);

      Toast('Signin Successfully');
    } catch (error) {
      console.log('❌ Google Sign-In Error:', error);
      Toast('Google Sign-In failed. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Image
          source={require('../../assets/images/Google.png')}
          style={styles.google}
          resizeMode="cover"
        />
        <CustomText variant="h2" fontFamily="Okra-Bold">
          Google Signin
        </CustomText>
        <CustomText>Signin with Google to get extra features</CustomText>
      </View>

      <TouchableOpacity
        onPress={signInWithGoogle}
        activeOpacity={0.6}
        style={[styles.signinButton, { borderColor: Colors.text }]}
      >
        <Image
          source={require('../../assets/images/Google.png')}
          style={[styles.buttonImage, { tintColor: Colors.text }]}
        />
        <CustomText variant="h5">Signin</CustomText>
      </TouchableOpacity>

      {!user?.skip ? (
        <>
          <Breaker text="or" />
          <TouchableOpacity
            onPress={skipAndContinue}
            activeOpacity={0.6}
            style={[styles.signinButton, { borderColor: Colors.text }]}
          >
            <CustomText variant="h6">Skip for now</CustomText>
          </TouchableOpacity>
        </>
      ) : null}
    </View>
  );
};

export default GoogleSigninScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    alignItems: 'center',
    gap: 3,
  },
  google: {
    marginBottom: 20,
    width: screenWidth * 0.15,
    height: screenWidth * 0.15,
  },
  signinButton: {
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
    marginVertical: screenHeight * 0.02,
    borderWidth: 0.8,
    borderRadius: 15,
    paddingHorizontal: screenWidth * 0.2,
    paddingVertical: screenWidth * 0.025,
  },
  buttonImage: {
    width: 20,
    height: 20,
  },
});
