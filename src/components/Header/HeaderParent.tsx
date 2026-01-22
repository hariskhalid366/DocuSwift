/** @format */

import { StyleSheet } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useAppTheme } from '../../hooks/useAppTheme';
import { useFocusEffect } from '@react-navigation/native';

type HeaderParentProps = {
  children: React.ReactNode;
  index: any;
};

const HeaderParent: React.FC<HeaderParentProps> = ({ children, index }) => {
  const progress = useSharedValue(0);
  const { colors } = useAppTheme();
  const { top } = useSafeAreaInsets();

  console.log(index);

  useFocusEffect(
    React.useCallback(() => {
      progress.value = 0;
      progress.value = withTiming(1, { duration: 500 });
    }, [progress]),
  );

  const styleAnimated = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 1], [0, 1]),
    transform: [{ translateY: interpolate(progress.value, [0, 1], [-50, 0]) }],
  }));

  return (
    <Animated.View
      style={[
        { paddingTop: top },
        styles.container,
        { backgroundColor: colors.container },
        styleAnimated,
      ]}
    >
      {children}
    </Animated.View>
  );
};

export default React.memo(HeaderParent);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    elevation: 4,
  },
});
