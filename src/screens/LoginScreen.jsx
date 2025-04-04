import React, { useEffect, useState } from 'react';
import { Dimensions, ImageBackground, StatusBar, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';

import AppButton from '../components/AppButton';
import AppInputForm from '../components/AppInputForm';
import { setUser } from '../features/user/userSlice';
import useAppModal from '../hooks/useAppModal';
import { useSignInMutation } from '../services/authService';
import { signinSchema } from '../validations/signinSchema';

import { COLORS, FONT_SIZE, FONTS, SPACE } from '../global/theme';

const { width, height } = Dimensions.get('window');

const Login = ({ navigation }) => {
  const { AppModal, showAppModal } = useAppModal();
  const dispatch = useDispatch();
  const [triggerSignIn, result] = useSignInMutation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');

  useEffect(() => {
    if (result.isSuccess) {
      dispatch(setUser({
        email: result.data.email,
        idToken: result.data.idToken,
        localId: result.data.localId,
      }));
    } else if(result.isError) {
      showAppModal('error', `Usuario o contraseña incorrectos`);
    };
  }, [result]);

  const signIn = () => {
    try {
      setErrorEmail('');
      setErrorPassword('');
      signinSchema.validateSync({
        email, password,
      });
      triggerSignIn({ email, password });
    } catch (err) {
      switch(err.path) {
        case 'email':
          setErrorEmail(err.message);
          break;
        case 'password':
          setErrorPassword(err.message);
          break;
      }
    }
  }

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
            error={errorEmail}
          />
          <AppInputForm
            label={"contraseña"}
            onChange={setPassword}
            error={errorPassword}
            isSecure={true}
          />

          <View style={styles.authButtonsContainer}>
            <AppButton
              onPress={signIn}
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
