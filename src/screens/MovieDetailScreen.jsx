import React from 'react';
import { Text, View, StyleSheet, ScrollView, StatusBar, ImageBackground, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import AppButton from '../components/AppButton';
import CloseButton from '../components/CloseButton';

import { CONFIG } from '../global/config';
import { BORDER_RADIUS, COLORS, FONTS, FONT_SIZE, SPACE } from '../global/theme';
import { formatMovieReleaseDate, formatMovieRuntime, formatMovieVotes } from '../utils/formatter';

const MovieDetailScreen = ({ navigation, route }) => {
  const movieData = route.params.data;

  const {
    votes_average,
    votes_count
  } = formatMovieVotes(movieData.vote_average, movieData.vote_count);

  return (
    <ScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      style={styles.container}
    >
      <StatusBar hidden />

      <View>
        <ImageBackground
          source={{
            uri: CONFIG.GET_IMAGE_PATH('w780', movieData.backdrop_path),
          }}
          style={styles.imageBG}
        >
          <LinearGradient
            colors={[COLORS.BLACK_RGB10, COLORS.BLACK]}
            style={styles.linearGradient}
          >
            <View style={styles.headerContainer}>
              <CloseButton
                onPress={() => navigation.goBack()}
              />

              <View style={styles.runtimeBox}>
                <MaterialIcons
                  name="access-time"
                  size={FONT_SIZE.ICON}
                  color={COLORS.WHITE}
                />
                <Text style={styles.runtimeText}>
                  {formatMovieRuntime(movieData.runtime)}
                </Text>
              </View>
            </View>
          </LinearGradient>
        </ImageBackground>
        <View style={styles.imageBG}></View>
        <Image
          source={{uri: CONFIG.GET_IMAGE_PATH('w342', movieData.poster_path)}}
          style={styles.cardImage}
        />
      </View>

      {/* GENEROS */ }
      <View>
        <Text style={styles.title}>{movieData.title}</Text>
        <View style={styles.genreContainer}>
          {movieData.genres.map((item, index) => {
            return (
              <View key={index} style={styles.genreBox}>
                  <Text style={styles.genreText}>{item}</Text>
                </View>
            );
          })}
        </View>
      </View>

      {/* ESTRELLA VOTOS y FECHA DE ESTRENO */ }
      <View style={styles.infoContainer}>
        <View style={styles.rateContainer}>
          <Ionicons
            name="star"
            size={FONT_SIZE.ICON}
            color={COLORS.YELLOW}
          />
          <Text style={styles.votesText}>
            <Text style={styles.votesAverageText}>{votes_average}</Text>
            <Text>{votes_count}</Text>
          </Text>
        </View>

        <Text style={styles.release}>
          {formatMovieReleaseDate(movieData.release_date)}
        </Text>

        <Text style={styles.descriptionText}>{movieData.overview}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <AppButton
          onPress={() => {
            navigation.navigate('Booking', {
              BgImage: CONFIG.GET_IMAGE_PATH('w780', movieData.backdrop_path),
              PosterImage: CONFIG.GET_IMAGE_PATH('original', movieData.poster_path),
            });
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
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: SPACE.MD,
    justifyContent: 'space-between',
    marginHorizontal: SPACE.LG * 3,
    marginTop: SPACE.LG * 3.5,
  },
  imageBG: {
    aspectRatio: 3072 / 1727,
    width: '100%',
  },
  linearGradient: {
    height: '100%',
  },
  cardImage: {
    alignSelf: 'center',
    aspectRatio: 200 / 300,
    bottom: 0,
    position: 'absolute',
    width: '60%',
  },
  runtimeBox: {
    alignItems: 'center',
    backgroundColor: COLORS.GREY,
    borderRadius: BORDER_RADIUS.MD * 2.5,
    display: 'flex',
    flexDirection: 'row',
    gap: SPACE.MD,
    justifyContent: 'space-between',
    paddingVertical: SPACE.MD,
    paddingHorizontal: SPACE.LG * 1.5,
  },
  runtimeText: {
    color: COLORS.WHITE,
    fontFamily: FONTS.TEXT,
    fontSize: FONT_SIZE.TEXT_LG,
  },
  title: {
    color: COLORS.WHITE,
    fontFamily: FONTS.TEXT,
    fontSize: FONT_SIZE.MOVIE_TITLE,
    marginHorizontal: SPACE.LG * 3,
    marginVertical: SPACE.LG * 1.2,
    textAlign: 'center',
  },
  genreContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACE.SM,
    justifyContent: 'center',
  },
  genreBox: {
    backgroundColor: COLORS.GREY,
    borderRadius: BORDER_RADIUS.MD * 2.5,
    borderWidth: 1,
    paddingVertical: SPACE.MD,
    paddingHorizontal: SPACE.LG * 1.5,
  },
  genreText: {
    color: COLORS.WHITE,
    fontFamily: FONTS.TEXT,
    fontSize: FONT_SIZE.TEXT_SM,
  },
  release: {
    color: COLORS.WHITE,
    fontFamily: FONTS.TEXT,
    fontSize: FONT_SIZE.TEXT_SM,
    fontStyle: 'italic',
    marginHorizontal: SPACE.LG * 3,
    marginVertical: SPACE.LG * 1.2,
    textAlign: 'center',
  },
  infoContainer: {
    marginHorizontal: SPACE.LG * 3,
    marginVertical: SPACE.LG * 1.2
  },
  rateContainer: {
    flexDirection: 'row',
    gap: SPACE.MD,
    justifyContent: 'center'
  },
  descriptionText: {
    color: COLORS.WHITE,
    fontFamily: FONTS.TEXT,
    fontSize: FONT_SIZE.TEXT,
  },
  votesText: {
    color: COLORS.WHITE,
    fontFamily: FONTS.TEXT,
    fontSize: FONT_SIZE.TEXT_LG,
  },
  votesAverageText: {
    color: COLORS.YELLOW,
    fontWeight: 'bold',
    marginRight: SPACE.MD,
  },
});
