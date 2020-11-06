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
  FlatList,Image,ImageBackground,
  Text
} from "react-native"  

export default class Notification extends Component {


  render() {
   
    return (
            <View style={styles.container}>
                <Text style={{fontSize:30}}>Notification</Text>
            </View>
                  
    
    )  
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent:"center"
    

  
  },

})  