import { Dimensions } from 'react-native';
export const wp = (value: number) => {
  const responseve = Dimensions.get('window');
  return (value * responseve.width) / 100;
};
export const hp = (value: number) => {
  const responseve = Dimensions.get('window');
  return (value * responseve.height) / 100;
};
