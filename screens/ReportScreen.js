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

const { height, width } = Dimensions.get('screen')  
import Firebase from '../firebase'

export default class ReportScreen extends Component {

  render() {
   
    return (
   <View style={styles.container}>
       <Text>ReportScreen</Text>
   </View>
    )  
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  
  },

})  