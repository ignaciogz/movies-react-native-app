import React from 'react';
import { FlatList,ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector } from 'react-redux';

import AppHeaderTopBar from '../components/AppHeaderTopBar';
import AppLabel from '../components/AppLabel';
import ListItem from '../components/ListItem';
import PurchaseFlowFooter from '../components/PurchaseFlowFooter';

import { COLORS, FONTS, FONT_SIZE, SPACE } from '../global/theme';
import { formatPrice } from '../utils/formatter';

const CheckOutScreen = ({ navigation }) => {
  const {movieSelected} = useSelector((state)=> state.cinema.value);
  const cart = useSelector((state)=> state.cart.value);

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
            title={`${cart.screeningDate.day} ${cart.screeningDate.date}`}
            bgColor={"transparent"}
            fontSize={FONT_SIZE.TEXT_LG}
            icon="calendar-outline"
            iconOrigin="IonIcons"
          />
          <AppLabel
            title={cart.screeningTime}
            bgColor={"transparent"}
            fontSize={FONT_SIZE.TEXT_LG}
            icon="access-time"
            iconOrigin="MaterialIcons"
          />
        </View>

        
        <FlatList
          data={cart.items}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.itemsContainer}
          renderItem={({ item, index }) => {
              if(item.type === "Pelicula") {
                return (
                  <ListItem
                    key={index}
                    showDataOf="CheckOut"
                    title={movieSelected.title}
                    text={`Fila: ${item.seat.row} | Asiento: ${item.seat.number} | ${formatPrice(item.price)}`}
                  />
                );
              } else if (item.type === "CandyBar") {
                return (
                  <ListItem
                    key={index}
                    showDataOf="CheckOut"
                    title={item.name}
                    text={`Cantidad: ${item.quantity} | ${formatPrice(item.quantity*item.price)}`}
                  />
                );
              } else {
                return null;
              }
            }
          }
        />
      </ScrollView>

      <PurchaseFlowFooter
        buttonFunction={() => {
          navigation.navigate('Movies', { screen: 'Home' });
        }}
        purchaseStage={"checkOut"}
        totalPrice={cart.totalCandyBar + cart.totalTickets}
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
