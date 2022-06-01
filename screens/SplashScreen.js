import React, { useContext, useEffect, useState } from 'react'
import { View, Image, Text } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUsuario } from '../services/UsuarioAsyncStorage'
import { UsuarioContext } from '../services/UsuarioContext'
import { style } from '../style/style'

export default function SplashScreen({ navigation }) {

    const [login, loginAction] = useContext(UsuarioContext)

    useEffect(() => {
        fetchSesion(loginAction);
    }, [])

    return (
        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#7145d6' }}>
            {/*<Image source={require('../assets/splash-2.png')}  resizeMode='contain' style={{width:'100%',height:'100%'}}  />*/}
            <Image source={require('../assets/logo.png')} resizeMode='contain' style={style.logo} />
            <Text style={{ textAlign: 'center', textAlignVertical: 'center', fontFamily: 'ProximaBold', color: 'white', fontSize: 19 }}>Cargando...</Text>
        </View>
    )

    async function fetchSesion(loginAction) {
        const response = await getUsuario()
        console.log(response)

        if (response == null) {
            setTimeout(() => {
                goToScreen('Welcome')
            }, 1000)
            return
        } else {
            loginAction({ type: 'sign-in', data: response })

            setTimeout(() => {
                goToScreen('Main')
            }, 500)
        }
    }
    function goToScreen(routeName) {
        navigation.replace(routeName)
    }
}