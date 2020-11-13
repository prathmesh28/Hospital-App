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
  Keyboard,
  KeyboardAvoidingView

} from "react-native"
const { height, width } = Dimensions.get('screen')
import Firebase from '../../firebase'
import { Container, Header, Content, Input, Item, Icon } from 'native-base';
import { LoginSvgOne } from './assets/SubtlePrismSvg'
import { LoginSvgTwo } from './assets/SubtlePrismSvg'
import Loader from '../Loader'

export default class Login extends Component {
 
  static navigationOptions = {
    headerShown: false
  }
  state = {
    email: '',
    password: '',
    errorMessage: null,
    loading: false,
    pass: false,
  }

  handleLogin = () => {

    this.setState({
      loading: true
    })
    const { email, password } = this.state

    Firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => this.setState({ errorMessage: error.message, loading: false }))

    
  }

  render() {

    return (



      <View style={styles.container}>

        <StatusBar backgroundColor={'#2e86c1'} translucent={true}/>
        <Loader loading={this.state.loading} />

        <KeyboardAvoidingView
    behavior={Platform.OS == "ios" ? "padding" : "height"}
  //  keyboardVerticalOffset={Platform.OS == "ios" ? 0 : 20}
    enabled={Platform.OS === "ios" ? true : false} 
    keyboardShouldPersistTaps='always' 
    onStartShouldSetResponder={Keyboard.dismiss}
    keyboardDismissMode='on-drag'
    style={{marginTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight,flex: 1, flexDirection: 'column',justifyContent: 'space-between',}}>
       
        
        <View style={{position:'relative'}}>
          <View style={{backgroundColor:'#2e86c1',height:height*0.14}} ></View>
          <View style={{backgroundColor:'#2e86c1',height:0,marginTop:-20}}>
          <LoginSvgOne width={width*1.01} height={height*0.15} color={'#2e86c1'} ></LoginSvgOne>
          </View>
        </View>



         <View>
           
           <View>
             <Text style={{ fontWeight: 'bold', fontSize: 40, top: 50, left: 30, color: '#2E86C1' }}>LOGIN</Text>
           </View>
           <View style={{ fontSize: 40, top: 90, width: width * 0.9, alignSelf: "center" }}>
             {this.state.errorMessage && (<Text style={styles.error}>{this.state.errorMessage}</Text>)}
            
            
             <Item rounded style={{ margin: 10 }}>
               <Icon active name='mail' style={{ color: '#21618C' }} />
               <Input
                placeholder="Email"
                label="Email"
                onChangeText={email => this.setState({ email })}
                defaultValue={this.state.email}
              />
            </Item>
            <Item rounded style={{ margin: 10 }}>
              <Icon active name='key' style={{ color: '#21618C' }} />
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
          <View style={{ fontSize: 40, top: 100, alignSelf: "flex-end", margin: 30 }}>
            <TouchableOpacity style={{ padding: 10, backgroundColor: '#3498DB', borderRadius: 100 }} onPress={() => this.handleLogin()}>
              <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}> LOGIN </Text>
            </TouchableOpacity>
          </View>

        </View>

         

         

        <View style={{height:height*0.2,flexDirection:'column-reverse'}}>
        <View style={{backgroundColor:'#2e86c1',height:height*0.07,marginTop:-20}} ></View>
          <LoginSvgTwo width={width*1.01} height={height*0.15} color={'#2e86c1'} />
         


        </View>

          
        </KeyboardAvoidingView>
      </View>
      

     
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  }
})  