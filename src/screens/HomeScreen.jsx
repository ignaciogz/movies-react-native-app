import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, ScrollView,StatusBar, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';

import MovieCard from '../components/MovieCard';
import SearchBox from '../components/SearchBox';
import { setSelectedMovie } from '../features/cinema/cinemaSlice';
import { clearSearchText } from '../features/search/searchSlice';
import { useGetMoviesQuery, useGetMovieGenresQuery } from '../services/cinemaService';

import { COLORS, SPACE } from '../global/theme';

const { width, height } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [nowPlayingMovies, setNowPlayingMovies] = useState();
  const {data: moviesData, error: errorMovies, isLoading: isLoadingMovies} = useGetMoviesQuery();
  const {data: movieGenresData, error: errorMovieGenres, isLoading: isLoadingMovieGenres} = useGetMovieGenresQuery();

  useEffect(() => {
    dispatch(clearSearchText());
  }, []);

  useEffect(() => {
    if(!isLoadingMovies && !isLoadingMovieGenres) {
      const movies = moviesData.map((movie) => {
        return {
          ...movie,
          genres: getMovieGenresSorted(movie),
        }
      });
      setNowPlayingMovies(movies);
    }
  }, [moviesData, isLoadingMovies, isLoadingMovieGenres]);

  const getMovieGenresSorted = (movie) => {
    return movie.genre_ids.slice(0, 3)
                            .map((genre_id) => movieGenresData[genre_id])
                            .sort();
  };

  const searchMoviesFunction = (searchText) => {
    if (searchText.length > 0) {
      navigation.navigate('MovieSearch', { screen: 'Search'});
    }
  };

  return (
    <LinearGradient
      colors={[COLORS.VIOLET_LIGHT, COLORS.BLACK]}
      locations={[0.3, 0.7]}
      style={styles.linearGradient}
    >
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={styles.container}
      >
        <StatusBar hidden />

        <View style={styles.searchBoxContainer}>
          <SearchBox searchFunction={searchMoviesFunction} />
        </View>

        <FlatList
          data={nowPlayingMovies}
          keyExtractor={(item) => item.id}
          bounces={false}
          snapToInterval={width * 0.8 + SPACE.LG * 3}
          horizontal
          showsHorizontalScrollIndicator={false}
          decelerationRate={0}
          contentContainerStyle={styles.nowPlayingContainer}
          renderItem={({item, index}) => {
            return (
              <MovieCard
                cardFunction={() => {
                  dispatch(setSelectedMovie(item));
                  navigation.navigate('MovieDetail', { movieData: item });
                }}
                cardWidth={width * 0.75}
                isFirst={index == 0 ? true : false}
                isLast={index == nowPlayingMovies?.length - 1 ? true : false}
                movieData={item}
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
    marginTop: SPACE.LG * 5,
  },
});
