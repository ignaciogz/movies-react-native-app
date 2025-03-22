import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

import AppIcon from './AppIcon';

import { BORDER_RADIUS, COLORS, FONT_SIZE, SPACE } from '../global/theme';

const AppCircleButton = ({
    onPress = () => {},
    bgColor = COLORS.GREY,
    icon = "",
    iconOrigin = "IonIcons",
    iconSize = FONT_SIZE.ICON,
    iconColor = COLORS.WHITE
  }) => {

  return (
    <Pressable
      style={{ ...styles.circleButtonBox, backgroundColor: bgColor }}
      onPress={onPress}
    >
      <AppIcon
        icon={icon}
        iconOrigin={iconOrigin}
        iconSize={iconSize}
        iconColor={iconColor}
      />
    </Pressable>
  );
};

export default AppCircleButton;

const styles = StyleSheet.create({
  circleButtonBox: {
    alignItems: 'center',
    borderRadius: BORDER_RADIUS.CIRCLE,
    paddingHorizontal: SPACE.MD,
    paddingVertical: SPACE.MD,
  },
});
