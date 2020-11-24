import React, { Component } from "react"  
import {
 
  SafeAreaView,
  Dimensions,
  StatusBar,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,

  View,
  Image,
  ImageBackground
} from "react-native"  
import { withNavigation } from 'react-navigation';
import { Card, CardItem, Body, Text, Button } from 'native-base';


const { height, width } = Dimensions.get('screen')  

class History extends Component {

  state={
    data:null,
    Disease:""
  }
  componentDidMount(){
  }
  render() {


    
   
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={'#87CEEB'} />
        <Button  onPress={()=>this.props.navigation.navigate('Details',{data:this.props.navigation.state.params.data.data})}>
              <Text>your pharmacy</Text>

              </Button>
     
   </View>
    )  
  }

  
}
export default withNavigation(History);
const styles = StyleSheet.create({
  container: {
    backgroundColor:"#d3edf8",
    flex: 1,
  
  },

})  



// {
//   "navigation": {
//     "actions": {
//       "dismiss": [Function dismiss], 
//       "goBack": [Function goBack], 
//       "navigate": [Function navigate], 
//       "pop": [Function pop], 
//       "popToTop": [Function popToTop], 
//       "push": [Function push], 
//       "replace": [Function replace], 
//       "reset": [Function reset], 
//       "setParams": [Function setParams]
//     }, 
//     "addListener": [Function addListener], 
//     "dangerouslyGetParent": [Function anonymous], 
//     "dismiss": [Function anonymous], 
//     "dispatch": [Function anonymous], 
//     "emit": [Function emit], 
//     "getChildNavigation": [Function getChildNavigation], 
//     "getParam": [Function anonymous], 
//     "getScreenProps": [Function anonymous], 
//     "goBack": [Function anonymous], 
//     "isFirstRouteInParent": [Function isFirstRouteInParent], 
//     "isFocused": [Function isFocused], 
//     "navigate": [Function anonymous], 
//     "pop": [Function anonymous], 
//     "popToTop": [Function anonymous], 
//     "push": [Function anonymous], 
//     "replace": [Function anonymous], 
//     "reset": [Function anonymous], 
//     "router": undefined, 
//     "setParams": [Function anonymous], 
//     "state": {
//       "key": "id-1606124128349-4", 
//       "params": [Object], "routeName": "History"
//     }
//   }, 
//   "screenProps": undefined
// }