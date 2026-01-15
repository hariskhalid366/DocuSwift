import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';

export const wp = (value: number) => {
  return widthPercentageToDP(value);
};

export const hp = (value: number) => {
  return heightPercentageToDP(value);
};
