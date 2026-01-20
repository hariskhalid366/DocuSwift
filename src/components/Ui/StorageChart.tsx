import React, { useCallback, useMemo, useState } from 'react';
import { View, Pressable } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import CustomText from '../Global/CustomText';
import { useAppTheme } from '../../hooks/useAppTheme';

interface ChartItem {
  key: string;
  label: string;
  value: number;
  color: string;
  gradientCenterColor: string;
}

const StorageChart = () => {
  const { colors } = useAppTheme();
  const [focusedKey, setFocusedKey] = useState<string>('receipts');

  const chartData: ChartItem[] = useMemo(
    () => [
      {
        key: 'receipts',
        label: 'Receipts',
        value: 47,
        color: '#009FFF',
        gradientCenterColor: '#006DFF',
      },
      {
        key: 'contracts',
        label: 'Contracts',
        value: 40,
        color: '#93FCF8',
        gradientCenterColor: '#3BE9DE',
      },
      {
        key: 'personal',
        label: 'Personal',
        value: 16,
        color: '#BDB2FA',
        gradientCenterColor: '#8F80F3',
      },
      {
        key: 'cards',
        label: 'Cards',
        value: 3,
        color: '#FFA5BA',
        gradientCenterColor: '#FF7F97',
      },
    ],
    [],
  );

  const pieData = useMemo(
    () =>
      chartData.map(item => ({
        value: item?.value,
        color: item?.color,
        gradientCenterColor: item?.gradientCenterColor,
        focused: item?.key === focusedKey,
        onPress: () => setFocusedKey(item?.key),
      })),
    [chartData, focusedKey],
  );

  const focusedItem = useMemo(
    () => chartData.find(item => item?.key === focusedKey)!,
    [chartData, focusedKey],
  );

  const renderDot = useCallback((color: string) => {
    return (
      <View
        style={{
          height: 10,
          width: 10,
          borderRadius: 5,
          backgroundColor: color,
          marginRight: 10,
        }}
      />
    );
  }, []);

  const renderLegendItem = useCallback(
    (item: ChartItem) => {
      const isFocused = item?.key === focusedKey;

      return (
        <Pressable
          key={item?.key}
          onPress={() => setFocusedKey(item?.key)}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 8,
            opacity: isFocused ? 1 : 0.6,
          }}
        >
          {renderDot(item?.gradientCenterColor)}
          {item?.label && item?.value && (
            <CustomText fontWeight={isFocused ? 'bold' : 'regular'}>
              {item?.label}: {item?.value}%
            </CustomText>
          )}
        </Pressable>
      );
    },
    [focusedKey, renderDot],
  );

  return (
    <View
      style={{
        margin: 15,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.container,
        elevation: 4,
        borderRadius: 15,
      }}
    >
      <PieChart
        data={pieData}
        donut
        showGradient
        radius={90}
        innerRadius={60}
        sectionAutoFocus
        innerCircleColor={colors.container}
        centerLabelComponent={() => (
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <CustomText fontWeight="bold">{focusedItem?.value}%</CustomText>
            <CustomText>{focusedItem?.label}</CustomText>
          </View>
        )}
      />

      <View style={{ marginLeft: 10 }}>{chartData.map(renderLegendItem)}</View>
    </View>
  );
};

export default StorageChart;
