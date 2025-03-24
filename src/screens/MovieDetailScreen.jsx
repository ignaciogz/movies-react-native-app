import React from 'react';
import { ScrollView, StatusBar, StyleSheet, View } from 'react-native';

import AppButton from '../components/AppButton';

import { CONFIG } from '../global/config';
import { COLORS } from '../global/theme';
import MovieDetailCard from '../components/MovieDetailCard';

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
            navigation.navigate('Cinema', {screen: 'Booking', params: {
              Title: movieData.title,
              BgImage: CONFIG.GET_IMAGE_PATH('w780', movieData.backdrop_path),
              PosterImage: CONFIG.GET_IMAGE_PATH('original', movieData.poster_path),
            }});
          }}
          title={"Seleccionar butacas"}
        />
      </View>
    </ScrollView>
  );
};

export default MovieDetailScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.BLACK,
    display: 'flex',
    flex: 1,
  },
  buttonContainer: {
    alignItems: 'center',
    display: 'flex',
  },
});
