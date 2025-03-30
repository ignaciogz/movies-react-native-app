import { useState, useEffect } from 'react';
import { Modal, StyleSheet, TouchableOpacity, View, Text } from 'react-native';

import { BORDER_RADIUS,COLORS, FONT_SIZE, FONTS, SPACE } from '../global/theme';

const useAppModal = (type = "normal", duration = 2000, visible = false) => {
  const [modalVisible, setModalVisible] = useState(visible);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState(type);

  useEffect(() => {
    if (visible) {
      setModalVisible(true);

      const timer = setTimeout(() => {
        setModalVisible(false);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible, duration]);

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
          <View style={[styles.modalView, modalType === 'error' && styles.errorModalView]}>
            <Text style={styles.modalText}>{modalMessage}</Text>
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
    marginHorizontal: SPACE.SM * 5,
    padding: SPACE.LG * 3,
    boxShadowColor: COLORS.BLACK,
    boxShadowOffset: { height: 2, width: 0 },
    boxShadowOpacity: 0.25,
    boxShadowRadius: BORDER_RADIUS.XS,
  },
  errorModalView: {
    backgroundColor: COLORS.YELLOW,
    fontFamily: FONTS.TEXT_BLACK,
    fontSize: FONT_SIZE.TITLE,
  },
  modalText: {
    fontFamily: FONTS.TEXT_BLACK,
    fontSize: FONT_SIZE.TITLE,
    textAlign: 'center',
  },
});
