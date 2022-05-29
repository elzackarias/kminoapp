import { StyleSheet, Platform } from 'react-native';

const style = StyleSheet.create({
    fondo:{
        flex:1,
        justifyContent:'center',
        backgroundColor:'#fff'
    },
    containers:{
        flex: 1,
        justifyContent: "space-around"
    },
    logo:{
        width:160,
        height:65,
        alignSelf:'center',
    },
    container:{
        alignItems:'center',
        justifyContent:'center'
    },
    input:{
        padding:12,
        borderColor:'#e8e8e8',
        borderWidth:2,
        borderRadius:8,
        margin:4,
        width:'75%',
        fontSize:17,
        fontFamily:'Proxima',
    },
    btnPrimary:{
        margin:2,
        padding:5,
        backgroundColor:'#7145d6',
        width:'75%',
        height:45,
        borderRadius:10,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    btnPrimaryText:{
        fontFamily:'ProximaBold',
        fontSize:17,
        textAlign:'center',
        textAlignVertical:'center',
        color:'#fff',
    }
});

export { style };