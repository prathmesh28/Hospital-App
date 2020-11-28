import React from "react";
import { View,  StyleSheet, TouchableOpacity, StatusBar, Dimensions, ImageBackground, Image,Text,ScrollView,Button } from "react-native";
// import Firebase from '../../firebase';
import { Container, Header, Content, Card, CardItem, Body, Left, Row, Right, Fab, Icon } from 'native-base';
const { height, width } = Dimensions.get('screen')
import { withNavigation } from "react-navigation";
import MainSVG from '../../TabBar/Main'
import auth from '@react-native-firebase/auth'

import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontistoIcon from 'react-native-vector-icons/Fontisto'


class ProfileScreen extends React.Component {
  state = {
      data: [],
      Name: '',
      PhoneNo: '',
      Email: ''
  }
  componentDidMount() {
    const data = this.props.data.data
  }

  signOutUser = () => {
    auth().signOut();
  }
  render() {
    const data = this.state.data
    // console.log(this.state.data.data)
    const Name = this.props.data.data.Name
    const Phone = this.props.data.data.Phone
    const Address = this.props.data.data.Address
    const Email = this.props.data.data.Email
    const Disease = this.props.data.data.Disease
    const Doctor = this.props.data.data.Doctor

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={'#87CEEB'} />
        <View style={{flex:1,flexDirection:'column'}}>
          <ScrollView style={{ marginTop:50,marginBottom:60 }}>
            <View style={{height:100}}>
              {/* empty space top */}
            </View>
            <Card style={{width:width*0.9,alignSelf:"center",borderTopLeftRadius:20,borderTopRightRadius:20}}>
              <CardItem header bordered style={{borderTopStartRadius:20,borderTopEndRadius:20,backgroundColor:'#45b3e0'}}>
                <Text style={{color:'#fff',fontWeight:'bold',fontSize:20}}>Edit Account</Text>
                <Right style={{ right:-20 }}>
                  <TouchableOpacity  onPress={()=>{ alert('Edit account.');}}>
                  <AntDesignIcon size={20} color={'white'} name="edit" />
                  </TouchableOpacity>
                </Right>
              </CardItem>
            
              <CardItem bordered button onPress={() => { }}>
                <AntDesignIcon size={20} name="user" />
                <Text>&nbsp; {Name}</Text>
               
              </CardItem>

              <CardItem bordered button onPress={() => { }}>
                <AntDesignIcon size={20} name="phone" />
                <Text>&nbsp; {Phone}</Text>
               
              </CardItem>

              <CardItem bordered button onPress={() => { }}>
                <AntDesignIcon size={20} name="mail" />
                <Text>&nbsp; {Email}</Text>
               
              </CardItem>

              <CardItem bordered button onPress={() => { }}>
                <EntypoIcon size={20} name="location" />
                <Text>&nbsp; {Address}</Text>
               
              </CardItem>
              
            </Card>
            
            <Card style={{width:width*0.9,alignSelf:"center",borderRadius:20,marginTop:20}}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Notification')}>
                <CardItem header bordered style={{borderRadius:20}} onPress={() => this.props.navigation.navigate('Notification')}>
                  <MaterialIcons size={20} name="notifications-none" />
                  <Text style={{color:'#000',fontWeight:'bold',fontSize:15}}> &nbsp; Notifications</Text>
                 
                </CardItem>
              </TouchableOpacity>
            </Card>
          
            <Card style={{width:width*0.9,alignSelf:"center",borderTopLeftRadius:10,borderTopRightRadius:10,marginTop:20}}>
              <CardItem header bordered style={{borderTopStartRadius:10,borderTopEndRadius:10,backgroundColor:'#45b3e0'}}>
                <Text style={{color:'#fff',fontWeight:'bold',fontSize:15}}>Patient data</Text>
              </CardItem>
            
              <CardItem bordered button>
                <FontistoIcon size={20} name="bed-patient" />
                <Text> &nbsp; {Disease}</Text>
              </CardItem>

              <CardItem bordered button >
                <FontistoIcon size={20} name="doctor" />
                <Text> &nbsp; {Doctor} </Text>
              </CardItem>
            </Card>
      
            <Card style={{width:width*0.9,alignSelf:"center",borderTopLeftRadius:10,borderTopRightRadius:10,marginTop:20}}>
              <CardItem header bordered style={{borderTopStartRadius:10,borderTopEndRadius:10,backgroundColor:'#45b3e0'}}>
                <Text style={{color:'#fff',fontWeight:'bold',fontSize:15}}>About Us</Text>
              </CardItem>

              <CardItem  button >
                <FontistoIcon size={20} name="hospital" />
                <Text> Hospital Name</Text>
              </CardItem>
              <CardItem  button >
                <Text> Hospital Address </Text>
              </CardItem>
            </Card>

            <View style={{height:50}}>
              {/* bottom space */}
            </View>
          </ScrollView>
        </View>
                   
        <View style={{ backgroundColor: '#87CEEB', height: 50,position:"absolute" }}>
          <MainSVG width={width} height={150}></MainSVG>
          <Text style={{fontSize:25,position:"absolute",marginLeft:20,top:40,color:'#171717',fontWeight:'400'}}>
            Profile
          </Text>
        </View>

        <TouchableOpacity onPress={this.signOutUser}  
          style={{ backgroundColor: '#45b3e0',height:50,width:50,position:"absolute",top:0,right:0, borderRadius:50,justifyContent:"center",alignItems:"center",margin:10 }}>
          <AntDesignIcon size={20} name="logout" />
        </TouchableOpacity>
      </View>
    )
  }
}


export default withNavigation(ProfileScreen);
const styles = StyleSheet.create({
    container: {
        flex: 1,

        backgroundColor: "#87ceeb33"
    },
    UserdetailStyle: {
        padding: 5,
        borderRadius: 20,
        alignSelf: "center",
        width: width * 0.85,
        height: height * 0.25,
        top: 10,

        borderWidth: 1,
        borderColor: "#87ceeb",
        borderRadius: 6,
        borderBottomWidth: 1
    },

    AboutUsStyle: {
        borderColor: "#87ceeb",
        width: width * 0.85,
        height: height * 0.18,
        padding: 15,
        borderRadius: 8,
        borderWidth: 1,
    },
    LogoutStyles: {
        marginTop: height * 0.02,
        borderColor: "#87ceeb",
        alignSelf: "center",
        width: width * 0.4,
        borderRadius: 14,
        borderWidth: 1
    }






});
