import React from 'react';
import { Image, StatusBar, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';

import AppButton from '../components/AppButton';
import AppHeaderTopBar from '../components/AppHeaderTopBar';
import { clearUser } from '../features/user/userSlice';
import { useGetProfileImageQuery } from '../services/cinemaService';

import { BORDER_RADIUS, COLORS, FONT_SIZE, FONTS, SPACE } from '../global/theme';

const defaultImageRoute = "../assets/images/defaultProfile.png";

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const {imageCamera, localId, user} = useSelector((state) => state.user.value);
  const {data: imageFromFirebase} = useGetProfileImageQuery(localId);

  const changeProfileImage = () => {
    navigation.navigate('ImageSelector');
  }

  const signOut = () => {
    dispatch(clearUser());
  }

  return (
    <LinearGradient
      colors={[COLORS.RED, COLORS.BLACK]}
      locations={[0.3, 0.7]}
      style={styles.linearGradient}
    >
      <View style={styles.container}>
        <StatusBar hidden />

        <View>
          <AppHeaderTopBar buttonType="return" navigation={navigation} />

          {imageFromFirebase || imageCamera ? (
            <Image
              resizeMode="cover"
              source={{ uri: imageFromFirebase?.image || imageCamera }}
              style={styles.profileImage}
            />
          ) : (
            <Image
              resizeMode="cover"
              source={require(defaultImageRoute)}
              style={styles.profileImage}
            />
          )}
          <Text style={styles.profileText}>{user || "fake@email.com"}</Text>

          <View style={styles.profileOptions}>
            <AppButton
              title="Cambiar imagen de perfil"
              onPress={changeProfileImage}
              startColor={COLORS.GREY}
            />
          </View>
        </View>

        <View style={styles.profileFooter}>
          <AppButton
            title="Cerrar sesion"
            onPress={signOut}
            startColor={COLORS.RED}
          />
        </View>
      </View>
    </LinearGradient>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    marginHorizontal: SPACE.LG * 2,
  },
  linearGradient: {
    height: '100%',
  },
  profileFooter: {
    marginVertical: SPACE.LG * 1.5,
    width: '100%',
  },
  profileImage: {
    alignSelf: 'center',
    borderRadius: BORDER_RADIUS.ROUND,
    height: 140,
    width: 140,
  },
  profileOptions: {
    flex: 1,
    gap: SPACE.XS * 5,
    marginTop: SPACE.LG * 2,
  },
  profileText: {
    color: COLORS.WHITE,
    fontFamily: FONTS.TEXT_BOLD,
    fontSize: FONT_SIZE.TITLE,
    letterSpacing: 0.5,
    marginTop: SPACE.LG,
    textAlign: 'center',
  },
});
