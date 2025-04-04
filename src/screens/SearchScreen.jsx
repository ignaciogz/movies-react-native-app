import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, StatusBar, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';

import MovieCard from '../components/MovieCard';
import SearchBox from '../components/SearchBox';
import { setSelectedMovie } from '../features/cinema/cinemaSlice';
import { useGetMoviesQuery, useGetMovieGenresQuery } from '../services/cinemaService';

import { COLORS, FONT_SIZE, FONTS, SPACE } from '../global/theme';

const { width, height } = Dimensions.get('window');

const SearchScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [searchResults, setSearchResults] = useState([]);
  const searchText = useSelector((state) => state.search.searchText);
  const {data: moviesData, error: errorMovies, isLoading: isLoadingMovies} = useGetMoviesQuery();
  const {data: movieGenresData, error: errorMovieGenres, isLoading: isLoadingMovieGenres} = useGetMovieGenresQuery();
  const [nowPlayingMovies, setNowPlayingMovies] = useState(moviesData);

  useEffect(() => {
    searchText.length === 0 && setSearchResults(nowPlayingMovies);
  }, [searchText]);

  useEffect(() => {
    if(!isLoadingMovies && !isLoadingMovieGenres) {
      const movies = moviesData.map((movie) => {
        return {
          ...movie,
          genres: getMovieGenresSorted(movie),
        }
      });
      setNowPlayingMovies(movies);
      searchText ? searchMoviesFunction(searchText) : setSearchResults(movies);
    }
  }, [moviesData, isLoadingMovies, isLoadingMovieGenres]);

  const getMovieGenresSorted = (movie) => {
    return movie.genre_ids.slice(0, 3)
                            .map((genre_id) => movieGenresData[genre_id])
                            .sort();
  };

  const searchMoviesFunction = (searchText) => {
    if (searchText.length > 0) {
      const results = nowPlayingMovies.filter((movieData) =>
        movieData.title.toLowerCase().includes(searchText.toLowerCase())
      );
      setSearchResults(results);
    }
  };

  return (
    <LinearGradient
      colors={[COLORS.ORANGE, COLORS.BLACK]}
      locations={[0.3, 0.7]}
      style={styles.linearGradient}
    >
      <View style={styles.container}>
        <StatusBar hidden />

        <View style={styles.searchBoxContainer}>
          <SearchBox
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
              return (
                <MovieCard
                  cardFunction={() => {
                    dispatch(setSelectedMovie(item));
                    navigation.navigate('MovieDetail', { movieData: item })
                  }}
                  cardWidth={width / 2 - SPACE.LG * 2}
                  movieData={item}
                  showDataOf={'Search'}
                  withMarginAround={true}
                  withMarginAtEnd={false}
                />
              );
            }}
          />
        ) : (
          <Text style={styles.resultsEmpty}>No se encontraron coincidencias</Text>
        )}
      </View>
    </LinearGradient>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  linearGradient: {
    height: '100%',
  },
  resultsEmpty: {
    color: COLORS.WHITE,
    fontFamily: FONTS.TEXT_BLACK,
    fontSize: FONT_SIZE.TEXT_LG,
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  searchBoxContainer: {
    marginBottom: SPACE.LG * 2.5,
    marginTop: SPACE.LG * 4,
  },
  searchResultsContainer: {
    alignItems: 'center',
    gap: SPACE.LG * 3,
    marginBottom: SPACE.LG * 2.5,
  },
});
