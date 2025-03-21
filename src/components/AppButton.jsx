import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { BORDER_RADIUS, COLORS, FONTS, FONT_SIZE, SPACE } from '../global/theme';

const AppButton = ({
    title = "",
    onPress = () => {},
    startColor = COLORS.VIOLET_DARK,
    endColor = COLORS.VIOLET_LIGHT
  }) => {

  return (
    <Pressable onPress={onPress}>
      <LinearGradient
        colors={[startColor, endColor]}
        style={styles.appButton}
        start={{ x: 0.4, y: 0.2 }}
      >
        <Text style={styles.appButtonText}>{title.toUpperCase()}</Text>
      </LinearGradient>
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
  },
});
