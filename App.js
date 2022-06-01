import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { UsuarioProvider } from './services/UsuarioContext'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';

//Others screen import
import SplashScreen from './screens/SplashScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import MainScreen from './screens/MainScreen';
import AboutScreen from './screens/AboutScreen';


const Stack = createNativeStackNavigator();

function App() {
  const [logged, setLogged] = useState(false)
  const [loaded] = useFonts({
    Main: require('./assets/fonts/Main.ttf'),
    Proxima: require('./assets/fonts/Proxima.otf'),
    ProximaBold: require('./assets/fonts/ProximaBold.otf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <UsuarioProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen name="About" component={AboutScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </UsuarioProvider>
  );

}

export default App;