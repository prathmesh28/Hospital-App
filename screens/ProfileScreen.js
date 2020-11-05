import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, StatusBar,Dimensions, ImageBackground,Image } from "react-native";
import Firebase from '../firebase';
import { Container, Header, Content, Card, CardItem, Body, Left,Button, Row} from 'native-base';
const { height, width } = Dimensions.get('screen')  
import Constants from 'expo-constants'
import { withNavigation } from "react-navigation";
import MainSVG from '../TabBar/Main'
import NotificationSvg from "../assets/NotificationSvg"
import RightArrowSvg from "../assets/RigthArrowSvg"
import ProfileUserSvg from "../assets/ProfileUserSvg"
import InformationSvg from "../assets/InformationSvg";
import ProfileSvg from "../assets/LogoutSvg"
import LogoutSvg from "../assets/LogoutSvg";
import { style } from "d3";

class ProfileScreen extends React.Component {

    signOutUser = () => {
        Firebase.auth().signOut();
    };
    render() {
        return (
           
            <View style={styles.container}>
                <StatusBar backgroundColor={'#87CEEB'} />
                    <MainSVG width={width} height={150}></MainSVG>

                <View style={{alignItems:"center",width:width,marginTop:-15}}>
                    <ProfileUserSvg />
                        {/* <Text style={{fontWeight:"bold",fontSize:20}}>  User Profile</Text> */}
                </View>

        
               
                <View style={styles.UserdetailStyle}>
                    <Text style={{marginHorizontal:10,fontWeight:"bold",color:"black",fontSize:24}}>Jay Sawant </Text>
                    <Text  style={{marginHorizontal:10,marginTop:15,fontSize:16,color:"black"}}>+91 9897909786{'\n'}{'\n'}
                    jaysawant@gmail.com </Text>
                </View>
                
             
                
                <View style={{padding:3,borderColor:"#87ceeb",marginTop:height*0.035,borderWidth:1,borderRadius:19,alignSelf:"center",width:width*0.9,height:height*0.05}}>
                

                            <TouchableOpacity 
                                style={{margin:0,alignSelf:"center",height:height*0.06,width:width*0.9 }}
                                 onPress={() =>this.props.navigation.navigate('Notification')}

                                
                                >
                             
                             <NotificationSvg ></NotificationSvg>                              
                            <Text style={{fontWeight:"bold",fontSize:22,color:"black",marginTop:-24,marginHorizontal:50}}>Notifications</Text> 
                            
                            <RightArrowSvg />
                            
                          </TouchableOpacity>

                </View>
                
  
           
                <View style={{
                
                alignSelf:"flex-start",
                    marginTop:height*0.04,
               
                 marginHorizontal:30,
                 
                    }}>
                   
                   <View style={styles.AboutUsStyle}>
                    <View style={{display:'flex',flexDirection:'row'}}>
                   <InformationSvg marginTop={70}/>  
                    <Text style={{fontSize:22,fontWeight:"bold",
                       
                        color:"black"}}>{'\t'}
                            
                        About Us {'\n'}
                        

                        </Text>
                    </View>
                    
                <Text style={{fontSize:16,fontWeight:"bold"}}>{'\t'} {'\t'}{'\t'}Vision Hospital{'\n'}{'\n'}
                    <Text style={{fontSize:16}}>{'\t'}{'\t'}{'\t'}mapusa,Goa</Text></Text>

                </View>
                </View>
            
           
                <View style={styles.LogoutStyles}>
                      
          
                      <TouchableOpacity style={{alignSelf:"center",display:"flex",flexDirection:"row",width:width*0.4,height:50 }} onPress={this.signOutUser}>
                         
                         <Text style={{fontWeight:"bold",alignSelf:"center",marginTop:5,marginHorizontal:35,color:"black"}}>Logout</Text> 
                         <View style={{marginTop:14,
                           // marginHorizontal:80
                            }}>
                         <LogoutSvg/>
                         </View>
                      </TouchableOpacity>
                      
                
                </View>
           
               
            
    
            </View>

            
        
               
           
        );
        
    }

}


export default withNavigation(ProfileScreen);
const styles = StyleSheet.create({
    container: {
        flex: 1,
       
        backgroundColor:"#fff"
    },
    UserdetailStyle: {
        padding:5,
        alignSelf:"center",
        width:width*0.7,
        height:height*0.17,
         marginTop:height*0.01,
        //  elevation:1,
        //   borderWidth:2,
         borderColor:"#87ceeb",
        //  borderRadius:6,
         alignItems:"center",
         borderBottomWidth:1
    },

    AboutUsStyle:{
        borderColor:"black",
        width:width*0.85,
        height:height*0.18,
        padding:15,
        borderRadius:8,
        borderWidth:1,
    },
    LogoutStyles: {
        marginTop:height*0.02,
        borderColor:"black",
        alignSelf:"center",
        width:width*0.4,
        borderRadius:14,
        borderWidth:1
    }
    
    
    
    


});
