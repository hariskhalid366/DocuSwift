import { StyleSheet, View } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import { useAppTheme } from '../../hooks/useAppTheme';

const Bar = () => {
  const { colors } = useAppTheme();

  const barData = [
    { value: 250, label: 'M' },
    { value: 500, label: 'T', frontColor: '#177AD5' },
    { value: 745, label: 'W', frontColor: '#177AD5' },
    { value: 320, label: 'T' },
    { value: 600, label: 'F', frontColor: '#177AD5' },
    { value: 256, label: 'S' },
    { value: 300, label: 'S' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.container }]}>
      <BarChart
        data={barData}
        barWidth={30}
        barBorderRadius={8}
        frontColor="lightgray"
        noOfSections={3}
        dashWidth={0}
        yAxisThickness={0}
        xAxisThickness={0}
        xAxisLabelTextStyle={{ color: colors.text }}
        yAxisTextStyle={{ color: colors.text }}
      />
    </View>
  );
};

export default Bar;

const styles = StyleSheet.create({
  container: {
    elevation: 4,
    borderRadius: 15,
    margin: 15,
    padding: 5,
  },
});
