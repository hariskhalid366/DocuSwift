import { StyleSheet, View } from 'react-native';
import React, { useCallback } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, File, Create, Tool, Setting } from '../app';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLinkBuilder, useTheme } from '@react-navigation/native';
import { PlatformPressable } from '@react-navigation/elements';
import CustomText from '../components/Global/CustomText';
import { hp, wp } from '../constant/Dimensions';
import { TabIcons } from '../constant/data';
import { colors } from '../constant/colors';

const BottomTab = () => {
  const Tabs = createBottomTabNavigator();
  const HIDE_TAB_SCREENS = ['Create'];

  const { top, bottom } = useSafeAreaInsets();

  const MyTabBar = useCallback(({ state, descriptors, navigation }: any) => {
    const routeName = state.routes[state.index].name;
    if (HIDE_TAB_SCREENS.includes(routeName)) return null;

    const { colors } = useTheme();

    const { buildHref } = useLinkBuilder();

    const ICON_MAP = Object.fromEntries(TabIcons.map(i => [i.label, i.icon]));

    return (
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: 'transparent',
          height: hp(7),
          paddingTop: 10,
        }}
      >
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const Icon = ICON_MAP[label];

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <PlatformPressable
              key={route.key}
              href={buildHref(route.name, route.params)}
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarButtonTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={[styles.tabStyle, label === 'Create' && styles.create]}
            >
              {Icon && (
                <Icon
                  size={24}
                  strokeWidth={2}
                  color={
                    label === 'Create'
                      ? '#fff'
                      : isFocused
                      ? colors.primary
                      : colors.text
                  }
                />
              )}

              {label !== 'Create' && (
                <CustomText
                  fontWeight="medium"
                  fontSize={10}
                  style={{ color: isFocused ? colors.primary : colors.text }}
                >
                  {label}
                </CustomText>
              )}
            </PlatformPressable>
          );
        })}
      </View>
    );
  }, []);

  return (
    <Tabs.Navigator
      safeAreaInsets={{ top, bottom }}
      screenOptions={{
        lazy: true,
        animation: 'none',
        headerBackButtonDisplayMode: 'generic',
        headerShown: false,
        freezeOnBlur: true,
      }}
      tabBar={props => <MyTabBar {...props} />}
    >
      <Tabs.Screen name="Home" component={Home} />
      <Tabs.Screen name="Files" component={File} />
      <Tabs.Screen name="Create" component={Create} />
      <Tabs.Screen name="Stats" component={Tool} />
      <Tabs.Screen name="Setting" component={Setting} />
    </Tabs.Navigator>
  );
};

export default React.memo(BottomTab);

const styles = StyleSheet.create({
  tabStyle: {
    width: '22.5%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  create: {
    width: wp(12.6),
    height: wp(12.6),
    borderRadius: 100,
    bottom: wp(8),
    backgroundColor: colors.primery,
  },
});
