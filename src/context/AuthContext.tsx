import React, { createContext, useContext, useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Toast } from '../components/Global/ShowToast';
import { Storage, tokenStore } from '../store/Storage';
import { AuthContextType } from '../types/AuthType';
import { useMMKVObject } from 'react-native-mmkv';
import { UserProps } from '../types/TabTypes';
import { Platform } from 'react-native';
import Purchases, {
  LOG_LEVEL,
  PurchasesPackage,
} from 'react-native-purchases';

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useMMKVObject<UserProps | null | undefined>(
    'user',
    Storage,
  );
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [premium, setPremium] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initPurchases = async () => {
      try {
        Purchases.setLogLevel(LOG_LEVEL.DEBUG);
        if (Platform.OS === 'ios') {
          // await Purchases.configure({ apiKey: "REVENUE_CAT_IOS_API_KEY" });
        } else {
          await Purchases.configure({
            apiKey: 'test_djvxuIPovtsqzPJhSSfijQEUsfy',
          });
        }
        const customerInfo = await Purchases.getCustomerInfo();
        setPremium(customerInfo.entitlements.active.premium !== undefined);

        Purchases.addCustomerInfoUpdateListener(info => {
          setPremium(info.entitlements.active.premium !== undefined);
        });
      } catch (error) {
        console.log('Error initializing RevenueCat:', error);
      }
    };
    initPurchases();

    const unsub = auth().onAuthStateChanged(u => {
      if (u) {
        setIsAuthenticated(!!u?.email);
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  const loginWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const { data } = await GoogleSignin.signIn();

      if (!data?.idToken) {
        throw new Error('No ID token found');
      }

      const credential = auth.GoogleAuthProvider.credential(data.idToken);
      await auth().signInWithCredential(credential);
      tokenStore.set('idToken', data?.idToken);
      setUser(data?.user);
      Toast('Signed in successfully');
    } catch (e) {
      console.log(e);

      Toast('Login failed');
    }
  };

  const logout = async () => {
    try {
      await auth().signOut();
      await GoogleSignin.signOut();
      tokenStore.remove('idToken');
      setUser(null);
      setIsAuthenticated(false);
    } catch (e) {
      console.log(e);

      Toast('Logout failed');
    }
  };

  const purchasePremium = async () => {
    try {
      const offerings = await Purchases.getOfferings();
      if (
        offerings.current !== null &&
        offerings.current.availablePackages.length !== 0
      ) {
        const packageToBuy: PurchasesPackage =
          offerings.current.availablePackages[0];
        const { customerInfo } = await Purchases.purchasePackage(packageToBuy);
        if (customerInfo.entitlements.active.premium !== undefined) {
          setPremium(true);
          Toast('Welcome to Premium!');
        }
      }
    } catch (e: any) {
      if (!e.userCancelled) {
        console.log('Purchase error:', e);
        Toast('Purchase failed');
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        loginWithGoogle,
        logout,
        premium,
        purchasePremium,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
