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
  Button,
  View,
  ImageBackground
} from "react-native"  

const { height, width } = Dimensions.get('screen')  
import Firebase from '../firebase'

export default class ReportScreen extends Component {

  render() {
   
    return (
              <View style={styles.container}>
               {/* <ImageBackground source={require('../assets/i.png')} style={{resizeMode:"stretch",height:height}} > */}
                  <StatusBar hidden/>
                 
              

                  <Text style={{backgroundColor:"#87CEEB",width:width*1,textAlign:"center",padding:30,fontWeight:"bold"}}>ReportScreen</Text>
                  <View style={{padding:0,margin:0,borderColor:"black",elevation:3,width:width*0.9,height:height*.30,marginTop:20,alignSelf:"center"}}>
                  </View>
        
                <View style={{padding:10,width:width*0.9,marginTop:80}}>

                {/* <Button style={{backgroundColor:"#87CEEB"}} 
                title ="View Reports" 
                onPress={() =>this.props.navigation.navigate('Report')
                }
              //  console.log('dfghjlnb')
                
                > */}


                {/* </Button> */}
                <TouchableOpacity style={{padding:0,margin:0,alignSelf:"center",marginHorizontal:0,marginBottom:10,borderWidth:1,borderColor:"black",width:width*0.5,height:40 }} 
                      onPress={() =>this.props.navigation.navigate('Reports')}

                      >
                     <Text style={{fontWeight:"bold",textAlign:"center",marginTop:6}}>View Reports</Text> 
                </TouchableOpacity>
                </View>  
   {/* </ImageBackground> */}
   </View>
    )  
  }

  
}

const styles = StyleSheet.create({
  container: {
    // alignItems:"center",
    // height:height,
    flex: 1,
  
  },

})  