import React, { useState } from 'react';
import { Image, ImageBackground, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';

import AppHeaderTopBar from '../components/AppHeaderTopBar';
import AppLabel from '../components/AppLabel';

import { BORDER_RADIUS, COLORS, FONT_SIZE, FONTS, SPACE } from '../global/theme';

const ticketStaticData = {
  seatsArray: [
    { number: 18, row: 2 },
    { number: 28, row: 3 },
    { number: 33, row: 4 },
  ],
  time: '15:30',
  date: { date: 29, day: 'Sab' },
  ticketImage: 'https://image.tmdb.org/t/p/original/8T6nkYb4W8BIeafmFffyfsRciTL.jpg',
}

const TicketScreen = ({ navigation, route }) => {
  const [ticketData, setTicketData] = useState(ticketStaticData);
  /* const [ticketData, setTicketData] = useState(route.params); */

  return (
    <ScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      style={styles.container}
    >
      <StatusBar hidden />

      <AppHeaderTopBar marginHorizontal={SPACE.LG * 3} navigation={navigation} />

      <View style={styles.ticketContainer}>
        <ImageBackground
          source={{uri: ticketData?.ticketImage}}
          style={styles.ticketBackgroundImage}
        >
          <View
            style={[
              styles.ticketBorderCircle,
              { top: -24 }
            ]}>
          </View>
        </ImageBackground>

        <View style={styles.ticketDashLine} />

        <View style={styles.ticketFooter}>
          <View
            style={[
              styles.ticketBorderCircle,
              { bottom: -24 }
            ]}>
          </View>
          <View style={styles.ticketScreeningData}>
            {/* <View style={styles.subTitleContainer}> */}
            <AppLabel
              title={`${ticketData?.date.day} ${ticketData?.date.date}`}
              bgColor={"transparent"}
              fontSize={FONT_SIZE.TEXT_LG}
              icon="calendar-outline"
              iconOrigin="IonIcons"
            />
            {/* </View> */}
            {/* <View style={styles.subTitleContainer}> */}
            <AppLabel
              title={ticketData?.time}
              bgColor={"transparent"}
              fontSize={FONT_SIZE.TEXT_LG}
              icon="access-time"
              iconOrigin="MaterialIcons"
            />
            {/* </View> */}
          </View>
          <Image
            source={require('../assets/images/qrCode.png')}
            style={styles.qrCodeImage}
          />
          <View style={styles.ticketSeatsContainer}>
            <View style={styles.subTitleContainer}>
              <Text style={styles.subHeading}>Fila</Text>
              {
                ticketData?.seatsArray.map((item, index) => {
                  return <Text key={`seat-row-data-${index}`} style={styles.seatData}>{item.row}</Text>
                })
              }
            </View>
            <View style={styles.subTitleContainer}>
              <Text style={styles.subHeading}>Asiento</Text>
              {
                ticketData?.seatsArray.map((item, index) => {
                  return <Text key={`seat-number-data-${index}`} style={styles.seatData}>{item.number}</Text>
                })
              }
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default TicketScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.BLACK,
    display: 'flex',
    flex: 1,
  },
  subTitleContainer: {
    alignItems: 'center',
  },
  qrCodeImage: {
    height: 80,
    marginBottom: SPACE.MD * 2,
    width: 80,
  },
  seatData: {
    color: COLORS.WHITE,
    fontFamily: FONTS.TEXT,
    fontSize: FONT_SIZE.TEXT_SM,
    letterSpacing: 1,
    marginTop: SPACE.SM,
  },
  subHeading: {
    color: COLORS.WHITE,
    fontFamily: FONTS.TEXT,
    fontSize: FONT_SIZE.TEXT_LG,
    marginBottom: SPACE.SM,
  },
  subTitleContainer: {
    alignItems: 'center',
  },
  ticketBackgroundImage: {
    alignSelf: 'center',
    aspectRatio: 200 / 300,
    borderTopLeftRadius: BORDER_RADIUS.MD * 2.5,
    borderTopRightRadius: BORDER_RADIUS.MD * 2.5,
    justifyContent: 'flex-end',
    overflow: 'hidden',
    width: 300,
  },
  ticketBorderCircle: {
    backgroundColor: COLORS.BLACK,
    borderRadius: BORDER_RADIUS.ROUND,
    height: 48,
    left: '50%',
    position: 'absolute',
    transform: [{
      translateX: '-50%',
    }],
    width: 48,
  },
  ticketContainer: {
    flex: 1,
    justifyContent: 'center',
    marginTop: SPACE.LG,
  },
  ticketDashLine: {
    alignSelf: 'center',
    backgroundColor: COLORS.GREY,
    borderTopColor: COLORS.WHITE,
    borderTopWidth: 2,
    borderStyle: 'dashed',
    width: 300,
  },
  ticketFooter: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: COLORS.GREY,
    borderBottomLeftRadius: BORDER_RADIUS.MD * 2.5,
    borderBottomRightRadius: BORDER_RADIUS.MD * 2.5,
    paddingBottom: SPACE.LG * 2,
    paddingTop: SPACE.LG,
    width: 300,
  },
  ticketScreeningData: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: SPACE.MD,
  },
  ticketSeatsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: SPACE.LG * 3,
    justifyContent: 'center',
    marginBottom: SPACE.MD,
  },
});
