import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppIcon from './AppIcon';
import { clearSearchText, setSearchText } from '../features/search/searchSlice';

import { BORDER_RADIUS, COLORS, FONT_SIZE, FONTS, SPACE } from '../global/theme';

const SearchBox = ({ searchFunction = () => {} }) => {
  const dispatch = useDispatch();
  const searchText = useSelector((state) => state.search.searchText);

  return (
    <View style={styles.searchBox}>
      <TextInput
        onChangeText={(text) => dispatch(setSearchText(text))}
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
      {
        searchText
          ? <TouchableOpacity onPress={() => dispatch(clearSearchText())}>
              <AppIcon
                icon={"close-sharp"}
                iconOrigin={"IonIcons"}
                iconSize={FONT_SIZE.ICON_BIG}
              />
            </TouchableOpacity>
          : null
      }
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
    gap: SPACE.MD,
    marginHorizontal: SPACE.LG * 3,
    paddingVertical: SPACE.MD,
    paddingHorizontal: SPACE.LG * 2,
  },
  textInput: {
    color: COLORS.WHITE,
    fontFamily: FONTS.TEXT,
    fontSize: FONT_SIZE.TEXT,
    letterSpacing: 0.5,
    width: '90%',
  }
});
