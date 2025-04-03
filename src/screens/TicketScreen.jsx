import React, { useEffect, useState } from 'react';
import { Image, ImageBackground, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

import AppHeaderTopBar from '../components/AppHeaderTopBar';
import AppLabel from '../components/AppLabel';
import { useGetMovieByIdQuery } from '../services/cinemaService';

import { CONFIG } from '../global/config';
import { BORDER_RADIUS, COLORS, FONT_SIZE, FONTS, SPACE } from '../global/theme';

const TicketScreen = ({ navigation }) => {
  const [ticketImage, setTicketImage] = useState(null);
  const {selectedTicket} = useSelector((state)=> state.cinema.value);
  const {data: movieData, error, isLoading} = useGetMovieByIdQuery(selectedTicket.movieID);

  useEffect(() => {
    if(!isLoading) {
      const imagePath = CONFIG.GET_IMAGE_PATH('original', movieData.poster_path);
      setTicketImage(imagePath);
    }
  }, [movieData, isLoading]);

  return (
    <ScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      style={styles.container}
    >
      <StatusBar hidden />

      <AppHeaderTopBar marginHorizontal={SPACE.LG * 3} navigation={navigation} />

      {!isLoading && ticketImage ? (
        <View style={styles.ticketContainer}>
          <ImageBackground
            source={{uri: ticketImage}}
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
              <AppLabel
                title={`${selectedTicket.date.day} ${selectedTicket.date.date}`}
                bgColor={"transparent"}
                fontSize={FONT_SIZE.TEXT_LG}
                icon="calendar-outline"
                iconOrigin="IonIcons"
              />
              <AppLabel
                title={selectedTicket.time}
                bgColor={"transparent"}
                fontSize={FONT_SIZE.TEXT_LG}
                icon="access-time"
                iconOrigin="MaterialIcons"
              />
            </View>
            <Image
              source={require('../assets/images/qrCode.png')}
              style={styles.qrCodeImage}
            />
            <View style={styles.ticketSeatsContainer}>
              {
                selectedTicket.type === "Movie"
                && (
                  <>
                    <View style={styles.subTitleContainer}>
                      <Text style={styles.subHeading}>Fila</Text>
                      {
                        selectedTicket.items.map((item, index) => {
                          return <Text key={`seat-row-data-${index}`} style={styles.seatData}>{item.seat.row + 1}</Text>
                        })
                      }
                    </View>
                    <View style={styles.subTitleContainer}>
                      <Text style={styles.subHeading}>Asiento</Text>
                      {
                        selectedTicket.items.map((item, index) => {
                          return <Text key={`seat-number-data-${index}`} style={styles.seatData}>{item.seat.number}</Text>
                        })
                      }
                    </View>
                  </>
                )
              }
              {
                selectedTicket.type === "CandyBar"
                && (
                  <>
                    <View style={styles.subTitleContainer}>
                      <Text style={styles.subHeading}>Producto</Text>
                      {
                        selectedTicket.items.map((item, index) => {
                          return <Text key={`product-text-data-${index}`} style={styles.seatData}>{item.text}</Text>
                        })
                      }
                    </View>
                    <View style={styles.subTitleContainer}>
                      <Text style={styles.subHeading}>Cantidad</Text>
                      {
                        selectedTicket.items.map((item, index) => {
                          return <Text key={`product-quantity-data-${index}`} style={styles.seatData}>{item.quantity}</Text>
                        })
                      }
                    </View>
                  </>
                )
              }
            </View>
          </View>
        </View>
      ) : (
        <Text style={styles.loadingText}>Cargando...</Text>
      )}
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
  loadingText: {
    alignSelf: 'center',
    color: COLORS.WHITE,
    fontFamily: FONTS.TEXT_BLACK,
    fontSize: FONT_SIZE.TEXT_LG,
    letterSpacing: 0.5,
    marginTop: SPACE.LG * 2.5,
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
    paddingBottom: SPACE.LG * 2.8,
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
