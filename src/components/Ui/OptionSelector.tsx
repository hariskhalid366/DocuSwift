import React from 'react';
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import CustomText from '../Global/CustomText';
import { useAppTheme } from '../../hooks/useAppTheme';
import { wp } from '../../constant/Dimensions';
import { Check } from 'lucide-react-native';

interface OptionSelectorProps {
  visible: boolean;
  onClose: () => void;
  data: { label: string; value: any }[];
  selectedValue: any;
  onSelect: (value: any) => void;
  title: string;
}

const OptionSelector: React.FC<OptionSelectorProps> = ({
  visible,
  onClose,
  data,
  selectedValue,
  onSelect,
  title,
}) => {
  const { colors } = useAppTheme();

  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View
              style={[styles.container, { backgroundColor: colors.container }]}
            >
              <CustomText variant="h3" fontWeight="bold" style={styles.text}>
                {title}
              </CustomText>

              {data.map((item, index) => {
                const isSelected = selectedValue === item.value;
                const bgColor = isSelected ? colors.primary + '15' : 'transparent';
                const borderColor = isSelected ? colors.primary : colors.border;

                return (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.item,
                      {
                        backgroundColor: bgColor,
                        borderColor: borderColor,
                        borderWidth: isSelected ? 2 : 1,
                      },
                    ]}
                    onPress={() => {
                      onSelect(item.value);
                      onClose();
                    }}
                  >
                    <CustomText
                      fontWeight={isSelected ? 'bold' : 'medium'}
                      color={isSelected ? colors.primary : colors.text}
                    >
                      {item.label}
                    </CustomText>
                    {isSelected && <Check size={20} color={colors.primary} />}
                  </TouchableOpacity>
                );
              })}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default OptionSelector;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: wp(85),
    maxHeight: '80%',
    padding: 20,
    borderRadius: 24,
    gap: 12,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 16,
    marginBottom: 4,
  },
  text: { marginBottom: 16, textAlign: 'center' },
});
