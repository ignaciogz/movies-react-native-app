import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import AppIcon from './AppIcon';

import { BORDER_RADIUS, COLORS, FONTS, FONT_SIZE, SPACE } from '../global/theme';

const AppLabel = ({
    title = "",
    bgColor = COLORS.GREY,
    fontSize = FONT_SIZE.TEXT_SM,
    icon = "",
    iconOrigin = "IonIcons",
    iconSize = FONT_SIZE.ICON,
    iconColor = COLORS.WHITE
  }) => {

  return (
    <View style={[styles.labelBox, {backgroundColor: bgColor}]}>
      {
        icon
          ? <AppIcon icon={icon} iconOrigin={iconOrigin} iconSize={iconSize} iconColor={iconColor} />
          : null
      }
      <Text style={[styles.labelText, {fontSize: fontSize}]}>{title}</Text>
    </View>
  );
};

export default AppLabel;

const styles = StyleSheet.create({
  labelBox: {
    alignItems: 'center',
    borderRadius: BORDER_RADIUS.MD * 2.5,
    display: 'flex',
    flexDirection: 'row',
    gap: SPACE.MD,
    justifyContent: 'space-between',
    paddingVertical: SPACE.MD,
    paddingHorizontal: SPACE.LG * 1.5,
  },
  labelText: {
    color: COLORS.WHITE,
    fontFamily: FONTS.TEXT
  },
});
