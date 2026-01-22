import { StyleSheet, View } from 'react-native';
import React from 'react';
import HeaderParent from './HeaderParent';
import CustomText from '../Global/CustomText';

const SettingHeader = ({ label }: { label: string }) => {
  return (
    <HeaderParent index={40}>
      <View style={styles.container}>
        <CustomText variant="h5" fontWeight="semibold">
          {label}
        </CustomText>
      </View>
    </HeaderParent>
  );
};

export default SettingHeader;

const styles = StyleSheet.create({
  container: { alignItems: 'center', flex: 1, paddingVertical: 10 },
});
