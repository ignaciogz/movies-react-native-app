import { Platform, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import { Provider } from 'react-redux';

import Navigator from './src/navigation/Navigator';
import store from './src/store';

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    LATO: require("./src/assets/fonts/Lato-Regular.ttf"),
    LATO_BLACK: require("./src/assets/fonts/Lato-Black.ttf"),
    LATO_BOLD: require("./src/assets/fonts/Lato-Bold.ttf"),
    LATO_ITALIC: require("./src/assets/fonts/Lato-Italic.ttf"),
  });

  if(!fontsLoaded || fontError) {
    return null;
  }

  if(fontsLoaded && !fontError) {
    return (
      <SafeAreaView style={styles.container}>
        <Provider store={store}>
          <Navigator />
        </Provider>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex: 1,
  },
});
