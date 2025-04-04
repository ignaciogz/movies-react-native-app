import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import AppCircularButton from './AppCircularButton';
import AppCounter from './AppCounter';

import { BORDER_RADIUS, COLORS, FONTS, FONT_SIZE, SPACE } from '../global/theme';

const listItemData = {
  "CANDYBAR": {
    screenColor: COLORS.ROSE,
  },
  "CHECKOUT": {
    screenColor: COLORS.BLUE_LIGHT,
  },
  "TICKETS": {
    screenColor: COLORS.YELLOW,
  },
}

const ListItem = ({
    showDataOf = "Tickets",
    title = "",
    text = null,
    counterName = "",
    itemFunction = () => {},
  }) => {

  const screenName = showDataOf.toUpperCase();

  return (
    <View style={styles.listItemBox}>
      <View style={styles.listItemDataContainer}>
        <Text numberOfLines={1} style={styles.itemName}>{title.toUpperCase()}</Text>
        <Text style={[styles.itemText, { color: listItemData[screenName].screenColor }]}>{text}</Text>
      </View>

      {
        screenName === "CANDYBAR"
        &&  <AppCounter
              buttonsColor={listItemData[screenName].screenColor}
              counterName={counterName}
            />
      }

      {
        screenName === "CHECKOUT"
        &&  <AppCircularButton
              onPress={itemFunction}
              bgColor="transparent"
              icon="close"
              iconOrigin="FontAwesome"
              iconColor={listItemData[screenName].screenColor}
              iconSize={FONT_SIZE.ICON_BIG}
            />
      }

      {
        screenName === "TICKETS"
        &&  <AppCircularButton
              onPress={itemFunction}
              bgColor="transparent"
              icon="search"
              iconOrigin="IonIcons"
              iconColor={listItemData[screenName].screenColor}
              iconSize={FONT_SIZE.ICON_BIG}
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
  itemText: {
    fontFamily: FONTS.TEXT_BOLD,
    fontSize: FONT_SIZE.TEXT_SM,
  },
});
