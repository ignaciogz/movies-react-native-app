import React, { useState } from 'react';
import { Dimensions, FlatList, StatusBar, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import MovieCard from '../components/MovieCard';
import SearchBox from '../components/SearchBox';

import { COLORS, FONTS, FONT_SIZE, SPACE } from '../global/theme';

import genresList from '../global/data/genres.json';
import nowPlaying from '../global/data/nowplaying.json';

const {width, height} = Dimensions.get('window');

const SearchScreen = ({ navigation, route }) => {
  const [nowPlayingMoviesData, setNowPlayingMoviesData] = useState(nowPlaying);
  const [genresData, setGenresData] = useState(genresList);
  const initialSearchValue = route.params?.initialSearchValue || '';
  const initialSearchResults = route.params?.searchResults || nowPlayingMoviesData;
  const [searchResults, setSearchResults] = useState(initialSearchResults);

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

      setSearchResults(results);
    } else {
      setSearchResults(nowPlayingMoviesData);
    }
  };

  return (
    <LinearGradient
      colors={[COLORS.ROSE, COLORS.BLACK]}
      locations={[0.3, 0.7]}
      style={styles.linearGradient}
    >
      <View style={styles.container}>
        <StatusBar hidden />

        <View style={styles.searchBoxContainer}>
          <SearchBox
            initialSearchValue={initialSearchValue}
            searchFunction={searchMoviesFunction}
          />
        </View>

        {searchResults.length ? (
          <FlatList
            data={searchResults}
            keyExtractor={(item) => item.id}
            bounces={false}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.searchResultsContainer}
            renderItem={({ item }) => {
              let movieData = {
                ...item,
                genres: getMovieGenresSorted(item),
              }

              return (
                <MovieCard
                  cardFunction={() => {
                    navigation.navigate('Movies', { screen: 'MovieDetail', params: {
                      movieData
                    }});
                  }}
                  cardWidth={width / 2 - SPACE.LG * 2}
                  movieData={movieData}
                  showDataOf={'Search'}
                  withMarginAround={true}
                  withMarginAtEnd={false}
                />
              );
            }}
          />
        ) : (
          <Text style={styles.searchResultsEmpty}>No se encontraron coincidencias</Text>
        )}
      </View>
    </LinearGradient>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    width,
  },
  linearGradient: {
    height: '100%',
  },
  searchBoxContainer: {
    marginBottom: SPACE.LG * 2.5,
    marginHorizontal: SPACE.LG * 3,
    marginTop: SPACE.LG * 5,
  },
  searchResultsContainer: {
    alignItems: 'center',
    gap: SPACE.LG * 3,
  },
  searchResultsEmpty: {
    color: COLORS.WHITE,
    fontFamily: FONTS.TEXT_BLACK,
    fontSize: FONT_SIZE.TEXT_LG,
    letterSpacing: 0.5,
    textAlign: 'center',
  },
});
