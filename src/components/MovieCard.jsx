import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { BORDER_RADIUS, COLORS, FONTS, FONT_SIZE, SPACE } from '../global/theme';

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
            <MaterialIcons
              name="access-time"
              size={FONT_SIZE.ICON}
              color={COLORS.WHITE}
            />
            <Text style={styles.runtimeText}>
              {props.duration}
            </Text>
          </View>

          <Text numberOfLines={1} style={styles.titleText}>
            {props.title}
          </Text>

          <View style={styles.genreContainer}>
            {props.genres.map((item, index) => {
              return (
                <View key={index} style={styles.genreBox}>
                  <Text style={styles.genreText}>{item}</Text>
                </View>
              );
            })}
          </View>
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
  runtimeText: {
    color: COLORS.WHITE,
    fontFamily: FONTS.TEXT,
    fontSize: FONT_SIZE.TEXT,
    lineHeight: FONT_SIZE.ICON,
  },
  genreContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACE.MD,
    justifyContent: 'center',
  },
  genreBox: {
    backgroundColor: COLORS.GREY,
    borderRadius: BORDER_RADIUS.MD * 2.5,
    borderWidth: 1,
    paddingVertical: SPACE.MD,
    paddingHorizontal: SPACE.LG * 1.5,
  },
  genreText: {
    color: COLORS.WHITE,
    fontFamily: FONTS.TEXT,
    fontSize: FONT_SIZE.TEXT_SM,
  },
  titleText: {
    color: COLORS.WHITE,
    fontFamily: FONTS.TEXT,
    fontSize: FONT_SIZE.MOVIE_TITLE,
    paddingVertical: SPACE.LG,
    textAlign: 'center',
  },
});
