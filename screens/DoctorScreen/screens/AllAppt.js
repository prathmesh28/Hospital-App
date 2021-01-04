import React, { Component } from "react"  
import {
  SafeAreaView,
  Dimensions,
  StatusBar,
  ActivityIndicator,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TouchableHighlight,
  StyleSheet,
  FlatList,
  View,
  Image,
  Modal,
  ImageBackground,
  ToastAndroid,
  Alert
} from "react-native"
import { Card, CardItem, Body, Text, Button } from 'native-base';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import _ from 'lodash'
import TimeAgo from 'react-native-timeago';
import Icon1 from 'react-native-vector-icons/Ionicons';
import moment from "moment"

const { height, width } = Dimensions.get('screen')  


export default class AllAppt extends Component {

  state = {
    data: this.props.appointments,
    screen:false,
    showDetails:false,
    itemData:{Date:new Date().toISOString()},
    todayDate:new Date()
  }

  filterArray=()=>{
    const allAppt = _.filter(this.props.appointments, (e) => {
      console.log(e.timeValue, moment().valueOf())
      if( e.timeValue<= moment().valueOf()){
        // console.log(e.Date)
        // console.log('hi')
        let temp = e
        temp.done = true
        return temp
      }else return e
       
    })
    this.setState({data: allAppt})
  }
  componentDidMount(){
  // console.log(this.props.appointments)
    this.filterArray()
    setInterval(() => {
     // this.setState({ todayDate:new Date()})
      this.filterArray()
    }, 60000);
  }

  renderItem = ({ item }) => {
    return (
      <TouchableHighlight activeOpacity={0.8}
      underlayColor="#d3edf8"
         style={styles.touchCard} onPress={()=>item.done?null:this.setState({showDetails:true,itemData:item})}>
        
        <Card style={styles.cardItemView} >
          <Text style={{marginVertical:5, fontSize:20,color:'#45b3e0',fontWeight:'500'}}>
                &nbsp;Dr. {item.Doctor}
          </Text>
          {/* <Text>{item.timeValue}{item.done?'true':'false'}</Text> */}


          <Text style={{marginVertical:5,fontWeight:'bold'}}>
          &nbsp;<Icon1 style={{ fontSize: 18 }} name="time-outline" />
                &nbsp;{item.timeslot}, {item.Date.substr(8, 2)}/{item.Date.substr(5, 2)}/{item.Date.substr(0, 4)}
          </Text>

          {item.done? 
            
            item.cancel?<Text style={{fontStyle:'italic',color:'red'}}>&nbsp;{item.message}</Text>
            :
              item.status?<Text style={{color:'green'}}> Appointment Completed.</Text>:<Text style={{color:'red'}}>&nbsp;Session Expired.</Text>
           
          : 
         <>
         
              
              
                
              {item.cancel?<>
                {item.message===""?null:<Text style={{marginVertical:5,fontStyle:'italic',color:item.cancel?'red':'black'}}>&nbsp;{item.message}</Text>}
              <Icon1 style={{ alignSelf:'flex-end' ,fontSize: 18,color:'#cc3232' }} name="close-circle" />
              </>
              :
              <>
              <Text style={{fontStyle:'italic',color:item.status?'green':'orange'}}>{item.status?' Your Appointment is confirmed by doctor.':' Your Appointment is not yet confirmed.'}</Text>
              <View style={{marginVertical:5,flexDirection:'row',justifyContent:item.cancel?'flex-end':'space-between'}}>

                <Text style={{alignSelf:'flex-end'}}>&nbsp;Your checkup is <TimeAgo time={item.Date} interval={60000}/></Text>
                {/* <Text>{item.Date}</Text> */}

                <Icon1 style={{ fontSize: 18,color:item.status?'#2dc937':'#e7b416' }} name="checkmark-circle-sharp" />

              </View>
              </>}
              </>
          }
        </Card>
      </TouchableHighlight>
  
    )
  
  }
  
  renderSeparator = ({leadingItem, section})=>{
   
    return <View style={{height:10}}></View>
  };
  
  renderHeader = () => {
    return <View style={{ height: 60 }}>
    </View>
  };
  
  renderOnEmpty = () => {
    return <View style={{ height:300,backgroundColor:'#fff',width:width*0.8,alignSelf:"center",justifyContent:"center",alignItems:"center",borderRadius:20,elevation:4,margin:10 }}>
      <Text>No Appointments scheduled...</Text>
    </View>
  }
  renderFooter = () => {
    return <View style={{ height: 30 }}>
    </View>
  }

  render() {

    const data = this.state.data

    return (
      <View style={styles.container}>
        <FlatList
            keyExtractor={item => item.id}
          //  data={data}
            data={data}
            renderItem={this.renderItem}
            ItemSeparatorComponent={this.renderSeparator}
            ListHeaderComponent={this.renderHeader}
            ListEmptyComponent={this.renderOnEmpty}
            ListFooterComponent={this.renderFooter}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.showDetails}
          onRequestClose={() => this.setState({showDetails:false}) }
         //,
        >
          <View  style={styles.centeredView} >
            <View style={this.state.itemData.cancel ?
                {...styles.modalView, minHeight:height*0.18 ,borderColor:'#D61A3C'}
                :
                {...styles.modalView, minHeight:height*0.35, borderColor:'#45b3e0'}} >

              <TouchableOpacity onPress={() => this.setState({showDetails:false})} onPressOut={() => this.setState({bookApp:false})} 
                  style={{ position:'absolute',right:0,top:0,width:40,height:40,justifyContent:'center',alignItems:"center" }} >
                <Icon1 style={{ fontSize: 20,color:'#000' }} name="close"/>
              </TouchableOpacity>
           
           
              <Text style={{marginVertical:5, fontSize:20,color:'#45b3e0',fontWeight:'bold'}}>
                Dr. {this.state.itemData.Doctor}
              </Text>

             
              <Text style={{fontSize:16}}>
                <Icon1 style={{ fontSize: 18 }} name="time-outline" />

                {this.state.itemData.timeslot}, {this.state.itemData.Date.substr(0,10)===new Date().toISOString().substr(0,10)?'Today':this.state.itemData.Date.substr(8, 2)+'/'+this.state.itemData.Date.substr(5, 2)+'/'+this.state.itemData.Date.substr(0, 4)}
              </Text>
              {this.state.itemData.Type===""?null:<Text style={{fontSize:17}}>Checkup type: &nbsp;{this.state.itemData.Type}</Text>}


              {this.state.itemData.cancel?<>
                {this.state.itemData.message===""?null:<Text style={{marginVertical:5,fontStyle:'italic',color:this.state.itemData.cancel?'red':'black'}}>&nbsp;{this.state.itemData.message}</Text>}
              <Icon1 style={{ alignSelf:'flex-end' ,fontSize: 18,color:'#cc3232' }} name="close-circle" />
              </>
              :
              <>
              <Text style={{fontStyle:'italic',color:this.state.itemData.status?'green':'orange'}}>{this.state.itemData.status?'Your Appointment is confirmed by doctor.':'Your Appointment is not yet confirmed.'}</Text>
            


              <Text style={{color:'grey'}}>
                Please Report at reception desk at least 15 mins before ypur checkup time.
              </Text>

              <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'flex-end',marginVertical:10}}>
             
                <TouchableOpacity
                  style={{ ...styles.openButton, backgroundColor: "red" }}
                  onPress={() => {
                    this.state.itemData.status? Alert.alert(
                      "Can't delete this Appointment!"):
                    Alert.alert(
                      "Cancel Appointment?",
                      "Cancel Appointment?",
                      [
                        {
                          text: "Cancel",
                         // onPress: () => console.log("Cancel Pressed"),
                          style: "cancel"
                        },
                        { text: "OK", onPress: () =>{
                          let message = "Appointment canceled by user."
                            // cconsole.log(this.state.itemData.id)
                          database().ref('Appointments/' + this.state.itemData.id + '/data/').update({ cancel: true, message })
                          this.setState({showDetails:false})
                          } 
                        }
                    ],
                  );
                
                }}
                
              >
                <Text style={styles.textStyle}>Delete</Text>
              </TouchableOpacity>
           <Text >
             {this.state.itemData.cancel?<Icon1 style={{ fontSize: 18,color:'#cc3232' }} name="close-circle" />:<Icon1 style={{ fontSize: 18,color:this.state.itemData.status?'#2dc937':'#e7b416' }} name="checkmark-circle-sharp" />}
              
              <TimeAgo time={this.state.itemData.Date} interval={60000}/>
            </Text>
             </View>


             
              </>}


           
             
              {/* <Text style={{fontSize:18}}>Your checkup is <TimeAgo time={this.state.itemData.Date} interval={60000}/></Text> */}


            </View>
          </View >
        </Modal>
   </View>
    )  
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,paddingBottom:60,marginTop:50
  },
  cardItemView: {
    //elevation:1,
    padding:10,
    borderRadius:10,
    borderWidth:1,
    borderColor:'#45b3e0',
  },
  touchCard: {
    
    display:"flex", 
    flexDirection:'column',
    justifyContent:'space-evenly',
  
    width: width *.85, 
    alignSelf:'center',
    borderRadius:10,

    

  },
     
  
  centeredView: {
    flex: 1,
    justifyContent: "center",
    backgroundColor:'#45b3e040',
    // alignItems: "center",
    
  },
  modalView: {
    
    borderWidth:1,
    width:width*0.9,
    alignSelf:'center',
    backgroundColor: "white",
    borderRadius:10,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection:'column',
    justifyContent:'space-evenly'
  },
  textStyleDoc: {
    color: "#000",
    //fontWeight: "700",
    fontSize:22
  //  textAlign: "center"
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 5,
    elevation: 2,
    width:100
  },
  textStyle: {
    color: "white",
    textAlign: "center",
    fontWeight:'400',
    fontSize:15,
    paddingHorizontal:10
  },
})  

