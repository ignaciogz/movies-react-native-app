import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import AppLabel from '../components/AppLabel';

import { COLORS, FONTS, FONT_SIZE, SPACE } from '../global/theme';
import { formatMovieReleaseDate, formatMovieRuntime, formatMovieVotes } from '../utils/formatter';

const MovieFooterCard = ({
    movieData = {},
    showDataOf = "home",
  }) => {

  const {
    votes_average,
    votes_count
  } = formatMovieVotes(movieData.vote_average, movieData.vote_count);

  const showDataOfHome = showDataOf.toUpperCase() === "HOME";
  const showDataOfDetail = showDataOf.toUpperCase() === "DETAIL";
  const showDataOfSearch = showDataOf.toUpperCase() === "SEARCH";

  return (
    showDataOfSearch
      ? <View>
          <Text
              numberOfLines={1}
              style={[styles.titleContainer, { marginTop: SPACE.LG }]}
            >
              {movieData.title}
          </Text>
        </View>
      : <View>
          {
            showDataOfHome
              ? <View style={styles.runtimeContainer}>
                  <AppLabel
                    title={formatMovieRuntime(movieData.runtime)}
                    bgColor={"transparent"}
                    fontSize={FONT_SIZE.TEXT_LG}
                    icon="access-time"
                    iconOrigin="MaterialIcons"
                  />
                </View>
              : null
          }

          <Text
            numberOfLines={showDataOfHome ? 1 : 2}
            style={[styles.titleContainer, { marginTop: showDataOfHome ? SPACE.LG : SPACE.LG * 2 }]}
          >
            {movieData.title}
          </Text>

          <View style={styles.genreContainer}>
            {movieData.genres.map((genre, index) => {
              return (
                <AppLabel key={index}
                  title={genre}
                  fontSize={FONT_SIZE.TEXT_SM}
                />
              );
            })}
          </View>

          {
            showDataOfDetail
              ? <View style={styles.votesContainer}>
                  <AppLabel
                    bgColor={"transparent"}
                    fontSize={FONT_SIZE.TEXT_LG}
                    icon="star"
                    iconOrigin="Ionicons"
                    iconColor={COLORS.YELLOW}
                  >
                    <Text style={styles.votesAverageText}>{votes_average}</Text>
                    <Text style={styles.votesCountText}>{votes_count}</Text>
                  </AppLabel>
                </View>
              : null
          }

          <Text style={[styles.releaseContainer, { marginTop: showDataOfHome ? SPACE.LG * 1.4 : SPACE.MD }]}>
            {formatMovieReleaseDate(movieData.release_date)}
          </Text>

          {
            showDataOfDetail
              ? <Text style={styles.descriptionContainer}>
                  {movieData.overview}
                </Text>
              : null
          }
        </View>
  );
};

export default MovieFooterCard;

const styles = StyleSheet.create({
  descriptionContainer: {
    color: COLORS.WHITE,
    fontFamily: FONTS.TEXT,
    fontSize: FONT_SIZE.TEXT,
    letterSpacing: 0.5,
    marginHorizontal: SPACE.LG * 3,
    marginTop: SPACE.LG * 1.2,
  },
  genreContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACE.SM,
    justifyContent: 'center',
    marginTop: SPACE.LG * 1.4,
  },
  releaseContainer: {
    color: COLORS.WHITE,
    fontFamily: FONTS.TEXT_ITALIC,
    fontSize: FONT_SIZE.TEXT_SM,
    letterSpacing: 0.5,
    marginHorizontal: SPACE.LG * 3,
    textAlign: 'center',
  },
  runtimeContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: SPACE.MD,
    justifyContent: 'center',
    marginTop: SPACE.LG,
  },
  titleContainer: {
    color: COLORS.WHITE,
    fontFamily: FONTS.TEXT,
    fontSize: FONT_SIZE.MOVIE_TITLE,
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  votesAverageText: {
    color: COLORS.YELLOW,
    fontFamily: FONTS.TEXT_BOLD,
  },
  votesContainer: {
    flexDirection: 'row',
    gap: SPACE.MD,
    justifyContent: 'center',
    marginTop: SPACE.MD,
  },
  votesCountText: {
    color: COLORS.WHITE,
    fontFamily: FONTS.TEXT,
  },
});
