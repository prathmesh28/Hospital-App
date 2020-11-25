import React, { Component } from "react"  

import {
    Text,
  SafeAreaView,
  Dimensions,
  StatusBar,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  View
} from "react-native"  
import { Container, Header, Left, Body, Right, Title, Icon } from 'native-base';
const { height, width } = Dimensions.get('screen')  

import AntDesignIcon from 'react-native-vector-icons/AntDesign'


export default class WelcomeScreen extends Component {
    // static navigationOptions = {
       
    //     animationEnabled: false,
    //   }



  render() {
   
    return (
   <View style={styles.container}>
      <StatusBar backgroundColor={'#2e86c1'} />

       <View style={{bottom:150,right:0,position:'absolute', display:'flex'}}>
       <TouchableOpacity style={{ display:'flex',alignItems:'flex-end', flexDirection: "row",}} onPress={() => this.props.navigation.navigate('Login')}>
       <Text style={{color:'black',fontSize:30}}>Welcome </Text>
       <AntDesignIcon size={30} color={'grey'} name="arrowright" />
       </TouchableOpacity>
       
       </View>
       
   </View>
    )  
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

})  

