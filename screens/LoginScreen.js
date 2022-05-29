import React, { useState, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, Pressable, TextInput, Image, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { style } from '../style/style'
export default function LoginScreen({ navigation }) {
  const ref_input2 = useRef();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={style.fondo}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={{backgroundColor:'#fff'}}>
          <Image style={style.logo} resizeMode="contain" source={require('../assets/logo-dark.png')} />
          {/* Form */}
          <View style={style.container}>
            <TextInput
              style={style.input}
              placeholder='Correo electrónico'
              value={email}
              onChangeText={(correo) => setEmail(correo)}
              keyboardType="email-address"
              onSubmitEditing={() => ref_input2.current.focus()}
              returnKeyType="next"
              blurOnSubmit={false}
            />
            <TextInput
              style={style.input}
              placeholder='Contraseña'
              value={pass}
              onChangeText={(contra) => setPass(contra)}
              secureTextEntry={true}
              ref={ref_input2}
              keyboardType="default"
              returnKeyType="done"
            />
            <Pressable style={style.btnPrimary} onPress={() => { alert('Presionado') }}>
              <Text style={style.btnPrimaryText}>Ingresar</Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}