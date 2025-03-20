import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { BORDER_RADIUS, COLORS, FONT_SIZE, SPACE } from '../global/theme';

const CloseButton = ({ onPress = () => {}, color = COLORS.WHITE, bgColor = COLORS.GREY }) => {
  return (
    <Pressable
      style={{ ...styles.buttonClose, backgroundColor: bgColor }}
      onPress={onPress}
    >
      <Ionicons
        name="close-circle-outline"
        size={FONT_SIZE.ICON}
        color={color}
      />
    </Pressable>
  );
};

export default CloseButton;

const styles = StyleSheet.create({
  buttonClose: {
    alignItems: 'center',
    borderRadius: BORDER_RADIUS.CIRCLE,
    paddingHorizontal: SPACE.MD,
    paddingVertical: SPACE.MD,
  }
});
