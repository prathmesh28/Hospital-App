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
  FlatList,
  View,
  ImageBackground
} from "react-native"  
import { Container, Header, Content, Card, CardItem, Body, Text } from 'native-base';
const { height, width } = Dimensions.get('screen')  
import Firebase from '../firebase'
const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];
export default class HomeScreen extends Component {


  renderItem = ({item}) => {
    return( 
      <Card style={{padding:10,width:width*0.9}}>
            <CardItem >
              <Body>
                <Text>
                   {item.title}
                </Text>
              </Body>
            </CardItem>
          </Card>
  )
}
  render() {
    return (
   <View style={styles.container}>
      <StatusBar hidden />
      {/* background not working  */}
      <ImageBackground  source={'../assets/i.png'} style={{flex:1,resizeMode:"cover",}}> 

      <View>
        <View style={{
          //backgroundColor:'#7ec0ee',
          width:width,height:height*0.2,borderBottomWidth:1,borderBottomColor:'grey',
          justifyContent:"center",marginLeft:20}}>
        <Text style={{fontSize:20}}>
          Hello, {'\n'}<Text style={{fontSize:30,fontWeight:"bold"}}>Prathmesh!</Text>
        </Text>
        </View>
        <View style={{alignItems:"center"}}>
        <FlatList
        data={DATA}
        renderItem={this.renderItem}
        keyExtractor={item => item.id}
      />
        </View>
      </View>
      </ImageBackground>
   </View>
    )  
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fff'
  },

})  