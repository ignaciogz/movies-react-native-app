import React from 'react';
import { StyleSheet, View } from 'react-native';

import AppCircularButton from './AppCircularButton';

import { SPACE } from '../global/theme';

const AppHeaderTopBar = ({
  buttonType = 'close',
  children,
  marginHorizontal = 0,
  marginTop,
  navigation }) => {
  return (
    <View style={[
      styles.headerTopBar,
      {
        marginHorizontal: marginHorizontal,
        marginTop: marginTop ? marginTop : SPACE.LG * 3.5
      }
    ]}>
      <AppCircularButton
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
  },
});
