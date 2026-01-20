import { StyleSheet, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import * as Lucide from 'lucide-react-native';
import { wp } from '../../constant/Dimensions';
import { useAppTheme } from '../../hooks/useAppTheme';

const SearchBar = () => {
  const [search, setSearch] = useState<string>('');
  const { colors } = useAppTheme();
  return (
    <View style={[styles.container, { backgroundColor: colors.container }]}>
      <Lucide.Search color={colors.icon} size={wp(5)} />
      <TextInput
        value={search}
        onChangeText={e => setSearch(e)}
        placeholder="Search documents, folders..."
        placeholderTextColor={colors.textLight}
        style={[styles.input, { color: colors.text }]}
        clearButtonMode="while-editing"
        cursorColor={colors.primary}
      />
      <Lucide.LucideSlidersHorizontal color={colors.primary} size={wp(6)} />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    width: '96%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    alignSelf: 'center',
    elevation: 4,
  },
  input: {
    fontFamily: 'Poppins-Medium',
    flex: 1,
    paddingHorizontal: 10,
    includeFontPadding: false,
    fontSize: 14,
    fontWeight: 'medium',
  },
});
