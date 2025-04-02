import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, StatusBar, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';

import AppHeaderTopBar from '../components/AppHeaderTopBar';
import ListItem from '../components/ListItem';
import PurchaseFlowFooter from '../components/PurchaseFlowFooter';
import { addCartItems } from "../features/cart/cartSlice";
import { useGetCandyBarProductsQuery } from '../services/cinemaService';

import { CONFIG } from '../global/config';
import { COLORS, FONTS, FONT_SIZE, SPACE } from '../global/theme';
import { formatPrice } from '../utils/formatter';

const CandyBarScreen = ({ navigation }) => {
  const [candyBarProducts, setCandyBarProducts] = useState([]);
  const [candyBarTotal, setCandyBarTotal] = useState(0);
  const dispatch = useDispatch();
  const {data: candyBarData, error, isLoading} = useGetCandyBarProductsQuery();
  const counters = useSelector((state) => state.counters);
  const userLogged = useSelector( state => state.user.value);

  useEffect(() => {
    if(!isLoading){
      setCandyBarProducts(candyBarData);
    }
  }, [candyBarData, isLoading]);

  useEffect(() => {
    if(candyBarProducts.length > 0) {
      setCandyBarTotal(getTotalPrice());
    }
  }, [candyBarProducts, counters]);

  const addProductsToCart = () => {
    const selectedProductsArray = getSelectedProductsArray();

    dispatch(addCartItems({
      user: userLogged.localId,
      type: "CandyBar",
      products: selectedProductsArray,
    }));

    navigation.navigate('Cinema', { screen: 'CheckOut' });
  }

  const getSelectedProductsArray = () => {
    return Object.entries(counters)
                .filter(([key, value]) => value > 0)
                .map(([key, value]) => {
                  const product = candyBarProducts.find((product) => product.name === key);
                  return {
                    name: product.name,
                    text: product.text,
                    quantity: value,
                    price: product.price
                  }
                });
  }

  const getTotalPrice = () => {
    const totalPrice = candyBarProducts.reduce((total, product) => {
      return total + product.price * counters[product.name];
    }, 0);

    return totalPrice;
  }

  return (
    <LinearGradient
      colors={[COLORS.ROSE, COLORS.BLACK]}
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
          Aprovecha la oferta exclusiva de nuestra app del {CONFIG.CANDYBAR.APP_EXCLUSIVE_DISCOUNT}% OFF !
        </Text>

        <FlatList
          data={candyBarProducts}
          keyExtractor={(item) => item.name}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.itemsContainer}
          renderItem={({ item }) => (
            <ListItem
              showDataOf="CandyBar"
              title={item.text}
              text={`${formatPrice(item.price)} c/u`}
              counterName={item.name}
            />
          )}
        />
      </ScrollView>

      <PurchaseFlowFooter
        buttonFunction={() => {
          addProductsToCart();
        }}
        purchaseStage={"candyBar"}
        totalPrice={candyBarTotal}
      />
    </LinearGradient>
  );
};

export default CandyBarScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: SPACE.LG * 2,
    paddingBottom: 198,
  },
  itemsContainer: {
    gap: 10,
    marginBottom: SPACE.LG * 1.5,
    marginTop: SPACE.LG * 2,
  },
  linearGradient: {
    flex: 1,
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
