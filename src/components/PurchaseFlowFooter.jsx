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
  "CHECKOUT": {
    totalPriceTitle: "TOTAL",
    buttonTitle: "Comprar",
    stageColor: COLORS.BLUE_LIGHT,
  },
}

const PurchaseFlowFooter = ({ buttonFunction, purchaseStage, totalPrice }) => {
  const data = purchaseFlowData[purchaseStage.toUpperCase()];

  return (
    <View style={styles.footerContainer}>
      {
        data.imageSource
          ? <View style={styles.imageContainer}>
              <Image
                source={data.imageSource}
                style={styles.image}
                resizeMode="contain"
              />
            </View>
          : null
      }
      <View style={styles.footer}>
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
    </View>
  );
};

export default PurchaseFlowFooter;

const styles = StyleSheet.create({
  image: {
    alignSelf: 'center',
    height: 100,
    width: 140,
  },
  imageContainer: {
    marginTop: SPACE.LG,
    width: '100%',
  },
  footer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: SPACE.LG * 1.5,
    paddingHorizontal: SPACE.LG * 2,
  },
  footerContainer: {
    backgroundColor: COLORS.BLACK,
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
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
