import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppCircularButton from './AppCircularButton';
import { increment, decrement } from '../features/counters/countersSlice';

import { COLORS, FONTS, FONT_SIZE, SPACE } from '../global/theme';

const AppCounter = ({ buttonsColor, counterName }) => {
  const dispatch = useDispatch();
  const counterValue = useSelector((state) => state.counters[counterName]);

  return (
    <View style={styles.counterBox}>
      <AppCircularButton
        onPress={() => {
          dispatch(decrement(counterName));
        }}
        bgColor="transparent"
        icon="minus"
        iconOrigin="FontAwesome"
        iconColor={buttonsColor}
        iconSize={FONT_SIZE.TEXT}
      />

      <Text style={styles.counterText}>{counterValue}</Text>

      <AppCircularButton
        onPress={() => {
          dispatch(increment(counterName));
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
