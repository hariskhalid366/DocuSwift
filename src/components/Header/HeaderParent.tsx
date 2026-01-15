import { StyleSheet } from 'react-native';
import React, { useCallback, useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../constant/colors';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const HeaderParent: React.FC<any> = useCallback(({ children, index }) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = 0;
    progress.value = withTiming(1, { duration: 500 });
  }, [index]);

  const styleAnimated = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 1], [0, 1]),
    transform: [{ translateY: interpolate(progress.value, [0, 1], [-50, 0]) }],
  }));
  const { top } = useSafeAreaInsets();
  return (
    <Animated.View
      style={[{ paddingTop: top }, styles.container, styleAnimated]}
    >
      {children}
    </Animated.View>
  );
}, []);

export default HeaderParent;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.container,
    paddingVertical: 10,
    elevation: 4,
  },
});
