import React from 'react';
import { Image, ImageBackground, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import AppCircleButton from './AppCircleButton';
import AppLabel from './AppLabel';
import MovieFooterCard from './MovieFooterCard';

import { CONFIG } from '../global/config';
import { COLORS, FONT_SIZE, SPACE } from '../global/theme';
import { formatMovieRuntime } from '../utils/formatter';

const MovieDetailCard = ({ movieData, navigation }) => {
  return (
    <>
      <View>
        <ImageBackground
          source={{
            uri: CONFIG.GET_IMAGE_PATH('w780', movieData.backdrop_path),
          }}
          style={styles.cardImageBackground}
        >
          <LinearGradient
            colors={[COLORS.BLACK_RGB10, COLORS.BLACK]}
            style={styles.linearGradient}
          >
            <View style={styles.cardTopBar}>
              <AppCircleButton
                onPress={() => navigation.goBack()}
                icon="close-circle-outline"
                iconOrigin="IonIcons"
              />

              <AppLabel
                title={formatMovieRuntime(movieData.runtime)}
                fontSize={FONT_SIZE.TEXT_LG}
                icon="access-time"
                iconOrigin="MaterialIcons"
              />
            </View>
          </LinearGradient>
        </ImageBackground>

        <View style={styles.cardImageBackground}></View>

        <Image
          source={{uri: CONFIG.GET_IMAGE_PATH('w342', movieData.poster_path)}}
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
  },
  cardTopBar: {
    display: 'flex',
    flexDirection: 'row',
    gap: SPACE.MD,
    justifyContent: 'space-between',
    marginHorizontal: SPACE.LG * 3,
    marginTop: SPACE.LG * 3.5,
  },
  linearGradient: {
    height: '100%',
  },
});
