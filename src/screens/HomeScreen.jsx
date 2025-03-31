import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, ScrollView,StatusBar, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';

import MovieCard from '../components/MovieCard';
import SearchBox from '../components/SearchBox';
import { clearSearchText } from '../features/search/searchSlice';

import { COLORS, SPACE } from '../global/theme';

import genresList from '../global/data/genres.json';
import nowPlaying from '../global/data/nowplaying.json';

const { width, height } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [nowPlayingMoviesData, setNowPlayingMoviesData] = useState(nowPlaying);
  const [genresData, setGenresData] = useState(genresList);

  useEffect(() => {
    dispatch(clearSearchText());
  }, []);

  const getMovieGenresSorted = (movie) => {
    return movie.genre_ids.slice(0, 3)
                            .map((genre_id) => genresData[genre_id])
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
                cardWidth={width * 0.75}
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
    marginTop: SPACE.LG * 5,
  },
});
