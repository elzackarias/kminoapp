import React, { useState, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Alert, ActivityIndicator, View, Text, TouchableOpacity, TextInput, Image, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { style } from '../style/style'

export default function RegisterScreen({ navigation }) {
    const ref_input2 = useRef();
    const ref_input3 = useRef();
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState('');
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

    async function register(email, password, name) {
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
                password,
                name
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
                const peticion = await fetch('http://192.168.1.101:3000/register', settings);
                const respuesta = await peticion.json();
                if (respuesta.status == 'Ok') {
                    setLoading(false)
                    Alert.alert('Exito!','El usuario ha sido registrado con éxito, por favor ahora inicie sesión',[
                        { text: "OK", onPress: () => {navigation.navigate('Login')} }
                      ]);
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
                <Text style={{ fontFamily: 'Proxima', fontSize: 18, color: '#333', textAlign: 'center' }}>Registrando...</Text>
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
                            placeholder='Nombre completo'
                            value={name}
                            onChangeText={(name) => setName(name)}
                            keyboardType="default"
                            onSubmitEditing={() => ref_input2.current.focus()}
                            returnKeyType="next"
                            blurOnSubmit={false}
                        />
                        <TextInput
                            style={style.input}
                            autoCapitalize='none'
                            placeholder='Correo electrónico'
                            value={email}
                            ref={ref_input2}
                            onChangeText={(correo) => setEmail(correo)}
                            keyboardType="email-address"
                            onSubmitEditing={() => ref_input3.current.focus()}
                            returnKeyType="next"
                            blurOnSubmit={false}
                        />
                        <TextInput
                            style={style.input}
                            placeholder='Contraseña'
                            value={pass}
                            onChangeText={(contra) => setPass(contra)}
                            secureTextEntry={true}
                            ref={ref_input3}
                            keyboardType="default"
                            returnKeyType="done"
                        />
                        <TouchableOpacity style={[{ marginTop: 10 }, style.btnPrimary]} onPress={() => { register(email, pass,name) }}>
                            <Text style={style.btnPrimaryText}>Registrarse</Text>
                        </TouchableOpacity>
                            <Text style={style.PrimaryOutlineText} onPress={() => { navigation.navigate('Login')}}>¿Ya tienes cuenta?, inicia sesión</Text>
                    </View>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}