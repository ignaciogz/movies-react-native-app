import React, { useState } from 'react';
import { Dimensions, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import AppHeaderTopBar from '../components/AppHeaderTopBar';
import ListItem from '../components/ListItem';
import PurchaseFlowFooter from '../components/PurchaseFlowFooter';

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
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={styles.container}
      >
        <StatusBar hidden />

        <View>
          <AppHeaderTopBar buttonType="return" navigation={navigation} />
          <Text style={styles.screenTextContainer}>
            Aprovecha la oferta exclusiva de nuestra app del {CONFIG.CANDYBAR.APP_EXCLUSIVE_DISCOUNT}% OFF !
          </Text>
        </View>

        <View style={styles.productsContainer}>
          <ListItem
            title={"Gaseosa gigante"}
            price={getCandyBarProduct("drink").price}
            withCounter={true}
            count={drink}
            countFunction={setDrink}
          />
          <ListItem
            title={"Combo de Snacks"}
            price={getCandyBarProduct("snacks").price}
            withCounter={true}
            count={snacks}
            countFunction={setSnacks}
          />
          <ListItem
            title={"Balde de pochoclos"}
            price={getCandyBarProduct("popcorn").price}
            withCounter={true}
            count={popcorn}
            countFunction={setPopCorn}
          />
        </View>

        <PurchaseFlowFooter
          buttonFunction={() => {
            navigation.navigate('Cinema', { screen: 'Cart' });
          }}
          purchaseStage={"candyBar"}
          totalPrice={getTotalPrice()}
          withImage={true}
        />
      </ScrollView>
    </LinearGradient>
  );
};

export default CandyBarScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: SPACE.LG * 2,
  },
  productsContainer: {
    gap: 10,
    marginBottom: SPACE.LG * 1.5,
    marginTop: SPACE.LG * 2,
  },
  linearGradient: {
    height: '100%',
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
