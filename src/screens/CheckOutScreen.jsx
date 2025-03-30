import React from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import AppHeaderTopBar from '../components/AppHeaderTopBar';
import AppLabel from '../components/AppLabel';
import ListItem from '../components/ListItem';
import PurchaseFlowFooter from '../components/PurchaseFlowFooter';

import { COLORS, FONTS, FONT_SIZE, SPACE } from '../global/theme';

const CheckOutScreen = ({ navigation }) => {
  return (
    <LinearGradient
      colors={[COLORS.BLUE_LIGHT, COLORS.BLACK]}
      locations={[0.3, 0.7]}
      style={styles.linearGradient}
    >
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={styles.container}
      >
        <StatusBar hidden />
        <AppHeaderTopBar buttonType="return" navigation={navigation} />

        <Text style={styles.screenTextContainer}>
          RESUMEN DE COMPRA
        </Text>
        <View style={styles.screeningData}>
          <AppLabel
            title={`Sab 29`}
            bgColor={"transparent"}
            fontSize={FONT_SIZE.TEXT_LG}
            icon="calendar-outline"
            iconOrigin="IonIcons"
          />
          <AppLabel
            title={`15:30`}
            bgColor={"transparent"}
            fontSize={FONT_SIZE.TEXT_LG}
            icon="access-time"
            iconOrigin="MaterialIcons"
          />
        </View>

        <View style={styles.itemsContainer}>
          <ListItem
            showDataOf="CheckOut"
            title={"Amenaza en el aire"}
            text={`Fila: 6 | Asiento: 18 | $8000` }
          />
          <ListItem
            showDataOf="CheckOut"
            title={"Amenaza en el aire"}
            text={`Fila: 6 | Asiento: 19 | $8000` }
          />
          <ListItem
            showDataOf="CheckOut"
            title={"Gaseosa gigante"}
            text={`Cantidad: 2 | $9000`}
          />
          <ListItem
            showDataOf="CheckOut"
            title={"Balde de pochoclos"}
            text={`Cantidad: 2 | $16000`}
          />
        </View>
      </ScrollView>

      <PurchaseFlowFooter
        buttonFunction={() => {
          navigation.navigate('Movies');
        }}
        purchaseStage={"checkOut"}
        totalPrice={32512}
      />
    </LinearGradient>
  );
};

export default CheckOutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: SPACE.LG * 2,
    paddingBottom: 86,
  },
  itemsContainer: {
    gap: 10,
    marginBottom: SPACE.LG * 1.5,
    marginTop: SPACE.LG * 2,
  },
  linearGradient: {
    flex: 1,
  },
  screeningData: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  screenTextContainer: {
    color: COLORS.WHITE,
    fontFamily: FONTS.TEXT_BOLD,
    fontSize: FONT_SIZE.TITLE,
    letterSpacing: 0.5,
    marginTop: SPACE.LG * 2,
    textAlign: 'center',
  },
});
