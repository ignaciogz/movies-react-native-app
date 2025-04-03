import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';

import AppHeaderTopBar from '../components/AppHeaderTopBar';
import ListItem from '../components/ListItem';
import { setSelectedTicket } from '../features/cinema/cinemaSlice';
import { useGetTicketsQuery } from '../services/cinemaService';

import { COLORS, FONTS, FONT_SIZE, SPACE } from '../global/theme';

const TicketsListScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [userTickets, setUserTickets] = useState([]);
  const {data: ticketsData, error, isLoading} = useGetTicketsQuery();
  const {user} = useSelector((state) => state.user.value);

  useEffect(() => {
    if(!isLoading) {
      const ticketsFiltered = ticketsData.filter((ticket) => ticket.user === user);
      const ticketsSorted = ticketsFiltered.sort((a, b) => new Date(a.screeningDate.date) - new Date(b.screeningDate.date));
      setUserTickets(ticketsSorted);
    }
  }, [ticketsData, isLoading]);

  return (
    <LinearGradient
      colors={[COLORS.YELLOW, COLORS.BLACK]}
      locations={[0.3, 0.7]}
      style={styles.linearGradient}
    >
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={styles.container}
      >
        <StatusBar hidden />
        <AppHeaderTopBar navigation={navigation} />

        <Text style={styles.screenTextContainer}>
          TICKETS DISPONIBLES
        </Text>

        {!isLoading && userTickets.length ? (
          <FlatList
            data={userTickets}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.itemsContainer}
            renderItem={({ item }) => {
                let movieTickets = item.items.filter((item) => item.type === "Movie");
                let candyBarTickets = item.items.filter((item) => item.type === "CandyBar");
                const ticketData = {
                  movieID: item.screeningMovieID,
                  date: item.screeningDate,
                  time: item.screeningTime,
                }
                return (
                  <>
                    <ListItem
                      showDataOf="Tickets"
                      title={item.screeningTitle}
                      text={`Pelicula :: ${item.screeningDate.day} ${item.screeningDate.date} de ${item.screeningDate.fullMonth}`}
                      itemFunction={() => {
                        dispatch(setSelectedTicket({
                          type: "Movie",
                          items: movieTickets,
                          ...ticketData,
                        }));
                        navigation.navigate('Cinema', { screen: 'Ticket' });
                      }}
                    />
                    {
                      item.totalCandyBar > 0 &&
                      (
                        <View style={{ marginTop: SPACE.XS * 5 }}>
                          <ListItem
                            showDataOf="Tickets"
                            title={item.screeningTitle}
                            text={`Candybar :: ${item.screeningDate.day} ${item.screeningDate.date} de ${item.screeningDate.fullMonth}`}
                            itemFunction={() => {
                              dispatch(setSelectedTicket({
                                type: "CandyBar",
                                items: candyBarTickets,
                                ...ticketData,
                              }));
                              navigation.navigate('Cinema', { screen: 'Ticket' });
                            }}
                          />
                        </View>
                      )
                    }
                  </>
                );
              }
            }
          />
        ) : (
          <Text style={styles.resultsEmpty}>No hay tickets en su cuenta</Text>
        )}
      </ScrollView>
    </LinearGradient>
  );
};

export default TicketsListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: SPACE.LG * 2,
  },
  itemsContainer: {
    gap: 10,
    marginBottom: SPACE.LG * 1.5,
    marginTop: SPACE.LG * 2,
  },
  linearGradient: {
    height: '100%',
  },
  resultsEmpty: {
    color: COLORS.WHITE,
    fontFamily: FONTS.TEXT_BLACK,
    fontSize: FONT_SIZE.TEXT_LG,
    letterSpacing: 0.5,
    marginTop: SPACE.LG * 2.5,
    textAlign: 'center',
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
