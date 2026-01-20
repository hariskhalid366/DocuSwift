import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { wp } from '../../constant/Dimensions';
import { Pencil } from 'lucide-react-native';
import { useAuth } from '../../context/AuthContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { generateFileName } from '../../utils/helper';
import HeaderParent from './HeaderParent';
import { Toast } from '../Global/ShowToast';
import { useAppTheme } from '../../hooks/useAppTheme';

const CreatorHeader = () => {
  const { premium } = useAuth();
  const { colors } = useAppTheme();

  const [fileName, setFileName] = useState('');
  const [initialized, setInitialized] = useState(false);
  const { top } = useSafeAreaInsets();

  React.useEffect(() => {
    if (!initialized) {
      setFileName(generateFileName());
      setInitialized(true);
    }
  }, []);

  return (
    <HeaderParent>
      <TextInput
        editable={premium}
        value={fileName}
        onChangeText={e => setFileName(e)}
        placeholder="Enter File Name..."
        placeholderTextColor={colors.textLight}
        style={[styles.input, { color: colors.text }]}
        cursorColor={colors.primary}
      />
      <TouchableOpacity
        onPress={() => {
          if (!premium) {
            Toast('Buy premium to get more features');
          }
        }}
      >
        <Pencil color={colors.icon} size={wp(5)} />
      </TouchableOpacity>
    </HeaderParent>
  );
};

export default CreatorHeader;

const styles = StyleSheet.create({
  input: {
    fontFamily: 'Poppins-Medium',
    paddingHorizontal: 5,
    borderRadius: 15,
    flex: 1,
    includeFontPadding: false,
    fontSize: 16,
    fontWeight: 'medium',
  },
});
