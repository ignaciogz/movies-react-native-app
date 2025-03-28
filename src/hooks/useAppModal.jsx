import { useState, useEffect } from 'react';
import { Modal, StyleSheet, TouchableOpacity, View, Text } from 'react-native';

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
    marginTop: 22,
  },
  modalView: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    elevation: 5,
    margin: 20,
    padding: 35,
    boxShadowColor: '#000000',
    boxShadowOffset: { width: 0, height: 2 },
    boxShadowOpacity: 0.25,
    boxShadowRadius: 4,
  },
  errorModalView: {
    backgroundColor: '#F2D750',
    fontFamily: 'LATO_BLACK',
    fontSize: 24,
  },
  modalText: {
    fontFamily: 'LATO_BLACK',
    fontSize: 24,
    textAlign: 'center',
  },
});
