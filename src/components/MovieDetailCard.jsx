import React from 'react';
import { Image, ImageBackground, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import AppHeaderTopBar from './AppHeaderTopBar';
import AppLabel from './AppLabel';
import MovieFooterCard from './MovieFooterCard';
import { getImagePathToApi } from '../services/tmdbService';

import { COLORS, FONT_SIZE, SPACE } from '../global/theme';
import { formatMovieRuntime } from '../utils/formatter';

const MovieDetailCard = ({ movieData, navigation }) => {
  return (
    <>
      <View>
        <ImageBackground
          source={{
            uri: getImagePathToApi('w780', movieData?.backdrop_path),
          }}
          style={styles.cardImageBackground}
        >
          <LinearGradient
            colors={[COLORS.BLACK_RGB10, COLORS.BLACK]}
            style={styles.linearGradient}
          >
            <AppHeaderTopBar marginHorizontal={SPACE.LG * 3} navigation={navigation}>
              <AppLabel
                title={formatMovieRuntime(movieData?.runtime)}
                fontSize={FONT_SIZE.TEXT_LG}
                icon="access-time"
                iconOrigin="MaterialIcons"
              />
            </AppHeaderTopBar>
          </LinearGradient>
        </ImageBackground>

        <View style={styles.cardImageBackground}></View>

        <Image
          source={{
            uri: getImagePathToApi('w342', movieData?.poster_path)
          }}
          style={styles.cardImage}
        />
      </View>

      <MovieFooterCard movieData={movieData} showDataOf="Detail" />
    </>
  );
};

export default MovieDetailCard;

const styles = StyleSheet.create({
  cardImage: {
    alignSelf: 'center',
    aspectRatio: 200 / 300,
    bottom: 0,
    position: 'absolute',
    width: '60%',
  },
  cardImageBackground: {
    aspectRatio: 3072 / 1727,
    width: '100%',
    marginBottom: SPACE.SM,
  },
  linearGradient: {
    height: '100%',
  },
});
