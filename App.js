import * as React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';

//Others screen import
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import MainScreen from './screens/MainScreen';
import AboutScreen from './screens/AboutScreen';

const Stack = createNativeStackNavigator();

function App() {
  const [loaded] = useFonts({
    Main: require('./assets/fonts/Main.ttf'),
    Proxima: require('./assets/fonts/Proxima.otf'),
    ProximaBold: require('./assets/fonts/ProximaBold.otf'),
  });
  if (!loaded) {
    return null;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;