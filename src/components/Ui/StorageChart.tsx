import React, { memo, useCallback, useMemo, useState } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
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

const Dot = ({ color }: { color: string }) => (
  <View style={[styles.dot, { backgroundColor: color }]} />
);

const CenterLabel = memo(
  ({ value, label }: { value: number; label: string }) => (
    <View style={styles.centerLabel}>
      <CustomText fontWeight="bold">{value}%</CustomText>
      <CustomText>{label}</CustomText>
    </View>
  ),
);

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
        value: item.value,
        color: item.color,
        gradientCenterColor: item.gradientCenterColor,
        focused: item.key === focusedKey,
        onPress: () => setFocusedKey(item.key),
      })),
    [chartData, focusedKey],
  );

  const focusedItem = useMemo(
    () => chartData.find(item => item.key === focusedKey)!,
    [chartData, focusedKey],
  );

  const renderLegendItem = useCallback(
    (item: ChartItem) => {
      const isFocused = item.key === focusedKey;

      return (
        <Pressable
          key={item.key}
          onPress={() => setFocusedKey(item.key)}
          style={[
            styles.pressable,
            isFocused ? styles.focused : styles.unfocused,
          ]}
        >
          <Dot color={item.gradientCenterColor} />
          <CustomText fontWeight={isFocused ? 'bold' : 'regular'}>
            {item.label}: {item.value}%
          </CustomText>
        </Pressable>
      );
    },
    [focusedKey],
  );

  const renderCenterLabel = useCallback(() => {
    return <CenterLabel value={focusedItem.value} label={focusedItem.label} />;
  }, [focusedItem.value, focusedItem.label]);

  return (
    <View style={[styles.container, { backgroundColor: colors.container }]}>
      <PieChart
        data={pieData}
        donut
        showGradient
        radius={90}
        innerRadius={60}
        sectionAutoFocus
        innerCircleColor={colors.container}
        centerLabelComponent={renderCenterLabel}
      />

      <View style={styles.chartData}>{chartData.map(renderLegendItem)}</View>
    </View>
  );
};

export default memo(StorageChart);

const styles = StyleSheet.create({
  container: {
    margin: 15,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 4,
    borderRadius: 15,
  },
  pressable: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  focused: {
    opacity: 1,
  },
  unfocused: {
    opacity: 0.6,
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  centerLabel: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartData: {
    marginLeft: 10,
  },
});
