import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import AppLabel from '../components/AppLabel';

import { BORDER_RADIUS, COLORS, FONTS, FONT_SIZE, SPACE } from '../global/theme';
import { formatMovieReleaseDate, formatMovieRuntime  } from '../utils/formatter';

const MovieCard = (props) => {
  return (
    <TouchableOpacity onPress={() => props.cardFunction()}>
      <View
        style={[
          styles.container,
          props.withMarginAtEnd
            ? props.isFirst
              ? {marginLeft: SPACE.LG * 3}
              : props.isLast
              ? {marginRight: SPACE.LG * 3}
              : {}
            : {},
          props.withMarginAround ? {margin: SPACE.SM } : {},
          {maxWidth: props.cardWidth},
        ]}>

        <Image
          style={[styles.cardImage, {width: props.cardWidth}]}
          source={{uri: props.imagePath}}
        />

        <View>
          <View style={styles.runtimeContainer}>
            <AppLabel
              title={formatMovieRuntime(props.runtime)}
              bgColor={"transparent"}
              fontSize={FONT_SIZE.TEXT_LG}
              icon="access-time"
              iconOrigin="MaterialIcons"
            />
          </View>

          <Text numberOfLines={1} style={styles.titleText}>
            {props.title}
          </Text>

          <View style={styles.genreContainer}>
            {props.genres.map((genre, index) => {
              return (
                <AppLabel key={index}
                  title={genre}
                  fontSize={FONT_SIZE.TEXT_SM}
                />
              );
            })}
          </View>

          <Text style={styles.release}>
            {formatMovieReleaseDate(props.releaseDate)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MovieCard;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
  },
  cardImage: {
    aspectRatio: 2 / 3,
    borderRadius: BORDER_RADIUS.MD * 2,
  },
  runtimeContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: SPACE.MD,
    justifyContent: 'center',
    marginTop: SPACE.LG,
  },
  genreContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACE.SM,
    justifyContent: 'center',
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
  titleText: {
    color: COLORS.WHITE,
    fontFamily: FONTS.TEXT,
    fontSize: FONT_SIZE.MOVIE_TITLE,
    paddingVertical: SPACE.LG,
    textAlign: 'center',
  },
});
