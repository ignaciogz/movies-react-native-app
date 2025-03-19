import React, {useState} from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { BORDER_RADIUS, COLORS, FONTS, FONT_SIZE, SPACE } from '../global/theme';

const SearchBox = (props) => {
  const [searchText, setSearchText] = useState('');

  return (
    <View style={styles.inputBox}>
      <TextInput
        style={styles.textInput}
        onChangeText={textInput => setSearchText(textInput)}
        value={searchText}
        placeholder="Encuentra tu pelicula..."
        placeholderTextColor={COLORS.WHITE_RGBA32}
      />
      <TouchableOpacity
        onPress={() => props.searchFunction(searchText)}>
        <Ionicons
          name="search"
          size={FONT_SIZE.ICON_SEARCH}
          color={COLORS.WHITE}
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBox;

const styles = StyleSheet.create({
  inputBox: {
    borderWidth: 2,
    borderColor: COLORS.WHITE,
    borderRadius: BORDER_RADIUS.MD * 2,
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: SPACE.MD,
    paddingHorizontal: SPACE.LG * 2,
  },
  textInput: {
    color: COLORS.WHITE_RGBA15,
    fontFamily: FONTS.TEXT,
    fontSize: FONT_SIZE.TEXT_SM,
    width: '90%',
  }
});
