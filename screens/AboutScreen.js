import React, { useState, useEffect } from 'react'
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { style } from '../style/style'
//import { useIsFocused } from '@react-navigation/native';

function gotosocial() {

}

export default function AboutScreen() {
  //const isFocused = useIsFocused();
  //useEffect(() => { console.log('xd') }, [isFocused])
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Text style={{ textAlign: 'center', fontFamily: 'ProximaBold', fontSize: 22, color: '#7145d6' }}>Acerca</Text>
      <ScrollView style={{ paddingHorizontal: 10 }}>
        <TouchableOpacity style={[{ marginTop: 10 }, style.Miembro]} onPress={() => { gotosocial() }}>
          <Text style={{}}>José Zacarias - Programador & CEO</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[{ marginTop: 10 }, style.Miembro]} onPress={() => { gotosocial() }}>
          <Text style={{}}>Emmanuel Venancio - Cofundador</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[{ marginTop: 10 }, style.Miembro]} onPress={() => { gotosocial() }}>
          <Text style={{}}>Airam Reyes - Diseño UX UI</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[{ marginTop: 10 }, style.Miembro]} onPress={() => { gotosocial() }}>
          <Text style={{}}>MC. Neftalí Antúnez - Asesor</Text>
        </TouchableOpacity>
        <View>
          <Text>Kmino no sería posible sin los proyectos:</Text>
          <Text>OpenStreetMaps</Text>
          <Text>React Native</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}