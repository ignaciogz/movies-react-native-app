import React, { useState } from 'react';
import { Dimensions, FlatList, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import MovieCard from '../components/MovieCard';
import SearchBox from '../components/SearchBox';

import { COLORS, SPACE } from '../global/theme';

import genresList from '../global/data/genres.json';
import nowPlaying from '../global/data/nowplaying.json';

const { width, height } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const [nowPlayingMoviesData, setNowPlayingMoviesData] = useState(nowPlaying);
  const [genresData, setGenresData] = useState(genresList);

  const getMovieGenresSorted = (movie) => {
    return movie.genre_ids.slice(0, 3)
                            .map((genre_id) => genresData[genre_id])
                            .sort();
  };

  const searchMoviesFunction = (searchText) => {
    if (searchText.length) {
      const results = nowPlayingMoviesData.filter((movieData) =>
        movieData.title.toLowerCase().includes(searchText.toLowerCase())
      );

      navigation.navigate('MovieSearch', { screen: 'Search', params: {
        initialSearchValue: searchText,
        searchResults: results,
      }});
    } else {
      navigation.navigate('MovieSearch', { screen: 'Search', params: {
        searchResults: nowPlayingMoviesData,
      }});
    }
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
          snapToInterval={width * 0.8 + SPACE.LG * 3}
          horizontal
          showsHorizontalScrollIndicator={false}
          decelerationRate={0}
          contentContainerStyle={styles.nowPlayingContainer}
          renderItem={({item, index}) => {
            let movieData = {
              ...item,
              genres: getMovieGenresSorted(item),
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
                showDataOf={"Home"}
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
    flex: 1,
  },
  linearGradient: {
    height: '100%',
  },
  nowPlayingContainer: {
    gap: SPACE.LG * 3,
    marginTop: SPACE.LG * 2.5,
  },
  searchBoxContainer: {
    marginHorizontal: SPACE.LG * 3,
    marginTop: SPACE.LG * 5,
  },
});
