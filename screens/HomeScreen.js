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
import RNUrlPreview from 'react-native-url-preview';
// import Bgimg from '../assets/Bgimg.svg'
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
      {/* <ImageBackground  source={'../assets/i.png'} style={{flex:1,resizeMode:"cover",}}>  */}

      <View>
        {/* <ImageBackground source={Bgimg} width={width}> */}

        
        <View style={{
          
          //backgroundColor:'#7ec0ee',
          width:width,height:height*0.2,borderBottomWidth:1,borderBottomColor:'grey',
          justifyContent:"center",marginLeft:20}}>
        <Text style={{fontSize:20}}>
          Hello, {'\n'}<Text style={{fontSize:30,fontWeight:"bold"}}>Prathmesh!</Text>
        </Text>
        <Text style={{fontSize:17,bottom:0,alignContent:"space-between",color:'#a9a9a9'}}>
          How're you today?
        </Text>
        </View>
        {/* </ImageBackground> */}
        <View style={{width:width*0.9,alignSelf:"center",padding:10}}>
        <Card style={{padding:0,borderRadius:20,elevation:4,borderColor:'#7ec0ee4d'}}>
            <CardItem style={{padding:0,borderRadius:20, elevation:0,backgroundColor:'#7ec0ee66',borderColor:'#7ec0ee4d',borderWidth:1}}>
              <Body>
                <Text style={{fontSize:20,fontWeight:"900",alignSelf:'center'}}>
                   Your next appointment is on
                </Text>
                <Text style={{fontSize:20,fontWeight:"bold",alignSelf:'center'}}>
                  13 October 2020
                </Text>
              </Body>
            </CardItem>
          </Card>
        </View>
        <View style={{width:width*0.9,alignSelf:"center",padding:10}}>
        <Card style={{padding:0,borderRadius:20,elevation:4,borderColor:'#7ec0ee4d'}}>
            <CardItem 
              style={{padding:0,borderRadius:20, elevation:0,alignContent:"center",
              backgroundColor:'white',borderColor:'#7ec0ee4d',borderWidth:1}}>
              <Body>
                
               
         
            <RNUrlPreview
                text={'https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public'} 
                titleStyle={styles.linktitle}
                titleNumberOfLines={3}
              containerStyle={styles.linkcontainer}
              imageStyle={styles.linkimage}
              descriptionStyle={styles.discript}
              descriptionNumberOfLines={4}
            />
               
              </Body>
            </CardItem>
          </Card>
        </View>
        <View style={{alignItems:"center"}}>
        <FlatList
        data={DATA}
        renderItem={this.renderItem}
        keyExtractor={item => item.id}
      />
        </View>
      </View>
      {/* </ImageBackground> */}
   </View>
    )  
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#87ceeb'
  },
 
 
  linktitle: {
  //  textAlign:"center",
    fontWeight: "bold",
    fontSize:17
  },
  linkcontainer: {
   // fontSize:15,
    backgroundColor: "transparent",
  },
  linkimage: {
    display: "none",
  },
  discript: {
    
    
    padding:1
    //dont remove
  },
  
 

})  