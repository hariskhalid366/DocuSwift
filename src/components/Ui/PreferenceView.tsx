import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import CustomText from '../Global/CustomText';
import { ChevronRight, ExternalLink } from 'lucide-react-native';
import { useSharedValue } from 'react-native-reanimated';
import Switch from '../Global/Switch';
import { useAppTheme } from '../../hooks/useAppTheme';
import { wp } from '../../constant/Dimensions';

const PreferenceView = ({ data, Tag }: any) => {
  const [enabled, setEnabled] = useState<boolean>(true);
  const isOn = useSharedValue(enabled);
  const { colors } = useAppTheme();

  const handlePress = () => {
    const newValue = !enabled;
    isOn.value = newValue;
    setEnabled && setEnabled(newValue);
  };

  return (
    <View style={styles.container}>
      <CustomText fontWeight="medium">{Tag}</CustomText>
      <View
        style={[styles.innerContainer, { backgroundColor: colors.container }]}
      >
        {data &&
          data?.map((item: any) => (
            <TouchableOpacity
              key={item?.id}
              style={styles.touchaleContainer}
              onPress={item.onPress}
            >
              <View style={[styles.icon, { backgroundColor: item.color + 11 }]}>
                <item.icon
                  color={item?.color}
                  size={wp(5.5)}
                  strokeWidth={2.6}
                />
              </View>
              <CustomText style={styles.flex} fontWeight="medium" variant="h6">
                {item?.title}
              </CustomText>
              {item?.switch ? (
                <Switch
                  onPress={handlePress}
                  value={isOn}
                  style={styles.switch}
                />
              ) : (
                <View style={styles.selected}>
                  <CustomText>{item?.subTitle}</CustomText>
                  {item?.title === 'Help Center' ? (
                    <ExternalLink color={colors.text} size={wp(4)} />
                  ) : (
                    <ChevronRight color={colors.text} size={wp(4)} />
                  )}
                </View>
              )}
            </TouchableOpacity>
          ))}
      </View>
    </View>
  );
};

export default PreferenceView;

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: {
    padding: 15,
    gap: 10,
  },
  innerContainer: {
    borderRadius: 10,
    elevation: 4,
    gap: 10,
    paddingBottom: 15,
  },
  touchaleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingTop: 15,
    paddingHorizontal: 15,
  },
  icon: {
    borderRadius: 10,
    padding: 8,
  },
  selected: {
    flexDirection: 'row',
    gap: 2,
    alignItems: 'center',
  },
  switch: {
    width: 55,
    height: 30,
    padding: 5,
  },
});
