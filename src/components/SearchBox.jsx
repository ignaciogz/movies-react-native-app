import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

import AppIcon from './AppIcon';

import { BORDER_RADIUS, COLORS, FONT_SIZE, FONTS, SPACE } from '../global/theme';

const SearchBox = ({ initialSearchValue = "", searchFunction = () => {} }) => {
  const [searchText, setSearchText] = useState(initialSearchValue);

  return (
    <View style={styles.searchBox}>
      <TextInput
        onChangeText={setSearchText}
        placeholder="Encuentra tu pelicula..."
        placeholderTextColor={COLORS.WHITE_RGBA32}
        value={searchText}
        style={styles.textInput}
      />
      <TouchableOpacity onPress={() => searchFunction(searchText)}>
        <AppIcon
          icon={"search"}
          iconOrigin={"IonIcons"}
          iconSize={FONT_SIZE.ICON_BIG}
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBox;

const styles = StyleSheet.create({
  searchBox: {
    borderWidth: 2,
    borderColor: COLORS.WHITE,
    borderRadius: BORDER_RADIUS.MD * 2,
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: SPACE.LG * 3,
    paddingVertical: SPACE.MD,
    paddingHorizontal: SPACE.LG * 2,
  },
  textInput: {
    color: COLORS.WHITE,
    fontFamily: FONTS.TEXT,
    fontSize: FONT_SIZE.TEXT_SM,
    letterSpacing: 0.5,
    width: '90%',
  }
});
