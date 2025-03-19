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
  const [nowPlayingMoviesList, setNowPlayingMoviesList] = useState(nowPlaying);

  const searchMoviesFunction = () => {
    navigation.navigate('Search');
  };

  return (
    <LinearGradient
      colors={[COLORS.VIOLET_LIGHT, COLORS.BLACK]}
      locations={[0.3, 0.7]}
      style={styles.linearGradient}
    >
      <ScrollView style={styles.container} bounces={false}>
        <StatusBar hidden />

        <View style={styles.searchBoxHeaderContainer}>
          <SearchBox searchFunction={searchMoviesFunction} />
        </View>

        <FlatList
          data={nowPlayingMoviesList}
          keyExtractor={(item) => item.id}
          bounces={false}
          snapToInterval={width * 0.7 + SPACE.LG * 3}
          horizontal
          showsHorizontalScrollIndicator={false}
          decelerationRate={0}
          contentContainerStyle={styles.nowPlayingContainer}
          renderItem={({item, index}) => {
            return (
              <MovieCard
                cardFunction={() => {
                  navigation.navigate('MovieDetail', { movie_id: item.id });
                }}
                cardWidth={width * 0.7}
                duration={item.runtime}
                genres={item.genre_ids.slice(0, 3).map((genre_id) => genresList[genre_id]).sort()}
                imagePath={CONFIG.GET_IMAGE_PATH('w780', item.poster_path)}
                isFirst={index == 0 ? true : false}
                isLast={index == nowPlayingMoviesList?.length - 1 ? true : false}
                title={item.title}
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
    marginTop: SPACE.LG * 7,
  },
  searchBoxHeaderContainer: {
    marginHorizontal: SPACE.LG * 3,
    marginTop: SPACE.LG * 5,
  }
});
