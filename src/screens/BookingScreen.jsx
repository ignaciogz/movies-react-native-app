import React, { useEffect } from 'react';
import { FlatList, ImageBackground, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppHeaderTopBar from '../components/AppHeaderTopBar';
import AppIcon from '../components/AppIcon';
import AppLabel from '../components/AppLabel';
import PurchaseFlowFooter from '../components/PurchaseFlowFooter';
import { addCartItems } from "../features/cart/cartSlice";
import { setAppSelectedSeats } from '../features/cinema/cinemaSlice';
import useAppModal from '../hooks/useAppModal';
import useBooking from '../hooks/useBooking';
import { useGetScreeningTimesQuery } from '../services/cinemaService';

import { CONFIG } from '../global/config';
import { BORDER_RADIUS, COLORS, FONT_SIZE, FONTS, SPACE } from '../global/theme';
import { getExclusiveElements } from '../utils/helpers';

const bookingTicketPrice = CONFIG.CINEMA_ROOM.TICKETS.GENERAL_PRICE;

const BookingScreen = ({ navigation, route }) => {
  const { AppModal, showAppModal } = useAppModal();
  const {
    bookingAvailableDatesArray,
    bookingSeatsArray,
    bookingTimesArray,
    bookingTotalPrice,
    selectedDateIndex,
    selectedSeatsArray,
    selectedTimeIndex,
    clearBooking,
    selectSeat,
    setBookingTimesArray,
    setSelectedDateIndex,
    setSelectedTimeIndex,
  } = useBooking();
  const dispatch = useDispatch();
  const {data: timesData, error: errorTimes, isLoading: isTimesLoading} = useGetScreeningTimesQuery();
  const cart = useSelector( state => state.cart.value);
  const {selectedMovie, appSelectedSeats} = useSelector((state)=> state.cinema.value);
  const {user} = useSelector((state) => state.user.value);

  useEffect(() => {
    clearBooking();
  }, [selectedMovie]);

  useEffect(() => {
    if(!isTimesLoading) {
      setBookingTimesArray(timesData);
    }
  }, [timesData, isTimesLoading]);

  useEffect(() => {
    if(appSelectedSeats.length > 0) {
      const cartTickets = cart.items.filter((item) => item.type === "Pelicula");
      const cartSeats = cartTickets.map((item) => item.seat);

      if(cartSeats.length !== appSelectedSeats.length) {
        const deletedSeats = getExclusiveElements(appSelectedSeats, cartSeats);
        deletedSeats.forEach(seat => {
          selectSeat(seat.row, seat.column, seat.number);
        });
      }
    }
  }, [cart]);

  const bookSeats = () => {
    const areSeatsSelected = selectedSeatsArray.length !== 0;
    const isDateSelected = bookingAvailableDatesArray[selectedDateIndex] !== undefined;
    const isTimeSelected = bookingTimesArray[selectedTimeIndex] !== undefined;

    if (areSeatsSelected && isDateSelected && isTimeSelected) {
      dispatch(addCartItems({
        user: user,
        type: "Movie",
        seats: selectedSeatsArray,
        movieID: route.params.movieID,
        movieTitle: selectedMovie.title,
        screeningDate: bookingAvailableDatesArray[selectedDateIndex],
        screeningTime: bookingTimesArray[selectedTimeIndex],
        price: bookingTicketPrice
      }));

      dispatch(setAppSelectedSeats(selectedSeatsArray));

      navigation.navigate('Cinema', { screen: 'CandyBar' });
    } else {
      let message = "Por favor, seleccione:\n";

      const missingSelections = [];
      if (!areSeatsSelected) missingSelections.push("uno o más asientos");
      if (!isDateSelected) missingSelections.push("una fecha");
      if (!isTimeSelected) missingSelections.push("un horario");

      message += missingSelections.join(", ");
      showAppModal("message", message);
    }
  };

  return (
    <>
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={styles.container}
      >
        <StatusBar hidden />
        <AppModal />

        {/* ----------- SCREEN ----------- */}
        <View style={styles.cinemaScreenContainer}>
          <ImageBackground
            source={{uri: route.params?.bgImage}}
            style={styles.cinemaScreen}
            imageStyle={styles.cinemaScreenImage}
          >
            <AppHeaderTopBar
              marginTop={SPACE.LG * 2}
              navigation={navigation}
            >
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
              {route.params?.title}
            </Text>
          </ImageBackground>
        </View>

        <View style={styles.cinemaSeatsContainer}>
          {/* ----------- SEATS ----------- */}
          <View style={styles.cinemaSeats}>
            {bookingSeatsArray?.map((item, rowIndex) => {
              return (
                <View key={rowIndex} style={styles.cinemaSeatsRows}>
                  {
                    item?.map((seatObject, columnIndex, rowArray) => {
                      const columnsLength = rowArray.length;
                      let seatStyles = [styles.cinemaSeat];
                      let isBigCinema = columnsLength >= 9;

                      if (columnIndex === 0) {
                        seatStyles.push(styles.cinemaSeatDecorationStart);
                      } else if (columnIndex === (isBigCinema ? 2 : 1)) {
                        seatStyles.push(styles.cinemaSeatDecorationEnd, { marginRight: SPACE.LG * 2 });
                      } else if (columnIndex === (isBigCinema ? 3 : 2)) {
                        seatStyles.push(styles.cinemaSeatDecorationStart);
                      } else if (columnIndex === columnsLength - (isBigCinema ? 4 : 3)) {
                        seatStyles.push(styles.cinemaSeatDecorationEnd);
                      } else if (columnIndex === columnsLength - (isBigCinema ? 3 : 2)) {
                        seatStyles.push(styles.cinemaSeatDecorationStart, { marginLeft: SPACE.LG * 2 });
                      } else if (columnIndex === columnsLength - 1) {
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
            data={bookingAvailableDatesArray}
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
                        : index == bookingAvailableDatesArray.length - 1
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

        {/* ----------- TIMES ----------- */}
        <View style={styles.bookingTimesContainer}>
          <FlatList
            data={bookingTimesArray}
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
                        : index == bookingTimesArray.length - 1
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
      </ScrollView>

      <PurchaseFlowFooter
        buttonFunction={() => {
          bookSeats();
        }}
        purchaseStage={"Booking"}
        totalPrice={bookingTotalPrice}
      />
    </>
  );
};

export default BookingScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.BLACK,
    flex: 1,
    paddingBottom: 86,
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
  bookingTimesContainer: {
    marginTop: SPACE.LG * 1.5,
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
    marginTop: SPACE.LG * 1.5,
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
