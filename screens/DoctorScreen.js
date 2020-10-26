import React, { Component } from "react"  
import Constants from 'expo-constants'

import {
  SafeAreaView,
  Dimensions,
  StatusBar,
  ActivityIndicator,
  AsyncStorage,
  TouchableOpacity,
  StyleSheet,
  View,
  FlatList,Image,ImageBackground
} from "react-native"  
import { Container, Header, Content, Card, CardItem, Body, Text,Left,Button} from 'native-base';
import MainSVG from '../TabBar/Main'

const { height, width } = Dimensions.get('screen')  
import Firebase from '../firebase'
import { style } from "d3";
var img=require('../assets/favicon.png');
const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
    date:'12/10/1999' ,
    available:'mon-sat',
    timing:'10am-6pm',
    Image:{uri: 'https://picsum.photos/id/237/800/800'},
    
    
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
    date:'12/10/1999',
    available:'mon-sat',
    timing:'10am-6pm',
    Image:{ uri:'https://picsum.photos/seed/picsum/800/800'},
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    date:'12/10/1999',
    available:'mon-sat',
    timing:'10am-6pm',
    Image:{ uri:'https://picsum.photos/800/800'},
  },
   {
    id: '58694a0f-3da1-471f-bd96-445571e29d72',
    title: 'Third Item',
    date:'12/10/1999',
    available:'mon-sat',
    timing:'10am-6pm',
    Image:{ uri:'https://picsum.photos/800/800'},
  },
];
const image=0;
export default class DoctorScreen extends Component {

  renderItem = ({item}) => {
    
    return( 

      <Card style={{padding:5,width:width*.85,alignSelf:"center"}}>
            <CardItem >
              <Body>
              <CardItem >
             
                 <Image source={item.Image} style={{  
                        //marginTop:0,marginVertical:90, 
                        height: height*0.08, width: width*0.22,
                        borderRadius: 40,resizeMode:"contain",alignSelf:'center'
                        }}/>
                  <View style={{ width:width*.4,alignItems:"flex-start"}}> 

                    <Text style={{fontWeight:"bold",fontSize:15}}>
                      {item.title}
                    </Text>
                    <Text >
                      {item.date}
                    </Text>
                    <Text >
                    {item.available}
                    </Text>
                    <Text>
                    {item.timing}
                  </Text>
                <Button style={{ }}
                // onPress={()=>{}}
                    color="#ffff"
                    backgroundColor="#87CEEB">
                    <Text >
                    Appointment
                  </Text>
                  </Button>
                 </View> 
             </CardItem>
              </Body>
            </CardItem>
          </Card>
          
  )
}
  render() {
   
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={'#87CEEB'} />
      <MainSVG width={width} height={150}></MainSVG>
        <View style={{alignItems:"center",width:width*0.5,elevation:7,
              backgroundColor:"#87CEEB",textAlign:"center",alignSelf:"center",
              borderRadius:10,justifyContent:"center",alignContent:"center",alignItems:"center",
              height:30,margin:5}}>
          <Text style={{fontWeight:"bold",fontSize:18}}>
            Book Appointment
          </Text>
        </View>
                  
             
                <FlatList
                  data={DATA}
                  renderItem={this.renderItem}
                  keyExtractor={item => item.id}
                />
              </View>
    )  
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fff'

  
  },

})  