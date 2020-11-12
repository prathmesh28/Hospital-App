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
  Keyboard

} from "react-native"
const { height, width } = Dimensions.get('screen')
import Firebase from '../../firebase'
import { Container, Header, Content, Input, Item, Icon } from 'native-base';
import { LoginSvgOne } from './assets/SubtlePrismSvg'
import { LoginSvgTwo } from './assets/SubtlePrismSvg'

export default class Login extends Component {
  state = {
    isKeyboadVisible: false,

  };
  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this._keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this._keyboardDidHide
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow = () => {
    this.setState({
      isKeyboadVisible: true
    });
  };

  _keyboardDidHide = () => {
    this.setState({
      isKeyboadVisible: false
    });
  };

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

        <StatusBar backgroundColor={'#87CEEB'} />
        <View
          style={{
            backgroundColor: '#2e86c1',
            height: 70
          }}
        >
        </View>

        <View style={{ marginTop: 0 }}>
          <LoginSvgOne width={width} color={'#2e86c1'} height={94} />

        </View>

        {!this.state.isKeyboadVisible && (
          <View style={{ bottom: 0, position: 'absolute', left: 0, right: 0, flex: 1 }}>
            <LoginSvgTwo width={width} height={94} color={'#2e86c1'} />
          </View>

        )}


        <View>
          <View>
            <Text style={{ fontWeight: 'bold', fontSize: 40, top: 100, left: 30, color: '#2E86C1' }}>LOGIN</Text>

          </View>
          <View style={{ fontSize: 40, top: 150, width: width * 0.9, alignSelf: "center" }}>

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


          <View style={{ fontSize: 40, top: 150, alignSelf: "flex-end", margin: 30 }}>
            <TouchableOpacity style={{ padding: 20, backgroundColor: '#3498DB', borderRadius: 100 }} onPress={() => this.handleLogin()}>
              <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}> LOGIN </Text>
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
    backgroundColor: '#fff',

  }
})  