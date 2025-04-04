import React, { useEffect, useState } from 'react';
import { Dimensions, ImageBackground, StatusBar, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';

import AppButton from '../components/AppButton';
import AppInputForm from '../components/AppInputForm';
import { setUser } from '../features/user/userSlice';
import useAppModal from '../hooks/useAppModal';
import { useSignUpMutation } from '../services/authService';
import { signupSchema } from '../validations/signupSchema';

import { COLORS, FONT_SIZE, FONTS, SPACE } from '../global/theme';

const { width, height } = Dimensions.get('window');

const Signup = ({ navigation }) => {
  const { AppModal, showAppModal } = useAppModal();
  const dispatch = useDispatch();
  const [triggerSignUp, result] = useSignUpMutation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [errorConfirmPassword, setErrorConfirmPassword] = useState('');

  useEffect(() => {
    if(result.isSuccess) {
      dispatch(setUser({
        email: result.data.email,
        idToken: result.data.idToken,
        localId: result.data.localId,
      }));
    } else if(result.isError) {
      showAppModal('error', `Error al registrar el nuevo usuario`);
    };
  }, [result]);

  const signUp = () => {
    try {
      setErrorEmail('');
      setErrorPassword('');
      setErrorConfirmPassword('');
      signupSchema.validateSync({
        email, password, confirmPassword
      });
      triggerSignUp({ email, password, returnSecureToken: true });
    } catch (err) {
      switch(err.path) {
        case 'email':
          setErrorEmail(err.message);
          break;
        case 'password':
          setErrorPassword(err.message);
          break;
        case 'confirmPassword':
          setErrorConfirmPassword(err.message);
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
          <Text style={styles.titleContainer}>NUEVO USUARIO</Text>

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
          <AppInputForm
            label={"confirmar contraseña"}
            onChange={setConfirmPassword}
            error={errorConfirmPassword}
            isSecure={true}
          />

          <View style={styles.authButtonsContainer}>
            <AppButton
              onPress={signUp}
              title={"Registrarme"}
            />

            <AppButton
              onPress={() => { navigation.navigate('Login') }}
              title={"Volver"}
              startColor={COLORS.GREY}
              endColor={COLORS.BLACK}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

export default Signup;


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
