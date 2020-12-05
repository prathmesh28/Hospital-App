import { Button, Card, CardItem } from "native-base"
import React, { Component } from "react"

import {
  SafeAreaView,
  Dimensions,
  StatusBar,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  View,
  FlatList, Image, ImageBackground,
  Text,
} from "react-native"
const { height, width } = Dimensions.get('screen')
import { Divider } from 'react-native-elements';

export default class Appointment extends Component {


  render() {

    return (
      <View style={styles.container}>
          <View style={{alignSelf:"center"}}>
              <Text style={{fontSize:25}}>Appointment</Text>
          </View>
        <Text style={{ fontSize: 20,marginTop:30 }}>Dr name </Text>
        
        <Button  rounded bordered primary style={{width:100,marginTop:30}}>
            <Text>  contact  </Text></Button>
        
        
      
      <Card style={{width:width*0.5,alignSelf:"flex-start",borderRadius:15,marginTop:100}}>
        
     <CardItem  style={{borderRadius:15,backgroundColor:'#ffff',}}>
            <Text>03-12-2020 | Tomorrow</Text>
            
            {/* <Divider style={{ backgroundColor: 'blue' }} />; */}
        </CardItem> 
        
      </Card>
      
       
     <Card style={{width:width*0.4,borderRadius:15,height:30}}>
                <CardItem style={{borderRadius:15}}>
             <Text>select Date</Text>
             </CardItem>
             
         
     </Card>
      
     

        
            
        
      
        
      

      <Card style={{
        padding: 5, width: width * .85, borderRadius: 10,height:height*0.2,marginTop:20
      }}>
          <CardItem>
          <Text>10:00 AM - 5:00 PM </Text>
          </CardItem>
          <Button rounded block info style={{bottom:-60}}>
            <Text>JOIN QUEUE</Text>
            
          </Button>
      </Card>
      </View>


    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    left:20



  },

})  