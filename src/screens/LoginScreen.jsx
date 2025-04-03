import React, { useEffect, useState } from 'react';
import { Dimensions, ImageBackground, StatusBar, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
// import { useDispatch } from 'react-redux';

import AppButton from '../components/AppButton';
import AppInputForm from '../components/AppInputForm';
// import { setUser } from '../features/user/UserSlice';
import useAppModal from '../hooks/useAppModal';
// import { useSignInMutation } from '../services/authService';

import { COLORS, FONT_SIZE, FONTS, SPACE } from '../global/theme';

const { width, height } = Dimensions.get('window');

const Login = ({ navigation }) => {
  const { AppModal, showAppModal } = useAppModal();
  // const dispatch = useDispatch();
  // const [triggerSignIn, result] = useSignInMutation();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  /* useEffect(() => {
    if (result.isSuccess) {
      (async () => {
        try {
          dispatch(
            setUser({
              email: result.data.email,
              idToken: result.data.idToken,
              localId: result.data.localId,
          }));
        } catch(err) {
          showAppModal('error', `Login function FAILED: ${err}`);
        }
      })();
    }
  }, [result]); */

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <AppModal />

      <View style={styles.backgroundImageContainer}>
        <ImageBackground
          source={require("../assets/images/backgroundAuth.jpg")}
          style={styles.backgroundImage}
        >
          <LinearGradient
            colors={["transparent", COLORS.BLACK]}
            style={styles.linearGradient}
          />
        </ImageBackground>

        <View style={styles.authContainer}>
          <Text style={styles.titleContainer}>BIENVENIDO</Text>

          <AppInputForm
            label={"email"}
            onChange={setEmail}
            error={""}
          />
          <AppInputForm
            label={"password"}
            onChange={setPassword}
            error={""}
            isSecure={true}
          />

          <View style={styles.authButtonsContainer}>
            <AppButton
              onPress={() => {
                //triggerSignIn({ email, password });
                console.log("login SUCCESS: ", email, password);
              }}
              title={"Ingresar"}
            />

            <AppButton
              onPress={() => { navigation.navigate('Signup') }}
              title={"Registrarse"}
              startColor={COLORS.GREY}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

export default Login;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.BLACK,
    flex: 1,
  },
  authContainer: {
    alignSelf: 'center',
    gap: SPACE.LG * 1.6,
    position: 'absolute',
    bottom: 0,
    transform: [
      { translateY: '50%' },
    ],
    width: width - SPACE.LG * 3 * 2,
  },
  authButtonsContainer: {
    gap: SPACE.LG * 1.2,
    marginTop: SPACE.LG * 1.2,
    width: '100%',
  },
  backgroundImage: {
    aspectRatio: 3072 / 1727,
    height: '100%',
    width: '100%',
  },
  backgroundImageContainer: {
    height: '50%',
  },
  linearGradient: {
    height: '100%',
  },
  titleContainer: {
    color: COLORS.WHITE,
    fontFamily: FONTS.TEXT_BOLD,
    fontSize: FONT_SIZE.TITLE_BIG,
    letterSpacing: 0.5,
    textAlign: 'center',
    wordSpacing: 2,
  },
});
