import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Bootsplash from 'react-native-bootsplash';
import BottomTab from './BottomTab';
import { navigationRef, setNavigationReady } from './NavigationRef';
import { useAppTheme } from '../hooks/useAppTheme';
import { DefaultTheme } from '@react-navigation/native';
import { Splash, SignUp, AllFiles } from '../app';

const Route = () => {
  const Stack = createNativeStackNavigator();
  const { colors, isDark } = useAppTheme();

  const navigationTheme = {
    ...DefaultTheme,
    dark: isDark,
    colors: {
      ...DefaultTheme.colors,
      primary: colors.primary,
      background: colors.background,
      card: colors.card,
      text: colors.text,
      border: colors.border,
      notification: colors.notification,
    },
  };

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={navigationTheme}
      onReady={() => {
        setNavigationReady();
        Bootsplash.hide({ fade: true });
      }}
    >
      <Stack.Navigator
        initialRouteName="splash"
        screenOptions={{
          // orientation: 'portrait',
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen
          name="splash"
          options={{ animation: 'fade' }}
          component={Splash}
        />
        <Stack.Screen name="main" component={BottomTab} />
        <Stack.Screen name="signin" component={SignUp} />
        <Stack.Screen name="files" component={AllFiles} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Route;
