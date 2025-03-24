import React, {useState} from 'react';
import { FlatList, ImageBackground, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import AppButton from '../components/AppButton';
import AppHeaderTopBar from '../components/AppHeaderTopBar';
import AppIcon from '../components/AppIcon';
import AppLabel from '../components/AppLabel';
import useAppModal from '../hooks/useAppModal';

import { CONFIG } from '../global/config';
import { BORDER_RADIUS, COLORS, FONTS, FONT_SIZE, SPACE } from '../global/theme';
import { generateCinemaRoomDates, generateCinemaRoomSeats }from '../utils/cinema-room';

const cinemaColumns = CONFIG.CINEMA_ROOM.COLUMNS;
const cinemaRows = CONFIG.CINEMA_ROOM.ROWS;
const cinemaShowTimesArray = CONFIG.CINEMA_ROOM.SHOWTIMES;
const ticketsPrice = CONFIG.TICKETS.GENERAL_PRICE;

const BookingScreen = ({ navigation, route }) => {
  const { AppModal, showAppModal } = useAppModal();

  const [cinemaAvailableDatesArray, setCinemaAvailableDatesArray] = useState(generateCinemaRoomDates());
  const [cinemaSeatsArray, setCinemaSeatsArray] = useState(generateCinemaRoomSeats(cinemaRows, cinemaColumns));

  const [selectedDateIndex, setSelectedDateIndex] = useState(null);
  const [selectedSeatsArray, setSelectedSeatsArray] = useState([]);
  const [selectedTimeIndex, setSelectedTimeIndex] = useState(null);

  const [totalPrice, setTotalPrice] = useState(0);

  console.log("------------------")
  console.log(":: Seats - Array: ", cinemaSeatsArray)
  console.log("Selected Seat - Array: ", selectedSeatsArray)
  console.log("Selected Date - Index: ", selectedDateIndex)
  console.log("Selected Time - Index: ", selectedTimeIndex)
  console.log(":: Total Price: ", totalPrice)
  console.log("------------------")

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

      setTotalPrice(selectedSeats.length * ticketsPrice);
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
      } catch (error) {
        showAppModal('error', `BookSeats function FAILED: ${error}`);
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

      {/* ----------- PANTALLA ----------- */}
      <View style={styles.cinemaScreenContainer}>
        <ImageBackground
          source={{uri: route.params?.BgImage}}
          style={styles.cinemaScreen}
          imageStyle={styles.cinemaScreenImage}
        >
          <AppHeaderTopBar margin={0} navigation={navigation}>
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
        {/* ----------- ASIENTOS ----------- */}
        <View style={styles.cinemaSeats}>
          {cinemaSeatsArray?.map((item, rowIndex) => {
            return (
              <View key={rowIndex} style={styles.cinemaSeatsRows}>
                {item?.map((seatObject, columnIndex) => {
                  let seatStyle = [styles.cinemaSeat];

                  if (columnIndex === 0) {
                    seatStyle.push(styles.cinemaSeatDecorationStart);
                  } else if (columnIndex === (cinemaColumns >= 9 ? 2 : 1)) {
                    seatStyle.push(styles.cinemaSeatDecorationEnd, { marginRight: SPACE.LG * 2 });
                  } else if (columnIndex === (cinemaColumns >= 9 ? 3 : 2)) {
                    seatStyle.push(styles.cinemaSeatDecorationStart);
                  } else if (columnIndex === cinemaColumns - (cinemaColumns >= 9 ? 4 : 3)) {
                    seatStyle.push(styles.cinemaSeatDecorationEnd);
                  } else if (columnIndex === cinemaColumns - (cinemaColumns >= 9 ? 3 : 2)) {
                    seatStyle.push(styles.cinemaSeatDecorationStart, { marginLeft: SPACE.LG * 2 });
                  } else if (columnIndex === cinemaColumns - 1) {
                    seatStyle.push(styles.cinemaSeatDecorationEnd);
                  }

                  return (
                    <TouchableOpacity
                      key={seatObject.number}
                      style={seatStyle}
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

        {/* ----------- LEYENDAS ----------- */}
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

      {/* ----------- FECHAS ----------- */}
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

      {/* ----------- HORARIOS ----------- */}
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

      {/* ----------- PRECIOS y BOTON DE CONTINUAR ----------- */}
      <View style={styles.bookingFooterContainer}>
        <View>
          <Text style={styles.bookingTotalPriceText}>TOTAL</Text>
          <Text style={styles.bookingTotalPrice}>$ {totalPrice}</Text>
        </View>

        <AppButton
          onPress={() => {bookSeats()}}
          title={"Adquirir tickets"}
          startColor={COLORS.YELLOW}
          endColor={COLORS.BLACK}        />
      </View>
    </ScrollView>
  );
};

export default BookingScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.BLACK,
    display: 'flex',
    flex: 1,
  },
  bookingDateContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: SPACE.MD,
    paddingVertical: SPACE.MD * 2,
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
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: SPACE.LG * 2,
    paddingBottom: SPACE.LG * 2,
  },
  bookingSeatsAvailabilityContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: SPACE.MD * 1.2,
    marginTop: SPACE.LG * 3,
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
    marginVertical: SPACE.LG * 2,
  },
  bookingTotalPrice: {
    color: COLORS.YELLOW,
    fontFamily: FONTS.TEXT,
    fontSize: FONT_SIZE.TEXT_LG * 1.5,
    fontWeight: 'bold',
  },
  bookingTotalPriceText: {
    color: COLORS.WHITE,
    fontFamily: FONTS.TEXT,
    fontSize: FONT_SIZE.TEXT_SM,
  },
  cinemaMovieTitleContainer: {
    alignSelf: 'center',
    bottom: 0,
    color: COLORS.WHITE,
    fontFamily: FONTS.TEXT,
    fontSize: FONT_SIZE.MOVIE_TITLE,
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
    marginVertical: SPACE.LG * 2,
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
    borderTopLeftRadius: BORDER_RADIUS.CIRCLE,
    borderTopRightRadius: BORDER_RADIUS.CIRCLE,
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
