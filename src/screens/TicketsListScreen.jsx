import React from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import AppHeaderTopBar from '../components/AppHeaderTopBar';
import ListItem from '../components/ListItem';

import { COLORS, FONTS, FONT_SIZE, SPACE } from '../global/theme';

const TicketsListScreen = ({ navigation }) => {
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

        <View style={styles.itemsContainer}>
          <ListItem
            showDataOf="Tickets"
            title={"Amenaza en el aire"}
            text={`Ticket: 236 | Pelicula`}
            itemFunction={() => {
              navigation.navigate('Cinema', {screen: 'Ticket'});
            }}
          />
          <ListItem
            showDataOf="Tickets"
            title={"Amenaza en el aire"}
            text={`Ticket: 236 | Candybar`}
            itemFunction={() => {
              navigation.navigate('Cinema', {screen: 'Ticket'});
            }}
          />
          <ListItem
            showDataOf="Tickets"
            title={"Capitán América: Brave New World"}
            text={`Ticket: 307 | Pelicula`}
            itemFunction={() => {
              navigation.navigate('Cinema', {screen: 'Ticket'});
            }}
          />
        </View>
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
  screenTextContainer: {
    color: COLORS.WHITE,
    fontFamily: FONTS.TEXT_BOLD,
    fontSize: FONT_SIZE.TITLE,
    letterSpacing: 0.5,
    marginTop: SPACE.LG * 2,
    textAlign: 'center',
  },
});
