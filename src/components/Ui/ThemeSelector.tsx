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
import { useThemeStore, ThemeMode } from '../../store/ThemeStore';
import { wp } from '../../constant/Dimensions';
import { Check } from 'lucide-react-native';

interface ThemeSelectorProps {
  visible: boolean;
  onClose: () => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ visible, onClose }) => {
  const { colors, themeMode } = useAppTheme();
  const setThemeMode = useThemeStore(state => state.setThemeMode);

  const themes: { label: string; value: ThemeMode }[] = [
    { label: 'System Default', value: 'system' },
    { label: 'Light', value: 'light' },
    { label: 'Dark', value: 'dark' },
    { label: 'Premium', value: 'premium' },
  ];

  const handleSelect = (mode: ThemeMode) => {
    setThemeMode(mode);
    onClose();
  };

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
                Choose Theme
              </CustomText>

              {themes.map(item => {
                const isSelected = themeMode === item.value;
                const bgColor = isSelected
                  ? colors.primary + '20'
                  : 'transparent';
                const borderColor = isSelected ? colors.primary : colors.border;

                return (
                  <TouchableOpacity
                    key={item.value}
                    style={[
                      styles.item,
                      {
                        backgroundColor: bgColor,
                        borderColor: borderColor,
                      },
                    ]}
                    onPress={() => handleSelect(item.value)}
                  >
                    <CustomText fontWeight={isSelected ? 'bold' : 'medium'}>
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

export default ThemeSelector;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: wp(80),
    padding: 20,
    borderRadius: 20,
    gap: 10,
    elevation: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 5,
  },
  text: { marginBottom: 20 },
});
