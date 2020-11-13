import React from "react";
import { View, Text, ActivityIndicator,StatusBar,Dimensions, StyleSheet } from "react-native";
import Firebase from '../firebase';
const {width, height} = Dimensions.get("window");

export default class LoadingScreen extends React.Component {

    componentDidMount() {
     

        Firebase.auth().onAuthStateChanged(user => {

                
                if(user){
                    this.props.navigation.navigate("App", { user:'user' })
                }else{
                    this.props.navigation.navigate("Auth")
                }

        })
        // console.log(this.state.user)


    }

    render() {
        return (
            <View style={styles.container}>
      <StatusBar backgroundColor={'#87CEEB'} />
                
                    <Text>Loading App...{'\n'}
                        </Text>
                        <Text style={{textAlign:"center"}}>
                      If app is not loading please check your internet connection or restart the app.</Text>
                <ActivityIndicator size="large"></ActivityIndicator>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width:width,
        paddingHorizontal:20,
        justifyContent: "center",
        alignItems: "center",
        alignSelf:"center",
        backgroundColor:'#d3edf8'
    }
});