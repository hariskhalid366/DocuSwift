import React from 'react';
import Route from './src/navigation/Route';
import { StatusBar } from 'react-native';
import { AuthProvider } from './src/context/AuthContext';

import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  return (
    <AuthProvider>
      <StatusBar barStyle={'dark-content'} />
      <Route />
    </AuthProvider>
  );
};

export default App;
