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
  FlatList
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
export default class DoctorScreen extends Component {
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
         <StatusBar hidden/>
       <View style={{alignItems:"center"}}>
       <FlatList
        data={DATA}
        renderItem={this.renderItem}
        keyExtractor={item => item.id}
      />
       </View>
   </View>
    )  
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  
  },

})  