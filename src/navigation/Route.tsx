import React, { memo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Bootsplash from 'react-native-bootsplash';
import BottomTab from './BottomTab';
import { navigationRef } from './NavigationRef';
import { colors } from '../constant/colors';
import { useAuth } from '../context/AuthContext';
import { Splash } from '../app';

const Route = () => {
  const Stack = createNativeStackNavigator();
  const { isAuthenticated, user } = useAuth();

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => Bootsplash.hide({ fade: true })}
    >
      <Stack.Navigator
        initialRouteName="splash"
        screenOptions={{
          orientation: 'portrait',
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen
          name="splash"
          options={{ animation: 'fade' }}
          component={Splash}
        />
        {user && isAuthenticated ? (
          <Stack.Screen name="main" component={BottomTab} />
        ) : (
          <Stack.Screen name="signin" component={BottomTab} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default memo(Route);
