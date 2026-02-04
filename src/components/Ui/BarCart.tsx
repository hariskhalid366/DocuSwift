import { StyleSheet, View } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import { useDocuSwift } from '../../store/GlobalState';
import moment from 'moment';
import { useAppTheme } from '../../hooks/useAppTheme';

const Bar = () => {
  const { colors } = useAppTheme();
  const { scans, fileImported } = useDocuSwift();

  const getDayData = (dayOffset: number) => {
    const date = moment().subtract(dayOffset, 'days').startOf('day');
    const scanCount = scans.filter(s =>
      moment(s.createdAt).isSame(date, 'day'),
    ).length;
    const importCount = fileImported.filter((f: any) =>
      moment(f.createdAt).isSame(date, 'day'),
    ).length;
    return {
      value: scanCount + importCount,
      label: date.format('dd').charAt(0),
    };
  };

  const barData = [
    getDayData(2),
    getDayData(1),
    getDayData(0),
    getDayData(6),
    getDayData(5),
    getDayData(3),
    getDayData(4),
  ];

  const maxVal = Math.max(...barData.map(d => d.value), 5);

  return (
    <View style={[styles.container, { backgroundColor: colors.container }]}>
      <BarChart
        data={barData}
        barWidth={30}
        barBorderRadius={8}
        frontColor={colors.primary}
        noOfSections={3}
        maxValue={maxVal + 2}
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
