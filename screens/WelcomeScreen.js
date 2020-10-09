import React, { Component } from "react"  
import Constants from 'expo-constants'

import {
    Text,
  SafeAreaView,
  Dimensions,
  StatusBar,
  ActivityIndicator,
  AsyncStorage,
  TouchableOpacity,
  StyleSheet,
  View
} from "react-native"  
import { Container, Header, Left, Body, Right, Title, Icon } from 'native-base';
const { height, width } = Dimensions.get('screen')  
import LottieView from 'lottie-react-native';
import { Asset } from 'expo-asset';

export default class WelcomeScreen extends Component {
    static navigationOptions = {
        headerShown: false
      }



  render() {
   
    return (
   <View style={styles.container}>
       {/* <StatusBar hidden
    //   barStyle={'dark-content'} translucent={true} backgroundColor={'#fff'}
       /> */}

       <View style={{bottom:150,right:0,position:'absolute', display:'flex'}}>
       <TouchableOpacity style={{ display:'flex',alignItems:'flex-end', flexDirection: "row",}} onPress={() => this.props.navigation.navigate('Login')}>
       <Text style={{color:'black',fontSize:30}}>Welcome </Text>
      <Icon type="FontAwesome" name="arrow-right" style={{fontSize: 30,}}/>
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

