import React, { Component } from "react"  
import {
  Dimensions,
  StatusBar,
  StyleSheet,
  FlatList,
  View,
  Image,
  Alert
} from "react-native"  
import { Card, CardItem, Body, Text, Button } from 'native-base';
const { height, width } = Dimensions.get('screen')  
import _ from 'lodash'
import RNUrlPreview from 'react-native-url-preview';
import MainSVG from '../../TabBar/Main'
import TimeAgo from 'react-native-timeago';

import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});


export default class HomeScreen extends Component {
  _isMounted = false;
  constructor(props){
    super(props);
    this.notificationListener = React.createRef();
    this.responseListener = React.createRef();

    this.state={
      data:this.props.data.data,
      Name:this.props.data.data.Name,
      NextDate:this.props.data.data.NextDate,
      remark:this.props.data.data.remark,

      expoPushToken:'',
      notification:false
    }
  }


componentDidMount(){
  this._isMounted = true;
     this.registerForPushNotificationsAsync().then(token =>{ 
      if (this._isMounted) {
       this.setState({expoPushToken:token})
      }
      })

    this.notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      if (this._isMounted) {
      this.setState({notification})
      }
    });

    this.responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });


}
async componentDidUpdate(prevProps, prevState){
if(prevProps.data.data.NextDate!==this.props.data.data.NextDate){
  await this.schedulePushNotification(this.props.data.data.NextDate,this.props.data.data.remark);
  console.log('date changed')
}
if(prevProps.data.data.remark!==this.props.data.data.remark){
  console.log('remark changed')
}
}
componentWillUnmount() {
  this._isMounted = false;
}
schedulePushNotification = async (date,remark)=> {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Appointment",
      body: "Your next appointment is Scheduled on: " + " " + date.toString().substr(8, 2) + date.toString().substr(4, 4) + date.toString().substr(0, 4) + " " + date.toString().substr(11, 5),
      data: { data: 'goes here' },
    },
    trigger: { seconds: 2 },
  });
}
registerForPushNotificationsAsync = async() => {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

  renderItem = ({item}) => {
    return( 
      <Card style={{padding:10,width:width*0.9}}>
            <CardItem >
              <Body>
                <Text>
                   {item.title}
                </Text>
              </Body>
            </CardItem>
          </Card>
  )
}
  render() {
    const data = this.state.data
   // console.log(this.state.data)
    const name = this.state.Name
    const NextDate = this.state.NextDate
    const remark = this.state.remark

    return (
   <View style={styles.container}>
      <StatusBar backgroundColor={'#87CEEB'} />
      
      <View>
       
        
        <View style={{position:'absolute'}}>
          <View style={{backgroundColor:'#87CEEB',height:height*0.14}} ></View>
          <View style={{backgroundColor:'#87CEEB',height:20}}>
            <MainSVG width={width} height={height*0.15}></MainSVG>
          </View>
        </View>

        <View style={{
          width:width,
          height:height*0.21,
        //  
        display:'flex',
        justifyContent:"space-between",
       flexDirection:"row",
          alignItems:"center"
          }}>
            <View style={{
               left:20
                }}>
              <Text style={{fontSize:20,color:'#171717'}}>
                      Hello, {'\n'}
                <Text style={{fontSize:30,fontWeight:"bold",color:'#171717'}}>
                  {name}
                </Text>
              </Text>
              <Text style={{fontSize:17,bottom:0,alignContent:"space-between",color:'#000',color:'#171717'}}>
                How're you today?
              </Text>
              </View>
              <Image source={require('../../assets/hiclipart.com.png')} style={{height:70,width:70,right:20}} />
              

        </View>

        <View style={{width:width*0.9,alignSelf:"center",padding:10,top:40}}>
          <Card 
              style={{
                padding:0,
                borderRadius:20,

                }}>
            <CardItem style={{padding:0,borderRadius:20, 
            backgroundColor:'#45b3e0', borderBottomWidth:1,borderRadius:20,
            borderColor:'#7ec0ee66',
             }}>
              <Body>
            {
              NextDate?
              <>
              {NextDate >= new Date().toISOString()?
              <>
              <Text style={{fontSize:20,fontWeight:"900",alignSelf:'center'}}>
                   Your next appointment is 
                </Text>
                <Text style={{fontSize:22,fontWeight:"bold",alignSelf:'center',color:'#fff'}}>
                <TimeAgo time={NextDate} />
                
                </Text></>:<><Text style={{fontSize:20,fontWeight:"900",alignSelf:'center'}}>
                   Your last appointment was 
                </Text>
                <Text style={{fontSize:22,fontWeight:"bold",alignSelf:'center',color:'#fff'}}>
                <TimeAgo time={NextDate} />
                
                </Text></>}
                
                
                
              </>
              :<Text style={{fontSize:20,fontWeight:"900",alignSelf:'center',color:'#fff'}}>
                  No upcoming appointments.
              </Text>

            }
                
              </Body>
            </CardItem>
            {NextDate&&
            <CardItem style={{padding:0,borderRadius:20,borderWidth:0 }}>
              <Body>
              <View style={{backgroundColor:'#fff',alignSelf:"flex-start",
                  width:width*0.6,
                  borderRadius:10,
                  padding:10,
                 
                  }}>
                  
                      <View style={{flexDirection:"row"}}>
                      <Text style={{fontSize:18,fontWeight:"bold",width:width*0.25}}>
                        Date:
                      </Text>
                     
                      <Text style={{fontSize:18,fontWeight:"bold",width:width*0.5}}>
                       &nbsp;
                       
                          {NextDate.toString().substr(8, 2)}
                          {NextDate.toString().substr(4, 4)}
                          {NextDate.toString().substr(0, 4)}&nbsp;
                          {NextDate.toString().substr(11, 5)}
                          {'\n'}
                          </Text>
                      </View>
                      <View style={{flexDirection:"row"}}>
                      <Text style={{fontSize:18,fontWeight:"bold",width:width*0.25}}>
                      Remarks:
                      </Text>
                     
                      <Text style={{fontSize:18,fontWeight:"bold",width:width*0.4}}>
                          &nbsp;{remark}
                          </Text>
                      </View>
                   
               
                </View>

              </Body>
            </CardItem>}
          </Card>
        </View>
       
        {/* {this.state.notification && 
        
          Alert.alert(
            this.state.notification.request.content.title,
            this.state.notification.request.content.body,
           
            { cancelable: true }
          )
        
        }  */}



        {/* <View style={{width:width*0.9,alignSelf:"center",padding:10}}>
        <Card style={{padding:0,borderRadius:20,elevation:4}}>
            <CardItem 
              style={{padding:0,borderRadius:20, elevation:0,alignContent:"center",
              backgroundColor:'white',borderColor:'#7ec0ee4d',borderWidth:1}}>
              <Body>
                
               
         
            <RNUrlPreview
                text={'https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public'} 
                titleStyle={styles.linktitle}
                titleNumberOfLines={3}
              containerStyle={styles.linkcontainer}
              imageStyle={styles.linkimage}
              descriptionStyle={styles.discript}
              descriptionNumberOfLines={4}
            />
               
              </Body>
            </CardItem>
          </Card>
        </View> */}
        {/* <View style={{alignItems:"center"}}>
        <FlatList
        data={DATA}
        renderItem={this.renderItem}
        keyExtractor={item => item.id}
      />
        </View> */}
      </View>
   </View>
    )  
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#d3edf8'
    
  },
 
 
  linktitle: {
  //  textAlign:"center",
    fontWeight: "bold",
    fontSize:17
  },
  linkcontainer: {
   // fontSize:15,
    backgroundColor: "transparent",
  },
  linkimage: {
    display: "none",
  },
  discript: {
    
    
    padding:1
    //dont remove
  },
  
 

})  