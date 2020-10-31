import React from "react"
import { createAppContainer, createSwitchNavigator } from "react-navigation"
import { createStackNavigator } from "react-navigation-stack"

import LoadingScreen from "./screens/LoadingScreen"
import LoginScreen from "./screens/LoginScreen"
import WelcomeScreen from './screens/WelcomeScreen'
import { AppLoading } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import TabScreen from "./TabBar/App"
import Report from "./screens/Reports"
import Notification from "./screens/Notification"
import Appointment from "./screens/Appointment"
const AuthStack = createStackNavigator({
    Intro:WelcomeScreen,
    Login: LoginScreen,
}) 
const TabStack = createStackNavigator({
  Apptab:TabScreen,
  Report:Report,
  Notification:Notification,
  Appointment:Appointment
},
{
  header: null,
  headerMode: 'none'
}); 
const Container = createAppContainer(

    createSwitchNavigator(
        {
          
            Loading: LoadingScreen,
            Auth: AuthStack,
            App:TabStack
            // App:TabScreen,
            // Report:Report

            
        },
        {
            initialRouteName: "Loading"
        }
    )
 ) ;  
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          isReady: false,
        };
      }
      async componentDidMount() {
        await Font.loadAsync({
          Roboto: require('native-base/Fonts/Roboto.ttf'),
          Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
          ...Ionicons.font,
        });
        this.setState({ isReady: true });
      }
    render() {
        if (!this.state.isReady) {
            return <AppLoading />;
          }
          return <Container/>
    }
  }
  
  export default App