import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { COLORS, FONT_SIZE, FONTS } from '../global/theme';

const AppInputForm = ({ label, onChange, error = "", isSecure = false }) => {
  const [input, setInput] = useState("");

  const onChangeText = (text) => {
    setInput(text);
    onChange(text);
  };

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.subtitle}>{label}</Text>

      <TextInput
        style={styles.input}
        value={input}
        onChangeText={onChangeText}
        secureTextEntry={isSecure}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

export default AppInputForm;

const styles = StyleSheet.create({
  inputContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: 0,
    flex: 1,
    width: '100%',
  },
  subtitle: {
    color: COLORS.WHITE,
    fontSize: FONT_SIZE.TEXT,
    fontFamily: FONTS.TEXT,
    width: '100%',
  },
  error: {
    color: COLORS.RED,
    fontSize: FONT_SIZE.TEXT,
    fontFamily: FONTS.TEXT_ITALIC,
    paddingTop: 2,
  },
  input: {
    borderWidth: 0,
    borderBottomColor: COLORS.WHITE,
    borderBottomWidth: 2,
    color: COLORS.WHITE,
    fontFamily: FONTS.TEXT,
    fontSize: FONT_SIZE.TEXT_SM,
    padding: 2,
    width: '100%',
  },
});
