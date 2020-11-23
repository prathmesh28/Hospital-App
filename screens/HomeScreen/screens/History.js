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
        <Button  onPress={()=>this.props.navigation.navigate('Details')}>
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