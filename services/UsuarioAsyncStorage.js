import AsyncStorage from '@react-native-async-storage/async-storage';

const USUARIO_KEY = '@userdata'

async function saveUsuario(usuario){
    try {

        //await AsyncStorage.setItem(USUARIO_KEY, JSON.stringify(response.json()))
        //return JSON.stringify(usuario) AsyncStorage.removeItem('@usuario:key')
        return 'xdxd'
        //return data
        //return JSON.stringify(response.json());
    } catch (error) {
        //Error
        console.log('error al guardar: ' +error.message)
        return 'Error de sintaxis'
    }
}

async function getUsuario(){
    try {
        const item = await AsyncStorage.getItem(USUARIO_KEY)
        return JSON.parse(item)
    } catch (error) {
        // Error retrieving data
        console.log("Error al recuperar:" + error.message)
        return null
    }
}

async function deleteUsuario(){
    try {
        await AsyncStorage.removeItem(USUARIO_KEY)
        const item = await AsyncStorage.getItem(USUARIO_KEY)
        return (item == null?"usuario removido":"usuario no removido")
    } catch (error) {
        console.log("Error al eliminar" + error.message)
        return "Error de sintaxis"
    }
}

export {saveUsuario, getUsuario, deleteUsuario}