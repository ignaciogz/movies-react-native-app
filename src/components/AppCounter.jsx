import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
// import { useDispatch, useSelector } from 'react-redux';

import AppCircleButton from './AppCircleButton';
// import { decrement, increment, reset, incrementByAmount } from '../features/counter/CounterSlice';

import { COLORS, FONTS, FONT_SIZE, SPACE } from '../global/theme';


const AppCounter = ({ buttonsColor, count, countFunction }) => {
  // const count = useSelector(state => state.counter.value);
  // const dispatch = useDispatch();

  return (
    <View style={styles.counterBox}>
      <AppCircleButton
        onPress={() => {
          if (count !== 0) countFunction(count - 1);
        }}
        bgColor="transparent"
        icon="minus"
        iconOrigin="FontAwesome"
        iconColor={buttonsColor}
        iconSize={FONT_SIZE.TEXT}
      />

      <Text style={styles.counterText}>{count}</Text>

      <AppCircleButton
        onPress={() => {
          countFunction(count + 1);
        }}
        bgColor="transparent"
        icon="plus"
        iconOrigin="FontAwesome"
        iconColor={buttonsColor}
        iconSize={FONT_SIZE.TEXT}
      />
    </View>
  );
};

export default AppCounter;

const styles = StyleSheet.create({
  counterBox: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: SPACE.SM,
    justifyContent: 'center',
  },
  counterText: {
    color: COLORS.WHITE,
    fontFamily: FONTS.TEXT_BOLD,
    fontSize: FONT_SIZE.TEXT_LG,
    paddingVertical: SPACE.MD,
  },
});
