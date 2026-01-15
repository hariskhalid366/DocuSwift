import React, { memo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Bootsplash from 'react-native-bootsplash';
import BottomTab from './BottomTab';
import { navigationRef, setNavigationReady } from './NavigationRef';
import { colors } from '../constant/colors';
import { Splash, SignUp, AllFiles } from '../app';

const Route = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer
      ref={navigationRef}
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

export default memo(Route);
