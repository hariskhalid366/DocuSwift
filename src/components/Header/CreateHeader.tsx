import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { wp } from '../../constant/Dimensions';
import { colors } from '../../constant/colors';
import { Pencil } from 'lucide-react-native';
import { useAuth } from '../../context/AuthContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { generateFileName } from '../../utils/helper';
import HeaderParent from './HeaderParent';
import { Toast } from '../Global/ShowToast';

const CreatorHeader = () => {
  const { premium } = useAuth();

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
        placeholderTextColor={'#00000055'}
        style={styles.input}
        cursorColor={colors.primery}
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
    color: colors.text,
    fontSize: 16,
    fontWeight: 'medium',
  },
});
