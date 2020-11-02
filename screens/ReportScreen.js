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
import { withNavigation } from 'react-navigation';
const { height, width } = Dimensions.get('screen')  
import Firebase from '../firebase'
import MainSVG from '../TabBar/Main'

class ReportScreen extends Component {

  render() {
   
    return (
              <View style={styles.container}>
               <StatusBar backgroundColor={'#87CEEB'} />
               <MainSVG width={width} height={150}></MainSVG>
                 
              

               <Text style={{fontSize:20,fontWeight:"bold"}}>User Report</Text>
                  <View style={{borderColor:"black",elevation:3,
                    width:width*0.9,height:height*.30
                    }}>
                  </View>
        
                <View style={{padding:10,width:width*0.9,marginTop:80}}>

                {/* <Button style={{backgroundColor:"#87CEEB"}} 
                title ="View Reports" 
                onPress={() =>this.props.navigation.navigate('Report')
                }
              //  console.log('dfghjlnb')
                
                >


                </Button> */}
                <TouchableOpacity style={{padding:0,margin:0,alignSelf:"center",marginHorizontal:0,marginBottom:10,borderWidth:1,borderColor:"black",width:width*0.5,height:40 }} 
                      onPress={() =>this.props.navigation.navigate('Report')}

                      >
                     <Text style={{fontWeight:"bold",textAlign:"center",marginTop:6}}>View Reports</Text> 
                </TouchableOpacity>
                </View>  
   </View>
    )  
  }

  
}
export default withNavigation(ReportScreen);
const styles = StyleSheet.create({
  container: {
    backgroundColor:"#fff",
     alignItems:"center",
    // height:height,
    flex: 1,
  
  },

})  