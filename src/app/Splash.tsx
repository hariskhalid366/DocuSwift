import { StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import Animated, {
  Extrapolation,
  FadeIn,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import CustomText from '../components/Global/CustomText';
import { wp } from '../constant/Dimensions';
import { colors } from '../constant/colors';
import { resetAndNavigate } from '../navigation/NavigationRef';

const Splash = React.memo(() => {
  const logo = useSharedValue(0);
  const progress = useSharedValue(0);

  useEffect(() => {
    logo.value = withTiming(1, { duration: 900 });
    progress.value = withDelay(
      300,
      withTiming(1, { duration: 1300 }, finished => {
        if (finished) runOnJS(resetAndNavigate)('main');
      }),
    );
  }, []);

  const logoStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          logo.value,
          [0, 1],
          [40, 0],
          Extrapolation.CLAMP,
        ),
      },
    ],
  }));

  const textStyle = useAnimatedStyle(() => ({
    opacity: logo.value,
    transform: [
      {
        translateY: interpolate(
          logo.value,
          [0, 1],
          [20, 0],
          Extrapolation.CLAMP,
        ),
      },
    ],
  }));

  const progressStyle = useAnimatedStyle(() => ({
    width: interpolate(progress.value, [0, 1], [0, 160], Extrapolation.CLAMP),
  }));

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../../assets/images/logo.png')}
        style={[styles.logo, logoStyle]}
        resizeMode="contain"
      />

      <Animated.View style={textStyle}>
        <CustomText fontWeight="semibold" fontSize={wp(8)}>
          Docu
          <CustomText
            fontWeight="semibold"
            fontSize={wp(8.2)}
            color={colors.primery}
          >
            Swift
          </CustomText>
        </CustomText>
      </Animated.View>

      <Animated.View entering={FadeIn.duration(500)} style={styles.bottom}>
        <CustomText fontWeight="medium" variant="h6">
          Productivity made simple
        </CustomText>

        <View style={styles.progressBar}>
          <Animated.View style={[styles.progressFill, progressStyle]} />
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
    backgroundColor: '#fff',
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
    backgroundColor: colors.light,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primery,
  },
});
