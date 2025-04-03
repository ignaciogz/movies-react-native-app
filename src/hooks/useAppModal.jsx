import { useState } from 'react';
import { Modal, StyleSheet, TouchableOpacity, View, Text } from 'react-native';

import { BORDER_RADIUS,COLORS, FONT_SIZE, FONTS, SPACE } from '../global/theme';

const useAppModal = (type = "normal", visible = false) => {
  const [modalVisible, setModalVisible] = useState(visible);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState(type);

  const closeModal = () => {
    setModalVisible(false);
  };

  const showAppModal = (errorType, message) => {
    setModalType(errorType);
    setModalMessage(message);
    setModalVisible(true);
  };

  const AppModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <TouchableOpacity
          style={styles.container}
          activeOpacity={1}
          onPress={closeModal}
        >
          <View style={[styles.modalView, modalType === "error" && styles.errorModalView]}>
            <Text style={[styles.modalText, modalType === "error" && styles.errorModalText]}>{modalMessage}</Text>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };

  return {
    AppModal,
    showAppModal
  };
};

export default useAppModal;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  modalView: {
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    borderRadius: BORDER_RADIUS.MD * 2,
    elevation: 5,
    //marginHorizontal: SPACE.SM * 5,
    paddingHorizontal: SPACE.LG * 2.5,
    paddingVertical: SPACE.LG * 3,
    boxShadowColor: COLORS.BLACK,
    boxShadowOffset: { height: 2, width: 0 },
    boxShadowOpacity: 0.25,
    boxShadowRadius: BORDER_RADIUS.XS,
    width: '90%',
  },
  errorModalView: {
    backgroundColor: COLORS.GREY,
    fontFamily: FONTS.TEXT_BLACK,
    fontSize: FONT_SIZE.TEXT_LG,
    letterSpacing: 0.5,
  },
  errorModalText: {
    color: COLORS.RED,
  },
  modalText: {
    fontFamily: FONTS.TEXT_BLACK,
    fontSize: FONT_SIZE.TEXT_LG,
    letterSpacing: 0.5,
    textAlign: 'center',
  },
});
