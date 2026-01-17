import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import CustomText from '../Global/CustomText';
import { colors } from '../../constant/colors';

const ProfileSection = () => {
  const { user, premium } = useAuth();
  return (
    <View style={styles.container}>
      <Image source={{ uri: user?.photo }} style={styles.profile} />
      <View>
        <CustomText fontWeight="bold" variant="h3">
          {user?.name}
        </CustomText>
        <CustomText fontWeight="regular" variant="h6">
          {user?.email}
        </CustomText>

        <CustomText
          color={!premium ? colors.primery : colors.text}
          fontWeight="regular"
          variant="h7"
        >
          {!premium ? 'Premium' : 'Free'} Account
        </CustomText>
      </View>
    </View>
  );
};

export default ProfileSection;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    padding: 15,
    alignItems: 'center',
  },
  profile: {
    width: 80,
    aspectRatio: 1,
    resizeMode: 'cover',
    borderRadius: 100,
  },
});
