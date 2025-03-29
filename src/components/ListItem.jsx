import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import AppCounter from '../components/AppCounter';

import { BORDER_RADIUS, COLORS, FONTS, FONT_SIZE, SPACE } from '../global/theme';

const ListItem = ({
    title = "",
    price = 0,
    withCounter = false,
    count = 0,
    countFunction = () => {},
  }) => {

  return (
    <View style={styles.listItemBox}>
      <View style={styles.listItemDataContainer}>
        <Text style={styles.itemName}>{title.toUpperCase()}</Text>
        <Text style={styles.itemPrice}>$ {price} c/u !</Text>
      </View>

      {
        withCounter
        &&  <AppCounter
              buttonsColor={COLORS.ROSE}
              count={count}
              countFunction={countFunction}
            />
      }
    </View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  listItemBox: {
    alignItems: 'center',
    backgroundColor: COLORS.GREY,
    borderRadius: BORDER_RADIUS.LG,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: SPACE.LG * 1.6,
    paddingVertical: SPACE.MD * 1.8,
  },
  listItemDataContainer: {
    gap: SPACE.SM,
    width: '70%',
  },
  itemName: {
    color: COLORS.WHITE,
    fontFamily: FONTS.TEXT_BOLD,
    fontSize: FONT_SIZE.TEXT,
  },
  itemPrice: {
    color: COLORS.ROSE,
    fontFamily: FONTS.TEXT_BOLD,
    fontSize: FONT_SIZE.TEXT,
  },
});
