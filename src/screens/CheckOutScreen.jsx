import React, { useEffect } from 'react';
import { FlatList,ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';

import AppHeaderTopBar from '../components/AppHeaderTopBar';
import AppLabel from '../components/AppLabel';
import ListItem from '../components/ListItem';
import PurchaseFlowFooter from '../components/PurchaseFlowFooter';
import { removeCartItem, resetCart } from "../features/cart/cartSlice";
import { resetCinema } from '../features/cinema/cinemaSlice';
import { resetCounter, resetAllCounters } from "../features/counters/countersSlice";
import { usePostTicketsMutation } from '../services/cinemaService';
import useAppModal from '../hooks/useAppModal';

import { COLORS, FONTS, FONT_SIZE, SPACE } from '../global/theme';
import { formatPrice } from '../utils/formatter';

const CheckOutScreen = ({ navigation }) => {
  const { AppModal, showAppModal } = useAppModal();
  const dispatch = useDispatch();
  const [triggerPostTickets, result] = usePostTicketsMutation();
  const {selectedMovie} = useSelector((state)=> state.cinema.value);
  const cart = useSelector((state)=> state.cart.value);

  useEffect(() => {
    if(cart.totalTickets === 0) {
      finishCheckout();
    }
  }, [cart]);

  const checkout = () => {
    try {
      triggerPostTickets({ ...cart });
      finishCheckout();
    } catch (err) {
      showAppModal("error", `Error al enviar los tickets y/o productos: ${err}`);
    }
  };

  const finishCheckout = () => {
    dispatch(resetCinema());
    dispatch(resetCart());
    dispatch(resetAllCounters());
    navigation.navigate('Movies', { screen: 'Home' });
  };

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
        <AppModal />

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
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.itemsContainer}
          renderItem={({ item }) => {
              if(item.type === "Movie") {
                return (
                  <ListItem
                    showDataOf="CheckOut"
                    title={selectedMovie.title}
                    text={`Fila: ${item.seat.row + 1} | Asiento: ${item.seat.number} | ${formatPrice(item.price)}`}
                    itemFunction={() => {
                      dispatch(removeCartItem(item.id));
                    }}
                  />
                );
              } else if (item.type === "CandyBar") {
                return (
                  <ListItem
                    showDataOf="CheckOut"
                    title={item.text}
                    text={`Cantidad: ${item.quantity} | ${formatPrice(item.quantity*item.price)}`}
                    itemFunction={() => {
                      dispatch(resetCounter(item.name));
                      dispatch(removeCartItem(item.id));
                    }}
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
        buttonFunction={checkout}
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
