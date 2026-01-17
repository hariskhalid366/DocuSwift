import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { colors } from '../../constant/colors';

interface SwitchProps {
  value: any;
  onPress?: () => void;
  style?: any;
  duration?: number;
  trackColors?: { on: string; off: string };
}

const Switch = ({
  value,
  onPress,
  style,
  duration = 400,
  trackColors = { on: colors.bg2, off: colors.bg3 },
}: SwitchProps) => {
  const height = useSharedValue(0);
  const width = useSharedValue(0);

  const trackAnimatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      value.value,
      [0, 1],
      [trackColors.off, trackColors.on],
    );

    return {
      backgroundColor: withTiming(backgroundColor, { duration }),
      borderRadius: height.value / 2,
    };
  });

  const thumbAnimatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      value.value,
      [0, 1],
      [0, width.value - height.value],
    );

    return {
      transform: [{ translateX: withTiming(translateX, { duration }) }],
      borderRadius: height.value / 2,
    };
  });

  return (
    <Pressable onPress={onPress}>
      <Animated.View
        onLayout={e => {
          height.value = e.nativeEvent.layout.height;
          width.value = e.nativeEvent.layout.width;
        }}
        style={[styles.track, style, trackAnimatedStyle]}
      >
        <Animated.View style={[styles.thumb, thumbAnimatedStyle]} />
      </Animated.View>
    </Pressable>
  );
};

export default Switch;

const styles = StyleSheet.create({
  track: {
    width: 100,
    height: 40,
    padding: 5,
    justifyContent: 'center',
  },
  thumb: {
    height: '100%',
    aspectRatio: 1,
    backgroundColor: 'white',
  },
});
