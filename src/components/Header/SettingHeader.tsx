import { StyleSheet, View } from 'react-native';
import React from 'react';
import HeaderParent from './HeaderParent';
import CustomText from '../Global/CustomText';

const SettingHeader = () => {
  return (
    <HeaderParent>
      <View style={{ alignItems: 'center', flex: 1, paddingVertical: 10 }}>
        <CustomText variant="h5" fontWeight="semibold">
          Settings
        </CustomText>
      </View>
    </HeaderParent>
  );
};

export default SettingHeader;

const styles = StyleSheet.create({});
