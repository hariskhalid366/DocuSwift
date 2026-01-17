import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { colors } from '../../constant/colors';
import CustomText from '../Global/CustomText';
import { ChevronRight, ExternalLink, Moon } from 'lucide-react-native';
import { wp } from '../../constant/Dimensions';
import { useSharedValue } from 'react-native-reanimated';
import Switch from '../Global/Switch';

const PreferenceView = ({ data, Tag }: any) => {
  const [enabled, setEnabled] = useState<boolean>(true);
  const isOn = useSharedValue(enabled);

  const handlePress = () => {
    const newValue = !enabled;
    isOn.value = newValue;
    setEnabled && setEnabled(newValue);
  };

  return (
    <View style={styles.container}>
      <CustomText fontWeight="medium">{Tag}</CustomText>
      <View style={styles.innerContainer}>
        {data &&
          data?.map((item: any) => (
            <TouchableOpacity key={item?.id} style={styles.touchaleContainer}>
              <View style={[styles.icon, { backgroundColor: item.color + 11 }]}>
                <item.icon
                  color={item?.color}
                  size={wp(5.5)}
                  strokeWidth={2.6}
                />
              </View>
              <CustomText style={{ flex: 1 }} fontWeight="medium" variant="h6">
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
  container: {
    padding: 15,
    gap: 10,
  },
  innerContainer: {
    backgroundColor: colors.container,
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
    backgroundColor: colors.bg4,
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
