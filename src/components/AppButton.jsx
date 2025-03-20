import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { BORDER_RADIUS, COLORS, FONTS, FONT_SIZE, SPACE } from '../global/theme';

const AppButton = ({ title = "", onPress = () => {}, buttonColor = COLORS.VIOLET_LIGHT }) => {
  return (
    <Pressable
      style={{ ...styles.appButton, backgroundColor: buttonColor }}
      onPress={onPress}
    >
      <Text style={styles.appButtonText}>{title.toUpperCase()}</Text>
    </Pressable>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  appButton: {
    alignItems: 'center',
    borderRadius: BORDER_RADIUS.MD * 5,
    paddingHorizontal: SPACE.LG * 3,
    paddingVertical: SPACE.MD * 2,
    marginVertical: SPACE.LG * 2,
  },
  appButtonText: {
    color: COLORS.WHITE,
    fontFamily: FONTS.TEXT,
    fontSize: FONT_SIZE.TEXT,
  }
});
