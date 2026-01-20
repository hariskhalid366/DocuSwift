import React from 'react';
import Route from './src/navigation/Route';
import { StatusBar } from 'react-native';
import { AuthProvider } from './src/context/AuthContext';
import { ThemeProvider, useAppTheme } from './src/hooks/useAppTheme';

const DynamicStatusBar = () => {
  const { isDark } = useAppTheme();
  return <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />;
};

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <DynamicStatusBar />
        <Route />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
