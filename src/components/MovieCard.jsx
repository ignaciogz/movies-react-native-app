import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import MovieFooterCard from './MovieFooterCard';

import { CONFIG } from '../global/config';
import { BORDER_RADIUS, SPACE } from '../global/theme';

const MovieCard = ({
    cardFunction = () => {},
    cardWidth = 70,
    isFirst = false,
    isLast = false,
    movieData = {},
    showDataOf = "Home",
    withMarginAround = false,
    withMarginAtEnd = false,
  }) => {

  return (
    <TouchableOpacity onPress={() => cardFunction()}>
      <View
        style={[
          styles.container,
          withMarginAtEnd
            ? isFirst
              ? { marginLeft: SPACE.LG * 3 }
              : isLast
              ? { marginRight: SPACE.LG * 3 }
              : {}
            : {},
          withMarginAround ? { margin: SPACE.SM } : {},
          { maxWidth: cardWidth },
        ]}>

        <Image
          style={[styles.cardImage, {width: cardWidth}]}
          source={{uri: CONFIG.GET_IMAGE_PATH('w780', movieData.poster_path)}}
        />

        <MovieFooterCard movieData={movieData} showDataOf={showDataOf} />
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
});
