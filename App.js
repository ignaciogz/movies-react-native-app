import { SafeAreaView, StyleSheet, Platform, StatusBar } from 'react-native';
import { useFonts } from 'expo-font';

import Navigator from './src/navigation/Navigator';
import { COLORS } from './src/global/theme';

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    LATO: require("./src/assets/fonts/Lato-Regular.ttf"),
  });

  if(!fontsLoaded || fontError) {
    return null;
  }

  if(fontsLoaded && !fontError) {
    return (
      <SafeAreaView style={styles.container}>
        <Navigator />
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
