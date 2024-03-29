import React, { createContext, useReducer } from 'react'
import { saveUsuario, deleteUsuario } from './UsuarioAsyncStorage'


const initialState = {
    usuario: {
        id: '',
        nombre: '',
        email: '',
        password: ''
    },
    activo: false
}

const usuarioReducer = (state = initialState, payload) => {

    switch (payload.type) {

        case 'sign-in':
            console.log('Bienvenidos al sistema')
            return { ...state, usuario: payload.data, activo: true }
        case 'sign':
            saveUsuario(payload.data).then((msg) => {
                console.log('usuario guardado')
                //console.log(msg)
            })
            // Snackbar.show({
            //     text: 'Inicio de sesión exitoso',
            //     duration: Snackbar.LENGTH_LONG,
            // })

            return { ...state, usuario: payload.data, activo: true }
        case 'sign-out':
            deleteUsuario().then((msg) => {
                console.log(msg)
            })
           /* Snackbar.show({
                text: 'Sesión cerrada :3',
                duration: Snackbar.LENGTH_LONG,
            })*/

            return { ...state, usuario: payload.data, activo: false }
        default:
            return state
    }
}

const UsuarioContext = createContext(initialState)

function UsuarioProvider(props){

    const [login, loginAction] = useReducer(usuarioReducer, initialState)

    return(
        <UsuarioContext.Provider value={[login, loginAction]}>
            {props.children}
        </UsuarioContext.Provider>
    )
}

export { UsuarioContext, UsuarioProvider}