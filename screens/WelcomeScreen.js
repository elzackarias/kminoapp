import React, { useState, useRef } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { style } from '../style/style'

const screen = Dimensions.get("screen");
export default function WelcomeScreen({ navigation }) {
  const [dimensions, setDimensions] = useState({ screen });
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ marginTop: 40 }}>
        <Image source={require('../assets/welcome.png')} resizeMode='contain' style={{ width: dimensions.screen.width, height: 607 * (dimensions.screen.width / 800) }} />
      </View>
      <View style={{ flex: 1, paddingHorizontal: 35, paddingVertical: 20}}>
        <Text style={style.PrimaryText}>Encuentra tu Kmino</Text>
        <Text style={[{ marginTop: 5 }, style.NormalText]}>➡ Localiza en tiempo real cualquier ruta de combis de Chilpancingo</Text>
        <Text style={[{ marginTop: 10 }, style.NormalText]}>➡ Paga sin necesidad de efectivo ;)</Text>
        <View style={{flex:1,justifyContent:'flex-end'}}>
          <TouchableOpacity style={style.btnWelcome} onPress={() => { navigation.replace('Login') }}>
            <Text style={style.btnWelcomeText}>Continuar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}