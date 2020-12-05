import { Button, Card, CardItem,} from "native-base"
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
 import Icon from 'react-native-vector-icons/Fontisto';
 import Icon1 from 'react-native-vector-icons/Ionicons';

export default class Appointment extends Component {


  render() {

    return (
      <View style={styles.container}>
          <View style={{alignSelf:"center"}}>
              <Text style={{fontSize:25}}>Appointment</Text>
          </View>
        <Text style={{ fontSize: 20,marginTop:30 }}>{this.props.navigation.state.params.data.name} </Text>
        
        <Button  rounded bordered primary style={{width:100,marginTop:30}}>
    <Text>{'\t'}</Text>
          <Icon1 style={{ fontSize: 18 }} name="call-outline"/>
            <Text>  contact  </Text></Button>
        
        
      
      <Card style={{width:width*0.4,alignSelf:"flex-start",borderRadius:15,marginTop:20}}>
        
     <CardItem  style={{borderRadius:15,backgroundColor:'#ffff',}}>
     <Icon style={{ fontSize: 18 }} name="date" />
    <Text>{'\t'}{new Date().toLocaleDateString()}</Text>
            
            {/* <Divider style={{ backgroundColor: 'blue' }} />; */}
        </CardItem> 
        
      </Card>
      
       
     {/* <Card style={{width:width*0.4,borderRadius:20,height:30}}>
                <CardItem style={{borderRadius:15}}>
             <Text>select Date</Text>
             </CardItem>
             
         
     </Card> */}
      
     

        
            
        
      
        
      

      <Card style={{
        padding: 5, width: width * .85, borderRadius: 10,height:height*0.2,marginTop:20
      }}>
          <CardItem>
          <Icon1 style={{ fontSize: 18 }} name="time-outline" />
    <Text>{'\t'}{this.props.navigation.state.params.data.workFrom} - {this.props.navigation.state.params.data.workTo} </Text>
          </CardItem>
          <Button rounded block info style={{bottom:-30}}>
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