import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { BORDER_RADIUS, COLORS, FONT_SIZE, FONTS, SPACE } from '../global/theme';

const AppButton = ({
    title = "",
    onPress = async () => {},
    startColor = COLORS.VIOLET_LIGHT,
    endColor = COLORS.BLACK,
  }) => {

  return (
    <Pressable onPress={() => onPress()}>
      <LinearGradient
        colors={[endColor, startColor]}
        style={styles.buttonBox}
        start={{ x: 0.2, y: 0.2 }}
      >
        <Text style={styles.buttonText}>
          {title.toUpperCase()}
        </Text>
      </LinearGradient>
    </Pressable>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  buttonBox: {
    alignItems: 'center',
    borderRadius: BORDER_RADIUS.MD * 5,
    paddingHorizontal: SPACE.LG * 2,
    paddingVertical: SPACE.MD * 2,
  },
  buttonText: {
    color: COLORS.WHITE,
    fontFamily: FONTS.TEXT_BOLD,
    fontSize: FONT_SIZE.TEXT_LG,
    letterSpacing: 1,
    wordSpacing: 2,
  },
});
