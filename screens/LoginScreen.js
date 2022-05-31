import React, { useState, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Alert, ActivityIndicator, View, Text, TouchableOpacity, TextInput, Image, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { style } from '../style/style'

export default function LoginScreen({ navigation }) {
  const ref_input2 = useRef();
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  function validate(text) {
    console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      return false;
    }
    else {
      return true;
    }
  }

  async function login(email, password) {
    setLoading(true)
    const validar = validate(email)
    const settings = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({
        email,
        password
      })
    };
    if (email == '' || password == '') {
      setLoading(false)
      Alert.alert('Error!', 'Hay campos vacíos :/')
    } else if (validar == false) {
      setLoading(false)
      Alert.alert('Error!', 'Correo no válido')
    } else {
      try {
        const peticion = await fetch('http://192.168.1.101:3000/login', settings);
        const respuesta = await peticion.json();
        if (respuesta.status == 'Ok') {
          setLoading(false)
          alert(JSON.stringify(respuesta))
        } else {
          setLoading(false);
          alert(respuesta.msg)
        }
      } catch (e) {
        alert(e)
      }
    }
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
        <Text style={{ fontFamily: 'Proxima', fontSize: 18, color: '#333', textAlign: 'center' }}>Iniciando sesión...</Text>
      </View>
    )
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={style.fondo}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={{ backgroundColor: '#fff' }}>
          <Image style={style.logo} resizeMode="contain" source={require('../assets/logo-dark.png')} />
          {/* Form */}
          <View style={style.container}>
            <TextInput
              style={style.input}
              autoCapitalize='none'
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
            <TouchableOpacity style={[{ marginTop: 10 }, style.btnPrimary]} onPress={() => { login(email, pass) }}>
              <Text style={style.btnPrimaryText}>Ingresar</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', alignItems: 'center', width:'75%' }}>
              <View style={{ flex: 1, height: 1, backgroundColor: '#d4d4d4' }} />
              <View>
                <Text style={{ width: 50, textAlign: 'center', color:'#d4d4d4' }}>ó</Text>
              </View>
              <View style={{ flex: 1, height: 1, backgroundColor: '#d4d4d4' }} />
            </View>
            <TouchableOpacity style={style.btnPrimaryOutline} onPress={() => { navigation.navigate('Register') }}>
              <Text style={style.btnPrimaryOutlineText}>Registrarse</Text>
            </TouchableOpacity>
          </View>
          <Text style={style.PrimaryOutlineText} onPress={() => { navigation.navigate('About')}}>Acerca</Text>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}