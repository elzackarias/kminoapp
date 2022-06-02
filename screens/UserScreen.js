import React, { useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Linking from 'expo-linking';
import { style } from '../style/style'

export default function UserScreen({ navigation }) {

    const [name, setName] = useState('')

    async function getUserData() {
        try {
            const value = await AsyncStorage.getItem('@userdata')
            const respuesta = JSON.parse(value)
            setName(respuesta.name)
        } catch (e) {
            // error reading value
        }
    }

    useEffect(() => {
        getUserData();
        return () => {

        }
    }, [])


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={{ alignItems: 'center', backgroundColor: '#7145d6', borderBottomLeftRadius: 14, borderBottomRightRadius: 14, paddingVertical: 40 }}>
                <Image style={{ width: 135, height: 135, borderWidth: 3, borderColor: '#fff', borderRadius: 100 }} resizeMode='contain' source={{ uri: 'https://i.postimg.cc/13wNv9Tk/users.png', }} />
                <Text style={style.headText}>{name}</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
                <TouchableOpacity style={[{ marginTop: 15 }, style.btnPrimary]} onPress={() => { bug() }}>
                    <Text style={style.btnPrimaryText}>Reportar Bug</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[{ marginTop: 4 }, style.btnPrimary]} onPress={() => { feedback() }}>
                    <Text style={style.btnPrimaryText}>Dar sugerencia</Text>
                </TouchableOpacity>
                <Text style={style.PrimaryOutlineText} onPress={() => { desconectarse() }}>Cerrar sesión</Text>
                <Text style={{ fontFamily: 'Proxima', fontSize: 15, color: 'gray', marginTop: 5 }}>versión 1.0.0 (Alpha)</Text>
                <Text style={{ fontFamily: 'Proxima', fontSize: 15, color: 'gray' }}>Vezack Inc</Text>
            </View>
        </SafeAreaView>
    )

    function bug() {
        Linking.openURL('whatsapp://send?text=Holaa, encontré un bug en KminoApp :3&phone=527471441396');
    }

    function feedback() {
        Linking.openURL('whatsapp://send?text=Holaa, me gustaría dar una sugerencia para KminoApp :3&phone=527471441396');
    }

    function desconectarse() {

        Alert.alert(
            "Cerrar sesión",
            "¿Desea cerrar la sesión?",
            [
                {
                    text: "Cerrar sesión", onPress: () => {
                        loginAction({
                            type: 'sign-out',
                            data: {}
                        })
                        navigation.replace('Login')
                    }, style: 'destructive'
                },
                {
                    text: "No", onPress: () => { }, style: 'cancel'
                }
            ]
        )
    }

}