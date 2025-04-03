import React, { useState } from 'react'
import { Image, StatusBar, StyleSheet, Text, View } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import * as MediaLibrary from 'expo-media-library';
import { useDispatch, useSelector } from 'react-redux';

import AppButton from '../components/AppButton';
import AppHeaderTopBar from '../components/AppHeaderTopBar';
import { setCameraImage } from '../features/user/userSlice';
import useAppModal from '../hooks/useAppModal';
import { useGetProfileImageQuery, usePostProfileImageMutation } from '../services/cinemaService';

import { BORDER_RADIUS, COLORS, FONT_SIZE, FONTS, SPACE } from '../global/theme';

const ImageSelectorScreen = ({ navigation }) => {
  const { AppModal, showAppModal } = useAppModal();
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [isImageFromCamera, setIsImageFromCamera] = useState(false);
  const [imageUri, setImageUri] = useState("");
  const {localId} = useSelector((state) => state.user.value);
  const {data: imageFromFirebase} = useGetProfileImageQuery(localId);
  const [triggerPostImage, result] = usePostProfileImageMutation();

  const verifyCameraPermissions = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    return granted;
  }

  const verifyGalleryPermissions = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    return granted;
  };

  const pickLibraryImage = async () => {
    try {
      setIsImageFromCamera(false)
      const galleryPermissions = await verifyGalleryPermissions();
      if(galleryPermissions) {
        const result = await ImagePicker.launchImageLibraryAsync({
          base64: true,
          allowsEditing: true,
          aspect: [1, 1],
          mediaTypes: (ImagePicker.MediaType = ["images"]),
          quality: 0.2,
        });

        if(!result.canceled){
          const image = `data:image/jpeg;base64,${result.assets[0].base64}`
          setImage(image);
        }
      }
    } catch(err) {
      showAppModal("error", `Error al seleccionar la imagen: ${err}`);
    }
  };

  const pickImage = async () => {
    setIsImageFromCamera(true);
    try {
      const cameraPermissions = await verifyCameraPermissions()
      if(cameraPermissions) {
        let result = await ImagePicker.launchCameraAsync({
          mediaTypes: (ImagePicker.MediaType = ['images', 'videos']),
          allowsEditing: true,
          aspect: [1, 1],
          base64: true,
          quality: 0.2,
        });

        if(!result.canceled) {
          setImageUri(result.assets[0].uri);
          const img = `data:image/jpg;base64,${result.assets[0].base64}`;
          setImage(img);
        }
      }
    } catch (err) {
      showAppModal("error", `Error al tomar la foto: ${err}`);
    }
  }

  const confirmImage = async () => {
    try {
      dispatch(setCameraImage(image));
      triggerPostImage({image, localId});

      if(isImageFromCamera) {
        await MediaLibrary.createAssetAsync(imageUri);
      }

      navigation.goBack();
    } catch(err) {
      showAppModal("error", `Error al confirmar la imagen: ${err}`);
    }
  };

  return (
    <LinearGradient
      colors={[COLORS.RED, COLORS.BLACK]}
      locations={[0.3, 0.7]}
      style={styles.linearGradient}
    >
      <View style={styles.container}>
        <StatusBar hidden />
        <AppModal />

        <AppHeaderTopBar buttonType="return" navigation={navigation} />

        {image || imageFromFirebase ? (
          <>
            <View style={styles.selectorHeader}>
              <Image source={{ uri: image || imageFromFirebase.image }} style={styles.selectorImage} />
              <View style={styles.selectorOptions}>
                <AppButton
                  title="Tomar otra foto"
                  onPress={pickImage}
                  startColor={COLORS.GREY}
                />
                <AppButton
                  title="Seleccionar de galeria"
                  onPress={pickLibraryImage}
                  startColor={COLORS.GREY}
                />
              </View>
            </View>
            <View style={styles.selectorFooter}>
              <AppButton
                title="Confirmar"
                onPress={confirmImage}
                startColor={COLORS.RED}
              />
            </View>
          </>
        ) : (
          <>
            <View style={styles.noPhotoContainer}>
              <Text style={styles.noPhotoText}>No hay imagen seleccionada</Text>
            </View>
            <View style={styles.selectorOptions}>
              <AppButton
                title="Tomar una foto"
                onPress={pickImage}
                startColor={COLORS.GREY}
              />
            </View>
          </>
        )}
      </View>
    </LinearGradient>
  );
}

export default ImageSelectorScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: SPACE.LG * 2,
  },
  linearGradient: {
    height: '100%',
  },
  noPhotoContainer: {
    alignSelf: "center",
    borderColor: COLORS.WHITE,
    borderWidth: 2,
    height: 181,
    justifyContent: "center",
    padding: SPACE.XS * 5,
    width: 181,
  },
  noPhotoText: {
    color: COLORS.WHITE,
    fontFamily: FONTS.TEXT,
    fontSize: FONT_SIZE.TEXT_LG,
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  selectorFooter: {
    marginVertical: SPACE.LG * 1.5,
    width: '100%',
  },
  selectorHeader: {
    flex: 1,
  },
  selectorImage: {
    alignSelf: 'center',
    borderRadius: BORDER_RADIUS.ROUND,
    height: 181,
    width: 181,
  },
  selectorOptions: {
    flex: 1,
    gap: SPACE.XS * 5,
    marginTop: SPACE.LG * 2,
  },
});
