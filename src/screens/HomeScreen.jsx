import React, { useState } from 'react';
import { Dimensions, FlatList, View, ScrollView, StatusBar, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import MovieCard from '../components/MovieCard';
import SearchBox from '../components/SearchBox';

import { CONFIG } from '../global/config';
import { COLORS, SPACE } from '../global/theme';

import genresList from '../global/data/genres.json';
import nowPlaying from '../global/data/nowplaying.json';

const { width, height } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const [nowPlayingMoviesData, setNowPlayingMoviesData] = useState(nowPlaying);
  const [genresData, setGenresData] = useState(genresList);

  const searchMoviesFunction = () => {
    navigation.navigate('Search');
  };

  const getMovieGenresSorted = (genres_ids) => {
    return genres_ids.slice(0, 3).map((genre_id) => genresData[genre_id]).sort();
  };

  return (
    <LinearGradient
      colors={[COLORS.VIOLET_LIGHT, COLORS.BLACK]}
      locations={[0.3, 0.7]}
      style={styles.linearGradient}
    >
      <ScrollView style={styles.container} bounces={false}>
        <StatusBar hidden />

        <View style={styles.searchBoxContainer}>
          <SearchBox searchFunction={searchMoviesFunction} />
        </View>

        <FlatList
          data={nowPlayingMoviesData}
          keyExtractor={(item) => item.id}
          bounces={false}
          snapToInterval={width * 0.7 + SPACE.LG * 3}
          horizontal
          showsHorizontalScrollIndicator={false}
          decelerationRate={0}
          contentContainerStyle={styles.nowPlayingContainer}
          renderItem={({item, index}) => {
            let movieData = {
              ...item,
              genres: getMovieGenresSorted(item.genre_ids),
            }

            return (
              <MovieCard
                cardFunction={() => {
                  navigation.navigate('MovieDetail', { movieData });
                }}
                cardWidth={width * 0.7}
                isFirst={index == 0 ? true : false}
                isLast={index == nowPlayingMoviesData?.length - 1 ? true : false}
                movieData={movieData}
                withMarginAtEnd={true}
              />
            );
          }}
        />
      </ScrollView>
    </LinearGradient>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    paddingBottom: SPACE.LG *2,
  },
  linearGradient: {
    height: '100%',
  },
  nowPlayingContainer: {
    gap: SPACE.LG * 3,
    marginTop: SPACE.LG * 5,
  },
  searchBoxContainer: {
    marginHorizontal: SPACE.LG * 3,
    marginTop: SPACE.LG * 5,
  }
});
