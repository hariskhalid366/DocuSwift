import { StyleSheet, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import * as Lucide from 'lucide-react-native';
import { wp } from '../../constant/Dimensions';
import { colors } from '../../constant/colors';

const SearchBar = () => {
  const [search, setSearch] = useState<string>('');
  return (
    <View style={styles.container}>
      <Lucide.Search color={colors.icon} size={wp(5)} />
      <TextInput
        value={search}
        onChangeText={e => setSearch(e)}
        placeholder="Search documents, folders..."
        placeholderTextColor={'#00000055'}
        style={styles.input}
        clearButtonMode="while-editing"
        cursorColor={colors.primery}
      />
      <Lucide.LucideSlidersHorizontal color={colors.primery} size={wp(6)} />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    width: wp(94),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 15,
    alignSelf: 'center',
    elevation: 4,
  },
  input: {
    fontFamily: 'Poppins-Medium',
    flex: 1,
    paddingHorizontal: 10,
    includeFontPadding: false,
    color: colors.text,
    fontSize: 14,
    fontWeight: 'medium',
  },
});
