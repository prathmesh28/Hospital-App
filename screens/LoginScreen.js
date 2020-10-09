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
  Text,
  ImageBackground,
  Button,
  
} from "react-native"  
const { height, width } = Dimensions.get('screen')  
import Firebase from '../firebase'
import { Container, Header, Content, Input, Item,Icon } from 'native-base';
import { image } from "d3"
export default class Login extends Component {
  static navigationOptions = {
    headerShown: false
  }
  state = {
    email: '',
    password: '',
    errorMessage: null,
    loading: false,
    pass: false
  } 

  handleLogin = () => {
   
    const { email, password } = this.state  

    Firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => this.setState({ errorMessage: error.message }))  
    
  }  

  render() {
   
    return (
     
      
     
   <View style={styles.container}>
      
      <StatusBar hidden/>
      <ImageBackground source={require('../assets/unnamed.jpg')} style={{...styles.image,top:0,transform: [{ rotate: '180deg' }]}}>
      </ImageBackground>
      <ImageBackground source={require('../assets/unnamed.jpg')} style={{...styles.image,bottom:-30}}>
      </ImageBackground>
      <View>
        <View>
          <Text style={{ fontWeight: 'bold',fontSize:40,top:250,left:30,color:'#2E86C1' }}>LOGIN</Text>
          
        </View>

        <View style={{ fontSize:40,top:300,width:width*0.9,alignSelf:"center" }}>
        {this.state.errorMessage && (<Text style={styles.error}>{this.state.errorMessage}</Text>)}
          <Item rounded style={{margin:10}}>
            <Icon active name='mail'  style={{color:'#21618C' }} />
            <Input
                placeholder="Email"
                label="Email"
                onChangeText={email => this.setState({ email })}
                defaultValue={this.state.email}
            />
          </Item>
          <Item rounded style={{margin:10}}>
            <Icon active name='key'  style={{color:'#21618C' }} />
            <Input
              secureTextEntry={true}
              textContentType="password"
              placeholder="Password"
              label="Password"
              onChangeText={password => this.setState({ password })}
              defaultValue={this.state.password}
            />
          </Item>
        </View>
          
        <View style={{ fontSize:40,top:300,alignSelf:"flex-end",margin:30 }}>
          <TouchableOpacity style={{padding:20,backgroundColor:'#3498DB',borderRadius:100}}  onPress={() => this.handleLogin()}>
            <Text style={{color:'#fff',fontSize:20,fontWeight:'bold'}}> LOGIN </Text>
          </TouchableOpacity>
        </View>
        </View>
      
   </View>
    )  
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fff',
  
  },
  image: {
    flex: 1,
    width:width,
    height:height/2,
    position:"absolute",
    
  },

})  