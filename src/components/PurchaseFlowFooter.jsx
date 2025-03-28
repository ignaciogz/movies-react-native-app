import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import AppButton from '../components/AppButton';

import { COLORS, FONTS, FONT_SIZE, SPACE } from '../global/theme';

const purchaseFlowData = {
  "BOOKING": {
    totalPriceTitle: "TICKETS",
    buttonTitle: "Adquirir tickets",
    stageColor: COLORS.YELLOW,
  },
  "CANDYBAR": {
    totalPriceTitle: "CANDYBAR",
    buttonTitle: "Continuar",
    stageColor: COLORS.ROSE,
    imageSource: require("../assets/images/candyBar.png"),
  },
  "CART": {
    totalPriceTitle: "TOTAL",
    buttonTitle: "Comprar",
    stageColor: COLORS.GREY,
  },
}

const PurchaseFlowFooter = ({ buttonFunction, purchaseStage, totalPrice, withImage = false }) => {
  const data = purchaseFlowData[purchaseStage.toUpperCase()];

  return (
    <>
      {
        withImage &&
          <View style={styles.imageContainer}>
            <Image
              source={data.imageSource}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
      }
      <View style={styles.footerContainer}>
        <View>
          <Text style={styles.totalPriceTitle}>
            {data.totalPriceTitle}
          </Text>
          <Text style={[styles.totalPriceText, {color: data.stageColor}]}>$ {totalPrice}</Text>
        </View>
        <AppButton
          onPress={buttonFunction}
          title={data.buttonTitle}
          startColor={data.stageColor}
        />
      </View>
    </>
  );
};

export default PurchaseFlowFooter;

const styles = StyleSheet.create({
  image: {
    alignSelf: 'center',
    height: 114,
    width: 154,
  },
  imageContainer: {
    width: '100%',
  },
  footerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: SPACE.LG * 2,
  },
  totalPriceText: {
    fontFamily: FONTS.TEXT_BOLD,
    fontSize: FONT_SIZE.TEXT_LG * 1.5,
  },
  totalPriceTitle: {
    color: COLORS.WHITE,
    fontFamily: FONTS.TEXT,
    fontSize: FONT_SIZE.TEXT_SM,
  },
});
