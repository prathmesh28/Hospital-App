import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, StatusBar,Dimensions, ImageBackground } from "react-native";
import Firebase from '../firebase';
import { Container, Header, Content, Card, CardItem, Body, Left,Button, Row} from 'native-base';
const { height, width } = Dimensions.get('screen')  
import Constants from 'expo-constants'
import { withNavigation } from "react-navigation";


export default class ProfileScreen extends React.Component {

    signOutUser = () => {
        Firebase.auth().signOut();
    };
    render() {
        return (
           
            <View style={styles.container}>
                {/* <ImageBackground source={require('../assets/i.png')} style={{resizeMode:"stretch"}}>  */}
                <StatusBar hidden/>

                <View style={{alignItems:"center",width:width,height:height*0.06,backgroundColor:"#87CEEB",padding:10,marginTop:0}}>
                        <Text style={{fontWeight:"bold"}}>  User Profile</Text>
                </View>

        
                {/* <Card style={{padding:5,width:width*.9,alignSelf:"center",height:height*.16,marginTop:25}}>
                <CardItem  >
                <Body> */}
                <View style={{padding:5,borderColor:"black",elevation:1,marginTop:height*.06,alignSelf:"center",width:width*0.9,height:height*0.2}}>
                    <Text style={{marginHorizontal:10,fontWeight:"bold",color:"black",fontSize:24}}>Jay Sawant </Text>
                    <Text  style={{marginHorizontal:10,marginTop:15,fontSize:16,color:"black"}}>+91 9897909786</Text>
                    <Text style={{marginHorizontal:10,marginTop:15,fontSize:16,color:"black"}}>jaysawant@gmail.com </Text>
                </View>
                
                {/* </Body>
                </CardItem >
                </Card> */}
                <View style={{padding:5,borderColor:"black",elevation:1,marginTop:height*.02,alignSelf:"center",width:width*0.9,height:height*0.1}}>
                

                            <TouchableOpacity 
                                style={{margin:0,alignSelf:"center",height:height*0.05,borderBottomWidth:1,borderColor:"black",width:width*0.9 }}
                                 onPress={() =>this.props.navigation.navigate('Notification')}

                                
                                >

                            <Text style={{fontWeight:"bold",fontSize:18,color:"black",marginTop:0,marginHorizontal:10,marginTop:10}}>Notifications</Text> 
                            </TouchableOpacity>

                </View>
  
           
                <View style={{padding:5,borderColor:"black",elevation:1,marginTop:height*0.04,height:height*0.15,alignSelf:"center",width:width*0.9}}>
                
                    <Text style={{fontSize:20,fontWeight:"bold",marginHorizontal:10,borderBottomColor:"black",borderBottomWidth:1,marginTop:10,color:"black"}}>About Us</Text>
                    {/* <Text style={{fontSize:18,fontWeight:"bold",marginHorizontal:10,marginTop:10,color:"#87CEEB"}}>Contact</Text> */}
                    <Text style={{fontSize:16,fontWeight:"bold",marginHorizontal:10,marginTop:10,color:"#87CEEB"}}>Vision Hospital</Text>
                    <Text style={{fontSize:14,fontWeight:"bold",marginHorizontal:10,marginTop:10,color:"#87CEEB"}}>mapusa,Goa</Text>

                </View>
            
           
                <View style={{padding:0,marginTop:height*0.02,borderColor:"black",elevation:3,alignSelf:"center",width:width*0.9}}>
                        {/* <Text style={{fontWeight:"bold",textAlign:"center",marginTop:6}}></Text>  */}
          
                      <TouchableOpacity style={{padding:0,alignSelf:"center",marginHorizontal:0,borderColor:"black",width:width*0.9,height:50 }} onPress={this.signOutUser}>
                         <Text style={{fontWeight:"bold",textAlign:"center",marginTop:18,color:"#87CEEB"}}>Logout</Text> 
                      </TouchableOpacity>
                
                </View>
           {/* </Body>
            </CardItem >
              
            </Card> */}
               
            
            {/* <Text>Profile </Text> */}
            {/* </ImageBackground>  */}
            </View>

            
        
               
           
        );
        
    }
//     render(){
//         return <AppContainer />;  
//  }
}

// const AppNavigator = createStackNavigator(  
//     {  
          
//         notifications: Notification
//     },  
//     {  
//         initialRouteName: "Loading"  
//     }  
// );
// const AppContainer = createAppContainer(AppNavigator);  
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor:"#87ceeb"
    }
});
