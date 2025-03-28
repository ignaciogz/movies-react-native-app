import React from 'react';
import { StyleSheet, View } from 'react-native';

import AppCircleButton from './AppCircleButton';

import { SPACE } from '../global/theme';

const AppHeaderTopBar = ({ buttonType = 'close', children, margin = SPACE.LG * 3, navigation }) => {
  return (
    <View style={[styles.headerTopBar, { marginHorizontal: margin }]}>
      <AppCircleButton
        onPress={() => navigation.goBack()}
        icon={buttonType === 'return' ? "arrow-back-circle-outline" : "close-circle-outline" }
        iconOrigin="IonIcons"
      />

      {children}
    </View>
  );
};

export default AppHeaderTopBar;

const styles = StyleSheet.create({
  headerTopBar: {
    display: 'flex',
    flexDirection: 'row',
    gap: SPACE.MD,
    justifyContent: 'space-between',
    marginTop: SPACE.LG * 3.5,
  },
});
