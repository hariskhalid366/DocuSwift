import { StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { colors } from '../../constant/colors';
import CustomText from './CustomText';

const Button = ({
  title,
  backgroundColor = colors.primery,
  color = colors.container,
  onPress,
}: {
  title: string;
  backgroundColor?: string;
  color?: string;
  onPress?: () => void;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, { backgroundColor }]}
    >
      <CustomText color={color} variant="h6" fontWeight="semibold">
        {title}
      </CustomText>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    elevation: 4,
  },
});
