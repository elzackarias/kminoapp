import React, { useState, useRef } from 'react';
import { View, Text, Image, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'; 

const screen = Dimensions.get("screen");
export default function WelcomeScreen({navigation}) {
  const [dimensions, setDimensions] = useState({screen });
  return (
    <SafeAreaView>
      <Text>WelcomeScreen</Text>
    </SafeAreaView>
  )
}