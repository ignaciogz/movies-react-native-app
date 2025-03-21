import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { BORDER_RADIUS, COLORS, FONTS, FONT_SIZE, SPACE } from '../global/theme';

const iconsAvailable = {
  ionicons: Ionicons,
  materialicons: MaterialIcons,
}

const AppLabel = ({
    title = "",
    bgColor = COLORS.GREY,
    fontSize = FONT_SIZE.TEXT_SM,
    icon = "",
    iconOrigin = "ionicons",
    iconSize = FONT_SIZE.ICON,
    iconColor = COLORS.WHITE
  }) => {

  const IconComponent = iconsAvailable[iconOrigin.toLowerCase()];

  return (
    <View style={[styles.labelBox, {backgroundColor: bgColor}]}>
      {
        icon
          ? <IconComponent name={icon} size={iconSize} color={iconColor} />
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
    backgroundColor: COLORS.GREY,
    borderRadius: BORDER_RADIUS.MD * 2.5,
    borderWidth: 1,
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
