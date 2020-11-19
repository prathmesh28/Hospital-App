import React, { Component } from "react"

import {
  SafeAreaView,
  Dimensions,
  StatusBar,
  ActivityIndicator,
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
import { Container, Header, Content, Input, Item, Icon } from 'native-base';
import { LoginSvgOne } from './assets/SubtlePrismSvg'
import { LoginSvgTwo } from './assets/SubtlePrismSvg'
import Loader from '../Loader'
import auth from '@react-native-firebase/auth';

export default class Login extends Component {
  _isMounted = false;
  static navigationOptions = {
    headerShown: false
  }
  state = {
    email: '',
    password: '',
    phone: '',
    code: '',
    errorMessage: null,
    loading: false,
    pass: false,

   userAcc:false,

    user:null,
    Confirm:null,
     
    confirmResult:null,
    account:false
  }
  componentDidMount(){
    this._isMounted = true;
    // if(this.props.navigation.state.params.user){
    //   this.setState({data:this.props.navigation.state.params.user})
    // }

  }
  handleLogin = async() => {
    if (this._isMounted) {
    this.setState({
      loading: true,
     userAcc:true
    })
  }
    const { email, password } = this.state

   
    await auth()
      .signInWithEmailAndPassword(email, password)
      .then(async(emailDone) => {
          this.setState({
            loading: false,
          })
          // await auth().verifyPhoneNumber(+919763049159)
          // .then((confirmResult) => {
          //   this.setState({ confirmResult })
          // })
          // .catch((error) => {
          //   const { code, message } = error;
          //   console.log('phone:',error)
          // });

        
      })
      .catch(error => {
        if (this._isMounted) {
          this.setState({ errorMessage: error.message, loading: false, 
            userAcc:false
          })
        }
      })







     
    
  }


 

  


  verifyPhoneNumber = async() => {
    const { phoneNumber } = this.state;
    await auth().verifyPhoneNumber(+919763049159)
      .then((confirmResult) => {
        // This means that the SMS has been sent to the user
        // You need to:
        //   1) Save the `confirmResult` object to use later
        this.setState({ confirmResult });
        //   2) Hide the phone number form
        //   3) Show the verification code form
      })
      .catch((error) => {
        const { code, message } = error;
        // For details of error codes, see the docs
        // The message contains the default Firebase string
        // representation of the error
      });
  }
  confirmCode = () => {
    const { confirmResult, verificationCode } = this.state;
    confirmResult.confirm('123456')
      .then((user) => {
        console.log('looges in')
        // If you need to do anything with the user, do it here
        // The user will be logged in automatically by the
        // `onAuthStateChanged` listener we set up in App.js earlier
      })
      .catch((error) => {
        const { code, message } = error;
        console.log(error)
        // For details of error codes, see the docs
        // The message contains the default Firebase string
        // representation of the error
      });
  }
  componentWillUnmount() {
    this._isMounted = false;
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
    style={{flex: 1, flexDirection: 'column',justifyContent: 'space-between',}}>
       
        
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
                onChangeText={email => {
                  if (this._isMounted) {
                    this.setState({ email })
                  }
                }}
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
                onChangeText={password => {
                  if (this._isMounted) {
                    this.setState({ password })
                  }
                }}
                defaultValue={this.state.password}
              />
            </Item>
            <Item rounded style={{ margin: 10 }}>
           <Icon active name='md-phone-portrait' style={{ color: '#21618C' }} />
           <Input
            placeholder="Phone"
            label="Phone"
            onChangeText={phone => {
              if (this._isMounted) {
                this.setState({ phone })
              }
            }}
            defaultValue={this.state.phone}
          />
        </Item>
          </View>
          {this.state.confirmResult && <Item rounded style={{ margin: 10,top:90 }}>
                  <Icon active name='md-phone-portrait' style={{ color: '#21618C' }} />
                  <Input
                  placeholder="code"
                  label="code"
                  onChangeText={code => {
                    if (this._isMounted) {
                      this.setState({ code })
                    }
                  }}
                  defaultValue={this.state.code}
                />
     </Item>}
           
          <View style={{ fontSize: 40, top: 100, alignSelf: "flex-end", margin: 30 }}>
          {/* {this.state.userAcc?
          <>
          {this.state.confirmResult?<TouchableOpacity style={{ padding: 10, backgroundColor: '#3498DB', borderRadius: 100 }} onPress={() => this.confirmCode()}>
              <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}> Code </Text>
            </TouchableOpacity>:
            <TouchableOpacity style={{ padding: 10, backgroundColor: '#3498DB', borderRadius: 100 }} onPress={() => this.verifyPhoneNumber()}>
            <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}> Phone Auth </Text>
          </TouchableOpacity>}
          
            </>
            : */}
            <TouchableOpacity style={{ padding: 10, backgroundColor: '#3498DB', borderRadius: 100 }} onPress={() => this.handleLogin()}>
              <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}> LOGIN </Text>
            </TouchableOpacity>
             {/* } */}
         
          {this.state.confirmResult && <TouchableOpacity style={{ padding: 10, backgroundColor: '#3498DB', borderRadius: 100 }} onPress={() => this.confirmCode()}>
              <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}> Code </Text>
            </TouchableOpacity>}
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

