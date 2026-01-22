import React, { createContext, useContext, useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Toast } from '../components/Global/ShowToast';
import { Storage, tokenStore } from '../store/Storage';
import { AuthContextType } from '../types/AuthType';
import { useMMKVObject } from 'react-native-mmkv';
import { UserProps } from '../types/TabTypes';

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useMMKVObject<UserProps | null | undefined>(
    'user',
    Storage,
  );
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const [premium, setPremium] = useState(false);
  let premium = false;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        loginWithGoogle,
        logout,
        premium,
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
