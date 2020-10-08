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
  Text
} from "react-native"  
const { height, width } = Dimensions.get('screen')  
import Firebase from '../firebase'
import { Container, Header, Content, Input, Item, Button } from 'native-base';
export default class Login extends Component {

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
       <Content>
          <Item regular>
           
              <Input
                  placeholder="Email"
                  label="Email"
                  onChangeText={email => this.setState({ email })}
                  defaultValue={this.state.email}
                />
                </Item>
                <Item regular>
                <Input
                  secureTextEntry={true}
                  textContentType="password"
                  placeholder="Password"
                  label="Password"
                  onChangeText={password => this.setState({ password })}
                  defaultValue={this.state.password}
                />
            

          </Item>
          <Button onPress={() => this.handleLogin()}>
            <Text>Login</Text>
          </Button>
        </Content>
   </View>
    )  
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  
  },

})  