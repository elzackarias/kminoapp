import React, { useState, useEffect, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';
import { UsuarioContext } from '../services/UsuarioContext'
import { StyleSheet, Text, View, Button, Dimensions, Platform, ScrollView, ActivityIndicator, Image, Alert } from 'react-native';
import * as Location from 'expo-location';
import io from "socket.io-client";
let socket;

export default function MainScreen({ navigation }) {

  const [location, setLocation] = useState(null);
  const [login, loginAction] = useContext(UsuarioContext)
  const [watchId, setWatchId] = useState(null);
  const [positions, setPositions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [combi, setCombi] = useState({ latitude: 17.4881937, longitude: -99.45886, title: 'Combi #47', description: 'Ruta J.Ruiz-Centro' })
  const [errorMsg, setErrorMsg] = useState(null);
  const [rutas, setRutas] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    //socket = io('https://1a8d-189-202-31-5.ngrok.io/');
    socket = io('http://192.168.0.17:3000')
    const datos = [
      {
        id: 1,
        nombre: "Chilpancingo-Petaquillas"
      },
      {
        id: 2,
        nombre: "Rio Azul-Mercado"
      },
      {
        id: 3,
        nombre: "Chilpancingo-Los Pinos"
      }
    ]

    setRutas(datos)
    /*if (Platform.OS === 'ios') {
  alert('IOS')
} else {
  alert('Android')
}*/
    socket.on("coords", (arg) => {
      setCombi({ latitude: arg.lat, longitude: arg.lon })
    });
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Oiga active el acceso a su ubicación');
        return;
      } else {
        let location = await Location.getCurrentPositionAsync({});
        setLocation({ latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0017, longitudeDelta: 0.001 })
        setLoading(false)
      }
    })();

    return () => {
    }
  }, []);

  useEffect(() => {
    Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.Highest,
        distanceInterval: 1, //Cambiar a mayor distancia, en beta con 1 metro basta
        timeInterval: 2000,
      },
      (loc) => {
        setPositions(loc)
        const obj = {
          lat: loc.coords.latitude,
          lon: loc.coords.longitude,
          title: "Combi #47",
          description: "Ruta J.Ruiz-Centro",
          os: Platform.OS
        }
        socket.emit("updateLocation", obj);
      }
    )
      .then((locationWatcher) => {
        //set locationwatcher for removing
        setWatchId(locationWatcher);
      })
      .catch((err) => {

      });

    return () => {
      watchId && watchId.remove();
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      //setCombi({latitude:combi.latitude,longitude:combi.longitude+0.0001})
    }, 2000);
    return () => {
      clearInterval(interval);
    }
  }, [combi])

  function showRoute(id) {
    alert(id)
  }

  function Alerts() {
    socket.emit("hello", "world");
    /*if (Platform.OS === 'ios') {
      alert('IOS')
    } else {
      alert('Android')
    }*/
  }
  if (loading == true) {
    return (
      <View style={{ justifyContent: 'center', flex: 1 }}>
        <ActivityIndicator size="large" />
        <Text style={{ textAlign: 'center', color: '#c9c9c9' }}>Obteniendo su ubicación...</Text>
      </View>

    )
  }
  return (
    <View style={styles.container}>
      <ScrollView>
        <MapView provider={PROVIDER_GOOGLE} initialRegion={location} zoomEnabled={true} showsUserLocation style={styles.map}>
          <Marker coordinate={combi} title={combi.title} description={combi.description}>
            <Image source={require('../assets/combi.png')} resizeMode='cover' style={styles.marcador} />
          </Marker>
          <Polyline
            coordinates={[
              { latitude: 17.5483610, longitude: -99.50122904 },
              { latitude: 17.5452011, longitude: -99.49938806 },
              { latitude: 17.544345, longitude: -99.499113 },
              { latitude: 17.5416156, longitude: -99.49871123 },
              { latitude: 17.54157162, longitude: -99.4984289 },
              { latitude: 17.541423290, longitude: -99.4983270 },
              { latitude: 17.54094828985555, longitude: -99.4983839087011 },
              { latitude: 17.539719565504747, longitude: -99.49807450760603 },
              { latitude: 17.535604094949175, longitude: -99.49670392659021 },
              { latitude: 17.535153650074534, longitude: -99.49626627228714 },
              { latitude: 17.534506214101526, longitude: -99.49594764206357 },
              { latitude: 17.53418068677294, longitude: -99.495746601612 },
              { latitude: 17.532310701769536, longitude: -99.49411172540273 },
              { latitude: 17.531489638420453, longitude: -99.49355412259015 },
              { latitude: 17.526161723575136, longitude: -99.48897653367256 },
              { latitude: 17.524403788138788, longitude: -99.4874213149149 },
              { latitude: 17.51968332174874, longitude: -99.48333602093976 },
              { latitude: 17.519191373343546, longitude: -99.48291497388591 },
              { latitude: 17.518526780898746, longitude: -99.48251134169332 },
              { latitude: 17.518228330081534, longitude: -99.48237716074293 },
              { latitude: 17.515286134734776, longitude: -99.48170571511903 },
              { latitude: 17.51467480686759, longitude: -99.4814911384147 },
              { latitude: 17.513994414412405, longitude: -99.48102175182537 },
              { latitude: 17.513503302497327, longitude: -99.48043166585431 },
              { latitude: 17.513275651213014, longitude: -99.48020099589715 },
              { latitude: 17.512434106326005, longitude: -99.47932927795192 },
              { latitude: 17.512196222115843, longitude: -99.47911738345638 },
              { latitude: 17.511287295845214, longitude: -99.47816015145905 },
              { latitude: 17.510612006557764, longitude: -99.4776049342366 },
              { latitude: 17.491838880154983, longitude: -99.4629669167142 },
              { latitude: 17.490686334329624, longitude: -99.46210992082474 },
              { latitude: 17.49056682948607, longitude: -99.46191091837261 },
              { latitude: 17.487104883323013, longitude: -99.45921922168495 },
              { latitude: 17.486964380448306, longitude: -99.45880728942522 },
              { latitude: 17.4869125758452, longitude: -99.45873554033275 },
              { latitude: 17.48685373603234, longitude: -99.45868457836546 },
              { latitude: 17.485964174651116, longitude: -99.45819351027367 },
              { latitude: 17.485900857564232, longitude: -99.45812511394581 },
              { latitude: 17.48532476399169, longitude: -99.45715385863679 },
              { latitude: 17.485295983398515, longitude: -99.45605012956699 },
              { latitude: 17.48533435751926, longitude: -99.45372264276463 },
              { latitude: 17.485289889617675, longitude: -99.45331428084437 },
              { latitude: 17.484898115771095, longitude: -99.45208694228165 },
              { latitude: 17.484583757698186, longitude: -99.45109818450415 },
              { latitude: 17.48431631831233, longitude: -99.45019305298186 },
              { latitude: 17.484190507539136, longitude: -99.449571704219 }
            ]}
            strokeWidth={6}
          />
          <Polyline
            coordinates={[
              { latitude: 17.5483610, longitude: -99.50122904 },
              { latitude: 17.54859219046587, longitude: -99.50134077851489 },
              { latitude: 17.548362041271616, longitude: -99.50175444564063 },
              { latitude: 17.548298794113595, longitude: -99.50191291055293 },
              { latitude: 17.548253115596832, longitude: -99.50220496507156 },
              { latitude: 17.548477115910543, longitude: -99.50214231616418 },
              { latitude: 17.548615029688197, longitude: -99.5021460013947 },
              { latitude: 17.54873713160757, longitude: -99.50218469631515 },
              { latitude: 17.54886099030501, longitude: -99.50227682707813 },
              { latitude: 17.548994511650495, longitude: -99.50243529205082 },
              { latitude: 17.549077084009216, longitude: -99.50267206813426 },
              { latitude: 17.549122762318227, longitude: -99.50302400764882 },
              { latitude: 17.54920182090598, longitude: -99.50328473774529 },
              { latitude: 17.549496094226892, longitude: -99.50370853927316 },
              { latitude: 17.549841315752225, longitude: -99.50401533473828 },
              { latitude: 17.550000310690415, longitude: -99.50427882877136 },
              { latitude: 17.550140858584843, longitude: -99.50449349347092 },
              { latitude: 17.55039999347141, longitude: -99.50479568237348 },
              { latitude: 17.550283163212125, longitude: -99.5049670456045 },
              { latitude: 17.549973079525877, longitude: -99.50456811938543 },
              { latitude: 17.5497244851372, longitude: -99.50417932754054 },
              { latitude: 17.549271568645068, longitude: -99.50372053635772 },
              { latitude: 17.54907386140633, longitude: -99.5033767781343 },
              { latitude: 17.548991932876124, longitude: -99.50305544448088 },
              { latitude: 17.54894414121439, longitude: -99.50266518964537 },
              { latitude: 17.548880134507492, longitude: -99.50251750147595 },
              { latitude: 17.548744440212328, longitude: -99.50239487553118 },
              { latitude: 17.548649710170004, longitude: -99.5023635477269 },
              { latitude: 17.548508895156154, longitude: -99.50238860996171 },
              { latitude: 17.548191420893804, longitude: -99.50248169826483 },
              { latitude: 17.547566900455813, longitude: -99.5026104972907 },
              { latitude: 17.546929639766905, longitude: -99.50263075063492 },
              { latitude: 17.546396173578227, longitude: -99.50254720557474 },
              { latitude: 17.545297855922, longitude: -99.50199783358632 },
              { latitude: 17.544853699207856, longitude: -99.50192947854961 },
              { latitude: 17.544264707103697, longitude: -99.50196998523803 },
              { latitude: 17.543847100877283, longitude: -99.50187125018002 },
              { latitude: 17.54337880142286, longitude: -99.50156998167506 },
              { latitude: 17.542994988072603, longitude: -99.50125352314886 },
              { latitude: 17.541710776524138, longitude: -99.50110162306649 },
              { latitude: 17.541305234120564, longitude: -99.50088389958438 },
              { latitude: 17.540619672329296, longitude: -99.50028895759819 },
              { latitude: 17.53858469719087, longitude: -99.49951426710032 },
              { latitude: 17.538217771603254, longitude: -99.4995623687948 },
              { latitude: 17.53770841973252, longitude: -99.49982059893347 },
              { latitude: 17.536711057328354, longitude: -99.49951180705625 },
              { latitude: 17.536027816626504, longitude: -99.4991475150496 },
              { latitude: 17.535750787622757, longitude: -99.49912192430085 },
              { latitude: 17.535051754009316, longitude: -99.4987531162762 },
              { latitude: 17.53456490854286, longitude: -99.49843846351439 },
              { latitude: 17.534091227925707, longitude: -99.49830749902618 },
              { latitude: 17.53257544165706, longitude: -99.49765418193763 },
              { latitude: 17.531770175051236, longitude: -99.4972522564672 },
              { latitude: 17.531065384407466, longitude: -99.49657786463015 },
              { latitude: 17.530629015709113, longitude: -99.49648754428445 },
              { latitude: 17.530570163272927, longitude: -99.4963520637911 },
              { latitude: 17.530718012044755, longitude: -99.49628432351498 },
              { latitude: 17.532113239154178, longitude: -99.4946615681582 },
              { latitude: 17.532065870511136, longitude: -99.49441619787648 },
              { latitude: 17.52838037469841, longitude: -99.49122037377668 },
              { latitude: 17.523944614440165, longitude: -99.48738315543764 },
              { latitude: 17.52340759722353, longitude: -99.4869120363743 },
              { latitude: 17.522571769610348, longitude: -99.48620864468833 },
              { latitude: 17.518942559061383, longitude: -99.48308638683267 },
              { latitude: 17.518461946837796, longitude: -99.48278399416404 },
              { latitude: 17.517005516730006, longitude: -99.48227869743529 },
              { latitude: 17.515195881243653, longitude: -99.48185359461709 },
              { latitude: 17.514903328786332, longitude: -99.48196753968062 },
              { latitude: 17.514153138531718, longitude: -99.48210558850951 },
              { latitude: 17.51361191300664, longitude: -99.48200040845087 },
              { latitude: 17.513183528715114, longitude: -99.48171992828378 },
              { latitude: 17.512872165844556, longitude: -99.48128167802558 },
              { latitude: 17.51246467671469, longitude: -99.47980039214083 },
              { latitude: 17.51207181451722, longitude: -99.47909700044069 },
              { latitude: 17.510389368538824, longitude: -99.47754137232563 },
              { latitude: 17.505874146346212, longitude: -99.47403115839083 },
              { latitude: 17.49867250939804, longitude: -99.4684673322937 },
              { latitude: 17.491288082505953, longitude: -99.46272193559506 },
              { latitude: 17.490577185389736, longitude: -99.46217011367958 },
              { latitude: 17.490451788832807, longitude: -99.4621723049308 },
              { latitude: 17.48692644182207, longitude: -99.45944077095912 },
              { latitude: 17.487104883323013, longitude: -99.45921922168495 },

            ]}
            strokeColor="#9c148e"
            strokeWidth={6}
          />

          <Polyline
            coordinates={[
              { latitude: 17.530801120885318, longitude: -99.5073808973058 },
              { latitude: 17.531061999385546, longitude: -99.50749355007557 },
              { latitude: 17.531358684282743, longitude: -99.50752573658121 },
              { latitude: 17.531498772855322, longitude: -99.50726187188103 },
              { latitude: 17.53170140589852, longitude: -99.50706976106049 },
              { latitude: 17.532168869236067, longitude: -99.50729942279082 },
              { latitude: 17.533110069079434, longitude: -99.50758373691986 },
              { latitude: 17.53390387414158, longitude: -99.50772974202664 },
              { latitude: 17.5347318797058, longitude: -99.50541112920567 },
              { latitude: 17.53529750209793, longitude: -99.50565471887077 },
              { latitude: 17.535355569696815, longitude: -99.5053502318001 },
              { latitude: 17.535570634710723, longitude: -99.50508859846695 },
              { latitude: 17.53570182424394, longitude: -99.50500289099577 },
              { latitude: 17.535981408187734, longitude: -99.50484726425687 },
              { latitude: 17.53607173521289, longitude: -99.50472321396961 },
              { latitude: 17.536278196826217, longitude: -99.50417964811155 },
              { latitude: 17.536561042786698, longitude: -99.50379035483631 },
              { latitude: 17.535910169140436, longitude: -99.50346500525336 },
              { latitude: 17.53615360857379, longitude: -99.5026979596275 },
              { latitude: 17.535222917242535, longitude: -99.50244278342143 },
              { latitude: 17.533969061691284, longitude: -99.50192445685794 },
              { latitude: 17.534039016261826, longitude: -99.50171872109223 },
              { latitude: 17.53415307257176, longitude: -99.50064857607464 },
              { latitude: 17.5342123818301, longitude: -99.50038223593697 },
              { latitude: 17.534271691062497, longitude: -99.50028495002697 },
              { latitude: 17.535073124174783, longitude: -99.49880173861163 },
              { latitude: 17.535091373094264, longitude: -99.4986645813409 },
              { latitude: 17.53520086651507, longitude: -99.49849074259316 },
              { latitude: 17.535267779128574, longitude: -99.4983615596705 },
              { latitude: 17.535325567274906, longitude: -99.49811914233418 },
              { latitude: 17.53426527204224, longitude: -99.49758183949186 },
              { latitude: 17.534084616138944, longitude: -99.4974149354564 },
              { latitude: 17.534011493463606, longitude: -99.4971939003991 },
              { latitude: 17.534082465472434, longitude: -99.49644959867554 },
              { latitude: 17.534226560071605, longitude: -99.49645862051462 },
              { latitude: 17.53432764128925, longitude: -99.49653305068698 },
              { latitude: 17.53436205190369, longitude: -99.49666386735353 },
              { latitude: 17.534159889450397, longitude: -99.4968082167787 },
              { latitude: 17.53409321880469, longitude: -99.49707210557159 },
              { latitude: 17.53411257480113, longitude: -99.49728411878984 },
              { latitude: 17.534288929340217, longitude: -99.49750515384713 },
              { latitude: 17.535467489438236, longitude: -99.49804871967243 },
              { latitude: 17.535802990541434, longitude: -99.49812540530455 },
              { latitude: 17.536037410822512, longitude: -99.4980622524298 },
              { latitude: 17.536338500649677, longitude: -99.49785249467007 },
              { latitude: 17.536736368568032, longitude: -99.49745102283131 },
              { latitude: 17.536762176194472, longitude: -99.49719164492129 },
              { latitude: 17.53506101611707, longitude: -99.49657590437491 },
              { latitude: 17.53466314450964, longitude: -99.49623532988907 },
              { latitude: 17.53476207482549, longitude: -99.49604587126854 },
              { latitude: 17.535153650074534, longitude: -99.49626627228714 },
              { latitude: 17.535604094949175, longitude: -99.49670392659021 },
              { latitude: 17.539719565504747, longitude: -99.49807450760603 },
              { latitude: 17.54094828985555, longitude: -99.4983839087011 },
              { latitude: 17.54094828985555, longitude: -99.4983839087011 },
              { latitude: 17.54094828985555, longitude: -99.4983839087011 },
              { latitude: 17.541423290, longitude: -99.4983270 },
              { latitude: 17.54158191267255, longitude: -99.49825510319452 },
              { latitude: 17.541951811634434, longitude: -99.49814007474635 },
              { latitude: 17.543626079297287, longitude: -99.49676274456644 },
              { latitude: 17.543830859865192, longitude: -99.496585607457 },
              { latitude: 17.54397684404031, longitude: -99.49652181342114 },
              { latitude: 17.544183654753773, longitude: -99.49654733103549 },
              { latitude: 17.544439126495174, longitude: -99.49666535003169 },
              { latitude: 17.54471588713752, longitude: -99.49680888662272 },
              { latitude: 17.545381935736092, longitude: -99.49682164543496 },
              { latitude: 17.54555031475572, longitude: -99.49683082757042 },
              { latitude: 17.545763217146753, longitude: -99.49687819222555 },
              { latitude: 17.548541678017223, longitude: -99.49858783093768 },
              { latitude: 17.550388943788775, longitude: -99.49979224649303 },
              { latitude: 17.550591088155393, longitude: -99.49992306312058 },
              { latitude: 17.55224479254999, longitude: -99.5011680769934 },
              { latitude: 17.55275014784209, longitude: -99.50149511867735 },
              { latitude: 17.554287186818424, longitude: -99.50257256227775 },
              { latitude: 17.55557313747691, longitude: -99.5033867833214 },
              { latitude: 17.558889041717055, longitude: -99.50550014937235 },
              { latitude: 17.559534152202076, longitude: -99.50593545310765 },
              { latitude: 17.560174959687636, longitude: -99.50642488792114 },
              { latitude: 17.56312952594022, longitude: -99.50808039553615 },
              { latitude: 17.567205119825623, longitude: -99.5103833166359 },
              { latitude: 17.56806952764616, longitude: -99.51084568588753 },
              { latitude: 17.56827380252993, longitude: -99.51087726233654 },
              { latitude: 17.56835336215586, longitude: -99.51102612268126 }
            ]}
            strokeColor="#35f500"
            strokeWidth={6}
          />
          <Polyline
            coordinates={[
              { latitude: 17.56835336215586, longitude: -99.51102612268126 },
              { latitude: 17.568252299922335, longitude: -99.51117498302597 },
              { latitude: 17.568091030283867, longitude: -99.51117047210643 },
              { latitude: 17.567970615526786, longitude: -99.51098101348587 },
              { latitude: 17.567583567536026, longitude: -99.51072840194945 },
              { latitude: 17.566119228512626, longitude: -99.50989613724762 },
              { latitude: 17.56602461589368, longitude: -99.50992320276484 },
              { latitude: 17.56591710149396, longitude: -99.50978561971897 },
              { latitude: 17.565628962587752, longitude: -99.50963675937426 },
              { latitude: 17.565011827691947, longitude: -99.50930069583275 },
              { latitude: 17.56436243610954, longitude: -99.50886990301309 },
              { latitude: 17.56171323831799, longitude: -99.5073767885449 },
              { latitude: 17.561448746470727, longitude: -99.50726176008429 },
              { latitude: 17.560349918505093, longitude: -99.50670240602963 },
              { latitude: 17.559637743580165, longitude: -99.50643702311571 },
              { latitude: 17.558725987266563, longitude: -99.50601299664594 },
              { latitude: 17.555171384009363, longitude: -99.50408006748728 }
            ]}
            strokeColor="#969400"
            strokeWidth={6}
          />
        </MapView>
        <View style={{ padding: 5 }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 16 }}>Rutas:</Text>
            <Text style={{ fontStyle: 'italic' }}> (Da clic en el boton para ver la ruta)</Text>
          </View>
          {rutas.map((ruta, index) => (
            <Button
              onPress={() => showRoute(ruta.id)}
              title={ruta.nombre}
              color="#841584"
              key={index} />
          ))
          }
        </View>
        <StatusBar style="auto" />
      </ScrollView>
    </View>
  );



}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 200,
  },
  marcador: {
    width: Platform.OS === 'ios' ? 24 : 12.5,
    height: Platform.OS === 'ios' ? 46 : 25

  }
});
