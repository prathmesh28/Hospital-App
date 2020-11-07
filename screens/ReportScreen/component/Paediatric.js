import React, { Component } from "react"  

import {
    Text,
  SafeAreaView,
  Dimensions,
  StatusBar,
  ActivityIndicator,
  AsyncStorage,
  TouchableOpacity,
  StyleSheet,
  Button,
  View,
  ImageBackground
} from "react-native"  
import { withNavigation } from 'react-navigation';
const { height, width } = Dimensions.get('screen')  

export default class Peadiatric extends Component {

  componentDidMount(){
  }
  render() {
   
    return (
              <View style={styles.container}>
   <Text>Peadiatric</Text>
   </View>
    )  
  }

  
}
const styles = StyleSheet.create({
  container: {
  
    flex: 1,
  
  },
 
})  