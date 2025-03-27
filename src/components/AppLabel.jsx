import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import AppIcon from './AppIcon';

import { BORDER_RADIUS, COLORS, FONT_SIZE, FONTS, SPACE } from '../global/theme';

const AppLabel = ({
    title = "",
    bgColor = COLORS.GREY,
    children,
    fontBold = false,
    fontColor = COLORS.WHITE,
    fontSize = FONT_SIZE.TEXT_SM,
    icon = "",
    iconColor = COLORS.WHITE,
    iconOrigin = "IonIcons",
    iconSize = FONT_SIZE.ICON,
  }) => {

  return (
    <View style={[styles.labelBox, {backgroundColor: bgColor}]}>
      {
        icon
          ? <AppIcon icon={icon} iconOrigin={iconOrigin} iconSize={iconSize} iconColor={iconColor} />
          : null
      }
      {
        title
          ? <Text
              style={{
                color: fontColor,
                fontSize: fontSize,
                fontFamily: fontBold ? FONTS.TEXT_BOLD : FONTS.TEXT,
              }}>
                {title}
            </Text>
          : children
      }
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
});
