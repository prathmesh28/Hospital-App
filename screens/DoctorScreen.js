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
  FlatList,Image
} from "react-native"  
import { Container, Header, Content, Card, CardItem, Body, Text,Left,Button} from 'native-base';

const { height, width } = Dimensions.get('screen')  
import Firebase from '../firebase'
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
export default class DoctorScreen extends Component {
  renderItem = ({item}) => {
    
    return( 

      <Card style={{padding:5,width:width*.9,alignSelf:"center",height:height*.26}}>
            <CardItem >
              <Body>
              <CardItem cardBody>
             
                 <Image source={item.Image} style={{  marginTop:0,marginVertical:90, height: height*0.12, width: width*0.22,borderRadius: 40,resizeMode:"contain"}}/>
                 <View style={{ width:width*.6,alignItems:"center",marginBottom:40}}> 

                 <Text >
                  {item.title}
                  </Text>
                  <Text >
                  {  item.date}
                 </Text>
                 <Text >
                  {  item.available}
                 </Text>
                 <Text >
                  {  item.timing}
                 </Text>
                      {/* <Button style={{  marginLeft:60,width:width*0.3,marginTop:10}}
                      // onPress={()=>{}}
                         color="#ffff"
                         backgroundColor="#87CEEB">
                         <Text >
                         Appointment
                        </Text>
                        </Button> */}
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
         <StatusBar hidden/>
       <View> 
       
      <SafeAreaView style={{alignItems:"center",backgroundColor:"#87CEEB",padding:15}}>
      <Text style={{fontWeight:"bold",marginTop:20}}>
                 Doctors
                  </Text></SafeAreaView>
       {/*</View> style={{alignItems:"center"}} */}
       <FlatList
        data={DATA}
        renderItem={this.renderItem}
        keyExtractor={item => item.id}
      />
       </View>
   </View>
    )  
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    
  
  },

})  