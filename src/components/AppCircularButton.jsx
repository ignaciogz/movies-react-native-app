import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

import AppIcon from './AppIcon';

import { BORDER_RADIUS, COLORS, FONT_SIZE, SPACE } from '../global/theme';

const AppCircularButton = ({
    onPress = () => {},
    bgColor = COLORS.GREY,
    icon = "",
    iconOrigin = "IonIcons",
    iconSize = FONT_SIZE.ICON,
    iconColor = COLORS.WHITE
  }) => {

  return (
    <Pressable
      style={[
        styles.circularButtonBox,
        { backgroundColor: bgColor }
      ]}
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

export default AppCircularButton;

const styles = StyleSheet.create({
  circularButtonBox: {
    alignItems: 'center',
    borderRadius: BORDER_RADIUS.ROUND,
    paddingHorizontal: SPACE.MD,
    paddingVertical: SPACE.MD,
  },
});
