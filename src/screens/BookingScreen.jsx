import React, { useState } from 'react';
import { FlatList, ImageBackground, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import AppHeaderTopBar from '../components/AppHeaderTopBar';
import AppIcon from '../components/AppIcon';
import AppLabel from '../components/AppLabel';
import PurchaseFlowFooter from '../components/PurchaseFlowFooter';
import useAppModal from '../hooks/useAppModal';

import { CONFIG } from '../global/config';
import { BORDER_RADIUS, COLORS, FONT_SIZE, FONTS, SPACE } from '../global/theme';
import { generateAvailableWeekdays, generateSeats } from '../utils/booking';

const cinemaColumns = CONFIG.CINEMA_ROOM.COLUMNS;
const cinemaRows = CONFIG.CINEMA_ROOM.ROWS;
const cinemaShowTimesArray = CONFIG.CINEMA_ROOM.SHOWTIMES;
const cinemaTicketPrice = CONFIG.CINEMA_ROOM.TICKETS.GENERAL_PRICE;

const BookingScreen = ({ navigation, route }) => {
  const { AppModal, showAppModal } = useAppModal();

  const [cinemaAvailableDatesArray, setCinemaAvailableDatesArray] = useState(generateAvailableWeekdays());
  const [cinemaSeatsArray, setCinemaSeatsArray] = useState(generateSeats(cinemaRows, cinemaColumns));

  const [selectedDateIndex, setSelectedDateIndex] = useState(null);
  const [selectedSeatsArray, setSelectedSeatsArray] = useState([]);
  const [selectedTimeIndex, setSelectedTimeIndex] = useState(null);

  const [totalPrice, setTotalPrice] = useState(0);

  /* console.log("------------------")
  console.log(":: Seats - Array: ", cinemaSeatsArray)
  console.log("Selected Seat - Array: ", selectedSeatsArray)
  console.log("Selected Date - Index: ", selectedDateIndex)
  console.log("Selected Time - Index: ", selectedTimeIndex)
  console.log(":: Total Price: ", totalPrice)
  console.log("------------------") */

  const selectSeat = (roomRow, roomColumn, seatNumberSelected) => {
    if (!cinemaSeatsArray[roomRow][roomColumn].taken) {
      let selectedSeats = [...selectedSeatsArray];
      let cinemaRoomSeats = [...cinemaSeatsArray];

      cinemaRoomSeats[roomRow][roomColumn].selected = !cinemaRoomSeats[roomRow][roomColumn].selected;

      if (!selectedSeats.includes(seatNumberSelected)) {
        selectedSeats.push(seatNumberSelected);
        setSelectedSeatsArray(selectedSeats);
      } else {
        const seatIndex = selectedSeats.indexOf(seatNumberSelected);

        if (seatIndex > -1) {
          selectedSeats.splice(seatIndex, 1);
          setSelectedSeatsArray(selectedSeats);
        }
      }

      setTotalPrice(selectedSeats.length * cinemaTicketPrice);
      setCinemaSeatsArray(cinemaRoomSeats);
    }
  };

  const bookSeats = async () => {
    const areSeatsSelected = selectedSeatsArray.length !== 0;
    const isDateSelected = cinemaAvailableDatesArray[selectedDateIndex] !== undefined;
    const isTimeSelected = cinemaShowTimesArray[selectedTimeIndex] !== undefined;

    if (areSeatsSelected && isDateSelected && isTimeSelected) {
      try {
        console.log("REDUX !");
        // ---- SAVE TICKETS INTO REDUX CART STATE ----

        /* {
          movieTitle: route.params.Title,
          seatsArray: selectedSeatsArray,
          time: cinemaShowTimesArray[selectedTimeIndex],
          date: cinemaAvailableDatesArray[selectedDateIndex],
          ticketImage: route.params.PosterImage,
        } */
      } catch (err) {
        showAppModal('error', `BookSeats function FAILED: ${err}`);
      }

      navigation.navigate('Cinema', {screen: 'CandyBar'});
    } else {
      let message = "Por favor, seleccione: ";
      const missingSelections = [];

      if (!areSeatsSelected)  missingSelections.push("uno o más asientos");
      if (!isDateSelected)    missingSelections.push("una fecha");
      if (!isTimeSelected)    missingSelections.push("un horario");

      message += missingSelections.join(", ");

      showAppModal('message', message);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      bounces={false}
      showsVerticalScrollIndicator={false}
    >
      <StatusBar hidden />
      <AppModal />

      {/* ----------- SCREEN ----------- */}
      <View style={styles.cinemaScreenContainer}>
        <ImageBackground
          source={{uri: route.params?.BgImage}}
          style={styles.cinemaScreen}
          imageStyle={styles.cinemaScreenImage}
        >
          <AppHeaderTopBar navigation={navigation}>
            <AppLabel
              title={`${selectedSeatsArray.length}`}
              fontBold={true}
              fontColor={COLORS.YELLOW}
              fontSize={FONT_SIZE.TEXT_LG}
              icon="ticket"
              iconColor={COLORS.YELLOW}
              iconOrigin="IonIcons"
            />
          </AppHeaderTopBar>
          <View style={styles.cinemaScreenOverlay} />
          <Text numberOfLines={1} style={styles.cinemaMovieTitleContainer}>
            {route.params?.Title}
          </Text>
        </ImageBackground>
      </View>

      <View style={styles.cinemaSeatsContainer}>
        {/* ----------- SEATS ----------- */}
        <View style={styles.cinemaSeats}>
          {cinemaSeatsArray?.map((item, rowIndex) => {
            return (
              <View key={rowIndex} style={styles.cinemaSeatsRows}>
                {item?.map((seatObject, columnIndex) => {
                  let seatStyles = [styles.cinemaSeat];
                  let isBigCinema = cinemaColumns >= 9;

                  if (columnIndex === 0) {
                    seatStyles.push(styles.cinemaSeatDecorationStart);
                  } else if (columnIndex === (isBigCinema ? 2 : 1)) {
                    seatStyles.push(styles.cinemaSeatDecorationEnd, { marginRight: SPACE.LG * 2 });
                  } else if (columnIndex === (isBigCinema ? 3 : 2)) {
                    seatStyles.push(styles.cinemaSeatDecorationStart);
                  } else if (columnIndex === cinemaColumns - (isBigCinema ? 4 : 3)) {
                    seatStyles.push(styles.cinemaSeatDecorationEnd);
                  } else if (columnIndex === cinemaColumns - (isBigCinema ? 3 : 2)) {
                    seatStyles.push(styles.cinemaSeatDecorationStart, { marginLeft: SPACE.LG * 2 });
                  } else if (columnIndex === cinemaColumns - 1) {
                    seatStyles.push(styles.cinemaSeatDecorationEnd);
                  }

                  return (
                    <TouchableOpacity
                      key={seatObject.number}
                      style={seatStyles}
                      onPress={() => {
                        selectSeat(rowIndex, columnIndex, seatObject.number);
                      }}>
                        <AppIcon
                          icon="event-seat"
                          iconColor={
                            seatObject.taken ? COLORS.GREY
                            : seatObject.selected ? COLORS.YELLOW : COLORS.WHITE}
                          iconOrigin="MaterialIcons"
                          iconSize={FONT_SIZE.ICON * 1.2}
                        />
                    </TouchableOpacity>
                  );
                })}
              </View>
            );
          })}
        </View>

        {/* ----------- LEGEND ----------- */}
        <View style={styles.bookingSeatsAvailabilityContainer}>
          <View style={styles.bookingSeatsAvailabilityInfo}>
            <AppIcon
              icon="circle"
              iconColor={COLORS.WHITE}
              iconOrigin="MaterialIcons"
              iconSize={FONT_SIZE.ICON}
            />
            <Text style={styles.bookingSeatsAvailabilityText}>Disponibles</Text>
          </View>

          <View style={styles.bookingSeatsAvailabilityInfo}>
            <AppIcon
              icon="circle"
              iconColor={COLORS.GREY}
              iconOrigin="MaterialIcons"
              iconSize={FONT_SIZE.ICON}
            />
            <Text style={styles.bookingSeatsAvailabilityText}>Ocupados</Text>
          </View>

          <View style={styles.bookingSeatsAvailabilityInfo}>
            <AppIcon
              icon="circle"
              iconColor={COLORS.YELLOW}
              iconOrigin="MaterialIcons"
              iconSize={FONT_SIZE.ICON}
            />
            <Text style={styles.bookingSeatsAvailabilityText}>Seleccionados</Text>
          </View>
        </View>
      </View>

      {/* ----------- DATES ----------- */}
      <View>
        <FlatList
          data={cinemaAvailableDatesArray}
          keyExtractor={item => item.date}
          horizontal
          showsHorizontalScrollIndicator={false}
          bounces={false}
          contentContainerStyle={styles.flatListItemsGap}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity onPress={() => setSelectedDateIndex(index)}>
                <View
                  style={
                    index == 0
                      ? { marginLeft: SPACE.LG * 2 }
                      : index == cinemaAvailableDatesArray.length - 1
                        ? { marginRight: SPACE.LG * 2 }
                        : {}
                  }>
                  <AppLabel
                    bgColor={index == selectedDateIndex
                      ? COLORS.YELLOW
                      : COLORS.GREY
                    }
                  >
                    <View style={styles.bookingDateContainer}>
                      <Text style={styles.bookingDayText}>{item.day.toUpperCase()}</Text>
                      <Text style={styles.bookingDateText}>{item.date}</Text>
                    </View>
                  </AppLabel>

                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      {/* ----------- SHOW TIMES ----------- */}
      <View style={styles.bookingShowTimesContainer}>
        <FlatList
          data={cinemaShowTimesArray}
          keyExtractor={item => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          bounces={false}
          contentContainerStyle={styles.flatListItemsGap}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity onPress={() => setSelectedTimeIndex(index)}>
                <View
                  style={
                    index == 0
                      ? { marginLeft: SPACE.LG * 2 }
                      : index == cinemaShowTimesArray.length - 1
                        ? { marginRight: SPACE.LG * 2 }
                        : {}
                }>
                  <AppLabel
                    title={item}
                    bgColor={index == selectedTimeIndex
                      ? COLORS.YELLOW
                      : COLORS.GREY
                    }
                    fontSize={FONT_SIZE.TEXT_LG * 1.2}
                  />
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      {/* ----------- FOOTER ----------- */}
      <View style={styles.bookingFooterContainer}>
        <PurchaseFlowFooter
          buttonFunction={() => {
            bookSeats();
          }}
          purchaseStage={"Booking"}
          totalPrice={totalPrice}
        />
      </View>
    </ScrollView>
  );
};

export default BookingScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.BLACK,
    flex: 1,
  },
  bookingDateContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: SPACE.MD * 0.8,
    paddingVertical: SPACE.MD * 1.8,
    rowGap: SPACE.MD,
  },
  bookingDateText: {
    color: COLORS.WHITE,
    fontFamily: FONTS.TEXT,
    fontSize: FONT_SIZE.TEXT_SM * 2,
  },
  bookingDayText: {
    color: COLORS.WHITE,
    fontFamily: FONTS.TEXT,
    fontSize: FONT_SIZE.TEXT_SM,
  },
  bookingFooterContainer: {
    marginHorizontal: SPACE.LG * 2,
  },
  bookingSeatsAvailabilityContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: SPACE.MD * 1,
    marginTop: SPACE.LG * 2.8,
  },
  bookingSeatsAvailabilityInfo: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: SPACE.MD * 1.2,
  },
  bookingSeatsAvailabilityText: {
    color: COLORS.WHITE,
    fontFamily: FONTS.TEXT,
    fontSize: FONT_SIZE.TEXT_SM,
  },
  bookingShowTimesContainer: {
    marginTop: SPACE.LG * 2,
  },
  cinemaMovieTitleContainer: {
    alignSelf: 'center',
    bottom: 0,
    color: COLORS.WHITE,
    fontFamily: FONTS.TEXT,
    fontSize: FONT_SIZE.TITLE,
    letterSpacing: 0.5,
    position: 'absolute',
  },
  cinemaSeat: {
    borderBottomColor: COLORS.GREY,
    borderBottomWidth: 3,
    paddingBottom: SPACE.SM,
    paddingHorizontal: SPACE.SM,
  },
  cinemaSeatDecorationStart: {
    borderBottomColor: COLORS.GREY,
    borderBottomLeftRadius: '25%',
    borderLeftColor: COLORS.GREY,
    borderLeftWidth: 3,
  },
  cinemaSeatDecorationEnd: {
    borderBottomColor: COLORS.GREY,
    borderBottomRightRadius: '25%',
    borderRightColor: COLORS.GREY,
    borderRightWidth: 3,
  },
  cinemaSeats: {
    rowGap: SPACE.MD * 2,
  },
  cinemaSeatsContainer: {
    marginVertical: SPACE.LG * 1.5,
  },
  cinemaSeatsRows: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cinemaScreen: {
    aspectRatio: 3072 / 1727,
    width: '100%',
  },
  cinemaScreenContainer: {
    alignSelf: 'center',
    width: '85%',
  },
  cinemaScreenImage: {
    transform: [
      { perspective: 600 },
      { rotateX: '-45deg' },
      { rotateY: '0deg' },
    ],
  },
  cinemaScreenOverlay:{
    alignSelf: 'center',
    backgroundColor: COLORS.BLACK,
    borderTopLeftRadius: BORDER_RADIUS.ROUND,
    borderTopRightRadius: BORDER_RADIUS.ROUND,
    bottom: 15,
    height: '20%',
    position: 'absolute',
    transform: [
      { perspective: 600 },
      { rotateX: '-45deg' },
      { rotateY: '0deg' },
    ],
    width: '100%',
  },
  flatListItemsGap: {
    gap: SPACE.MD,
  },
});
