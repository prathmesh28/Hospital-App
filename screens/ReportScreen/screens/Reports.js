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
import { withNavigation } from 'react-navigation';

class Reports extends Component {


  render() {
   
    return (
            <View style={styles.container}>
                <Text>Reports</Text>
            </View>
                  
    
    )  
  }
}
export default withNavigation(Reports);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  

  
  },

})  