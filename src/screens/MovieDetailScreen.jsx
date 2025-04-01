import React from 'react';
import { ScrollView, StatusBar, StyleSheet, View } from 'react-native';

import AppButton from '../components/AppButton';
import MovieDetailCard from '../components/MovieDetailCard';

import { CONFIG } from '../global/config';
import { COLORS, SPACE } from '../global/theme';

const MovieDetailScreen = ({ navigation, route }) => {
  const movieData = route.params.movieData;

  return (
    <ScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      style={styles.container}
    >
      <StatusBar hidden />

      <MovieDetailCard movieData={movieData} navigation={navigation} />

      <View style={styles.buttonContainer}>
        <AppButton
          onPress={() => {
            navigation.navigate('Cinema', { screen: 'Booking', params: {
              title: movieData.title,
              bgImage: CONFIG.GET_IMAGE_PATH('w780', movieData.backdrop_path),
            }});
          }}
          title={"Seleccionar butacas"}
          endColor={COLORS.VIOLET_DARK}
        />
      </View>
    </ScrollView>
  );
};

export default MovieDetailScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.BLACK,
    flex: 1,
  },
  buttonContainer: {
    alignItems: 'center',
    display: 'flex',
    marginVertical: SPACE.LG * 2,
  },
});
