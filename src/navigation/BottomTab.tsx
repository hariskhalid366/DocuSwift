import { StyleSheet, View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, File, Create, Tool, Setting } from '../app';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLinkBuilder } from '@react-navigation/native';
import { PlatformPressable } from '@react-navigation/elements';
import CustomText from '../components/Global/CustomText';
import { hp, wp } from '../constant/Dimensions';
import { TabIcons } from '../constant/data';
import { useAppTheme } from '../hooks/useAppTheme';

const HIDE_TAB_SCREENS = ['Create'];

const BottomTab = () => {
  const Tabs = createBottomTabNavigator();
  const { top, bottom } = useSafeAreaInsets();
  const { colors } = useAppTheme();

  const MyTabBar = ({ state, descriptors, navigation }: any) => {
    const { buildHref } = useLinkBuilder();

    const routeName = state.routes[state.index].name;
    if (HIDE_TAB_SCREENS.includes(routeName)) return null;

    const ICON_MAP = Object.fromEntries(TabIcons.map(i => [i.label, i.icon]));

    return (
      <View style={styles.container}>
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel ?? options.title ?? route.name;

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

          return (
            <PlatformPressable
              key={route.key}
              href={buildHref(route.name, route.params)}
              onPress={onPress}
              style={[
                styles.tabStyle,
                label === 'Create' && {
                  ...styles.labelTab,
                  backgroundColor: colors.primary,
                },
              ]}
            >
              {Icon && (
                <Icon
                  size={24}
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
                  fontSize={10}
                  style={[
                    styles.label,
                    { color: isFocused ? colors.primary : colors.text },
                  ]}
                >
                  {label}
                </CustomText>
              )}
            </PlatformPressable>
          );
        })}
      </View>
    );
  };

  return (
    <Tabs.Navigator
      safeAreaInsets={{ top, bottom }}
      screenOptions={{
        headerShown: false,
        lazy: true,
      }}
      tabBar={MyTabBar}
    >
      <Tabs.Screen name="Home" component={Home} />
      <Tabs.Screen name="Files" component={File} />
      <Tabs.Screen name="Create" component={Create} />
      <Tabs.Screen name="Stats" component={Tool} />
      <Tabs.Screen name="Setting" component={Setting} />
    </Tabs.Navigator>
  );
};

export default BottomTab;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: hp(7),
    paddingTop: 10,
  },
  tabStyle: {
    width: '22.5%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    marginTop: 2,
  },
  labelTab: {
    width: wp(12.6),
    height: wp(12.6),
    borderRadius: 100,
    bottom: wp(8),
  },
});
