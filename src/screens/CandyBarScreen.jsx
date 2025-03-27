import React, { useState } from 'react';
import { Dimensions, Image, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import AppButton from '../components/AppButton';
import AppHeaderTopBar from '../components/AppHeaderTopBar';
import CartItem from '../components/CartItem';

import { CONFIG } from '../global/config';
import { COLORS, FONTS, FONT_SIZE, SPACE } from '../global/theme';

const { width, height } = Dimensions.get('window');

const CandyBarScreen = ({ navigation }) => {
  const [drink, setDrink] = useState(0);
  const [snacks, setSnacks] = useState(0);
  const [popcorn, setPopCorn] = useState(0);

  console.log("Drink: ", drink, "Snacks: ", snacks, "Popcorn: ", popcorn);

  const getTotalPrice = () => {
    return (drink * getCandyBarProduct("drink").price)
            + (snacks * getCandyBarProduct("snacks").price)
            + (popcorn * getCandyBarProduct("popcorn").price)
  }

  const getCandyBarProduct = (productName) => {
    return CONFIG.CANDYBAR.PRODUCTS.find((product) => product.name === productName.toLowerCase());
  }

  return (
    <LinearGradient
      colors={[COLORS.ROSE, COLORS.BLACK]}
      locations={[0.3, 0.7]}
      style={styles.linearGradient}
    >
      <View style={styles.container}>
        <StatusBar hidden />

        <View>
          <View>
            <AppHeaderTopBar margin={0} navigation={navigation} />

            <Text style={styles.screenText}>
              Aprovecha la oferta exclusiva de nuestra app del {CONFIG.CANDYBAR.APP_EXCLUSIVE_DISCOUNT}% OFF !
            </Text>
          </View>

          <ScrollView
            bounces={false}
            showsVerticalScrollIndicator={false}
            style={styles.itemsContainer}
          >
            <CartItem
              title={"Gaseosa gigante"}
              price={getCandyBarProduct("drink").price}
              withCounter={true}
              count={drink}
              countFunction={setDrink}
            />
            <CartItem
              title={"Combo de Snacks"}
              price={getCandyBarProduct("snacks").price}
              withCounter={true}
              count={snacks}
              countFunction={setSnacks}
            />
            <CartItem
              title={"Balde de pochoclos"}
              price={getCandyBarProduct("popcorn").price}
              withCounter={true}
              count={popcorn}
              countFunction={setPopCorn}
            />
            <CartItem
              title={"Balde de pochoclos"}
              price={getCandyBarProduct("popcorn").price}
              withCounter={true}
              count={popcorn}
              countFunction={setPopCorn}
            />
            <CartItem
              title={"Balde de pochoclos"}
              price={getCandyBarProduct("popcorn").price}
              withCounter={true}
              count={popcorn}
              countFunction={setPopCorn}
            />
            <CartItem
              title={"Balde de pochoclos"}
              price={getCandyBarProduct("popcorn").price}
              withCounter={true}
              count={popcorn}
              countFunction={setPopCorn}
            />
          </ScrollView>
        </View>

        <View>
          <View style={styles.candyBarImageContainer}>
            <Image
              source={require("../assets/images/candyBar.png")}
              style={styles.candyBarImage}
              resizeMode="contain"
            />
          </View>

          <View style={styles.candyBarFooterContainer}>
            <View>
              <Text style={styles.candyBarTotalPriceText}>TOTAL</Text>
              <Text style={styles.candyBarTotalPrice}>$ {getTotalPrice()}</Text>
            </View>
            <AppButton
              onPress={() => {
                navigation.navigate('Cinema', { screen: 'Cart' });
              }}
              title={"Continuar"}
              startColor={COLORS.ROSE}
              endColor={COLORS.BLACK}
            />
          </View>
        </View>

      </View>
    </LinearGradient>
  );
};

export default CandyBarScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    marginHorizontal: SPACE.LG * 2,
  },
  candyBarImage: {
    alignSelf: 'center',
    height: 114,
    width: 154,
  },
  candyBarImageContainer: {
    width: '100%',
  },
  candyBarFooterContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: SPACE.LG * 2,
  },
  candyBarTotalPrice: {
    color: COLORS.ROSE,
    fontFamily: FONTS.TEXT_BOLD,
    fontSize: FONT_SIZE.TEXT_LG * 1.5,
  },
  candyBarTotalPriceText: {
    color: COLORS.WHITE,
    fontFamily: FONTS.TEXT,
    fontSize: FONT_SIZE.TEXT_SM,
  },
  itemsContainer: {
    gap: 10,
    marginBottom: SPACE.LG,
    marginTop: SPACE.LG * 2,
    maxHeight: height * 0.4,
    paddingBottom: '30%',
  },
  linearGradient: {
    height: '100%',
  },
  screenText: {
    color: COLORS.WHITE,
    fontFamily: FONTS.TEXT_BOLD,
    fontSize: FONT_SIZE.TITLE,
    letterSpacing: 0.5,
    marginTop: SPACE.LG * 2,
    textAlign: 'center',
  },
});
