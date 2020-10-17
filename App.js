import React from "react"
import { createAppContainer, createSwitchNavigator } from "react-navigation"
import { createStackNavigator } from "react-navigation-stack"

import LoadingScreen from "./screens/LoadingScreen"
import LoginScreen from "./screens/LoginScreen"
import Appstack from './TabNavigation/App'
import WelcomeScreen from './screens/WelcomeScreen'
import { AppLoading } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import UserReport from './screens/UserReport'
const AuthStack = createStackNavigator({
    Intro:WelcomeScreen,
    Login: LoginScreen,
}) 

// const UserStack = createStackNavigator({
//   UReport:UserReport

// })
const Container = createAppContainer(

    createSwitchNavigator(
        {
            Loading: LoadingScreen,
            Auth: AuthStack,
            App: Appstack,
            Report: UserReport
            
        },
        {
            initialRouteName: "Loading"
        }
    )
) 
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