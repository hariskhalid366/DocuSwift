import { StyleSheet, View } from 'react-native';
import React, { memo, useEffect, useRef } from 'react';
import Animated, {
  FadeIn,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import CustomText from '../../components/Global/CustomText';
import { wp } from '../../constant/Dimensions';
import { resetAndNavigate } from '../../navigation/NavigationRef';
import { useAuth } from '../../context/AuthContext';
import { useAppTheme } from '../../hooks/useAppTheme';

const Splash = memo(() => {
  const { isAuthenticated, user, loading } = useAuth();
  const { colors } = useAppTheme();
  const navigated = useRef(false);

  const logo = useSharedValue(0);
  const progress = useSharedValue(0);

  useEffect(() => {
    logo.value = withTiming(1, { duration: 800 });
    progress.value = withDelay(250, withTiming(1, { duration: 1300 }));

    const t = setTimeout(() => {
      if (navigated.current || loading) return;
      navigated.current = true;

      resetAndNavigate(isAuthenticated && user ? 'main' : 'signin');
    }, 1600);

    return () => clearTimeout(t);
  }, [loading]);

  const logoStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: interpolate(logo.value, [0, 1], [40, 0]) }],
  }));

  const textStyle = useAnimatedStyle(() => ({
    opacity: logo.value,
    transform: [{ translateY: interpolate(logo.value, [0, 1], [20, 0]) }],
  }));

  const progressStyle = useAnimatedStyle(() => ({
    width: interpolate(progress.value, [0, 1], [0, 160]),
  }));

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Animated.Image
        source={require('../../../assets/images/logo.png')}
        style={[styles.logo, logoStyle]}
        resizeMode="contain"
      />

      <Animated.View style={textStyle}>
        <CustomText fontWeight="semibold" fontSize={wp(8)}>
          Docu
          <CustomText
            fontWeight="semibold"
            fontSize={wp(8.2)}
            color={colors.primary}
          >
            Swift
          </CustomText>
        </CustomText>
      </Animated.View>

      <Animated.View entering={FadeIn.duration(400)} style={styles.bottom}>
        <CustomText fontWeight="medium" variant="h6">
          Productivity made simple
        </CustomText>

        <View style={[styles.progressBar, { backgroundColor: colors.light }]}>
          <Animated.View style={[styles.progressFill, { backgroundColor: colors.primary }, progressStyle]} />
        </View>

        <CustomText fontWeight="light" variant="h6">
          v1.0
        </CustomText>
      </Animated.View>
    </View>
  );
});

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: wp(32),
    height: wp(32),
  },
  bottom: {
    position: 'absolute',
    bottom: wp(10),
    alignItems: 'center',
    gap: wp(3),
  },
  progressBar: {
    width: 160,
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
  },
});
