import { Button, Card, CardItem,} from "native-base"
import React, { Component } from "react"

import {
  SafeAreaView,
  Dimensions,
  StatusBar,
  ActivityIndicator,
  TouchableOpacity,
  TouchableWithoutFeedback ,
  StyleSheet,
  View,
  FlatList, Image, ImageBackground,
  Text,
  Modal,
  Linking,
  Alert,TextInput
} from "react-native"
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import moment from "moment"

import Icon from 'react-native-vector-icons/Fontisto';
import Icon1 from 'react-native-vector-icons/Ionicons';
import {Picker} from '@react-native-community/picker'
import { ScrollView } from "react-native-gesture-handler";
const { height, width } = Dimensions.get('screen')
// let date
export default class Appointment extends Component {
state={
  bookApp:false,
  TimeState: "",
  Time:"",
  workFromHr:null,
  workFromMt:null,
  workToHr:null,
  workToMt:null,
  checkupType:'',
  bgColor:true,
  disableMor:false,
  disableEvn:false,
 // TodayDate:null
}

checkTodayDate=()=>{
  let Thisdate = new Date().toTimeString().substr(0,5)
  //  console.log('check',Thisdate,this.props.navigation.state.params.data.MorworkFrom.substr(0, 5))
    if(Thisdate>=this.props.navigation.state.params.data.MorworkFrom.substr(0, 5)){
      this.setState({disableMor: true})
    }else{
      this.setState({disableMor: false})
    }

    if(Thisdate>=this.props.navigation.state.params.data.EvnworkFrom.substr(0, 5)){
      this.setState({disableEvn: true})
    }else{
      this.setState({disableEvn: false})
    }
}
componentDidMount(){
  
  //console.log(Thisdate)
  this.checkTodayDate()
  setInterval(() => { 
    this.checkTodayDate()
  }, 60000);

  this.setState({

    workFromHr:this.props.navigation.state.params.data.EvnworkFrom.substr(0, 2),
    workFromMt:this.props.navigation.state.params.data.EvnworkFrom.substr(3, 2),
    workToHr:this.props.navigation.state.params.data.EvnworkTo.substr(0, 2),
    workToMt:this.props.navigation.state.params.data.EvnworkTo.substr(3, 2)
  })
}
async componentDidUpdate(prevProps, prevState){
  //console.log(this.state.TodayDate)
  if(prevState.bgColor!==this.state.bgColor){
    this.setState({ TimeState:"" })
  }
  if(prevState.TimeState!==this.state.TimeState){
      if(this.state.TimeState==='Morning'){
    this.setState({
      workFromHr:this.props.navigation.state.params.data.MorworkFrom.substr(0, 2),
      workFromMt:this.props.navigation.state.params.data.MorworkFrom.substr(3, 2),
      workToHr:this.props.navigation.state.params.data.MorworkTo.substr(0, 2),
      workToMt:this.props.navigation.state.params.data.MorworkTo.substr(3, 2),
      Time:""
    })
  }else if(this.state.TimeState==='Evening'){
    this.setState({
      workFromHr:this.props.navigation.state.params.data.EvnworkFrom.substr(0, 2),
      workFromMt:this.props.navigation.state.params.data.EvnworkFrom.substr(3, 2),
      workToHr:this.props.navigation.state.params.data.EvnworkTo.substr(0, 2),
      workToMt:this.props.navigation.state.params.data.EvnworkTo.substr(3, 2),
      Time:""
    })
  }
  }
 
}


bookApp=async()=>{
  const { uid } = auth().currentUser
  // console.log(this.props.navigation.state.params.userData.data.Name)

  let newDate = new Date()
  let d = newDate.getDate();
  let m = newDate.getMonth() + 1;
  let y = newDate.getFullYear();
  let h = newDate.getHours();
  let mt = newDate.getMinutes();
  let s = newDate.getSeconds();
  let ms = newDate.getMilliseconds();
  let newId = d+''+m+y+h+mt+s+ms+uid


  let appToDate =  this.state.bgColor?moment():moment().date(moment().date()+1)
  let setApptDate = appToDate.hour(this.state.Time.substr(0,2)).minute(this.state.Time.substr(3,2))
  console.log(setApptDate.format())



  const data = {
    Doctor:this.props.navigation.state.params.data.name,
    Name:this.props.navigation.state.params.userData.data.Name,
    Phone:this.props.navigation.state.params.userData.data.Phone,
    Type:this.state.checkupType,
    Date:setApptDate.format(),
    timeslot:this.state.Time,
    id:newId,
    uid:uid,
    status:false,
    cancel:false,
    message:'',
    done:false,
    timeValue:setApptDate.valueOf()
  }

  await database()
  .ref('Appointments/'+newId)
  .set({
    data
  })
  .then(() => {
    this.setState({bookApp:false})
    this.props.navigation.goBack()
    console.log('Data set.')
    })
  .catch(()=>
    alert('Error in sending data, please try again.')
  )
}


checkTimeData=()=>{
  var timeData = []
  timeData.push(
    <Picker.Item label="TimeSlot" value=""/>
)
	for(let i = this.state.workFromHr; i < this.state.workToHr; i++){

    if(i===this.state.workFromHr && (this.state.workFromMt>=1 && this.state.workFromMt<=29)){
    //  console.log('hi')
    }else{
      let addZero = i.toString().length
      console.log(addZero)
      timeData.push(
        <Picker.Item key={i} label={i+":00 - "+i+":30"} value={i+":00 - "+i+":30"} />
   )
    }
    
    
    if(i===this.state.workFromHr && (this.state.workToMt>=31 && this.state.workToMt<=59)){
    //  console.log('hi')
    }
    else{
      let j = i-1
      let addZero = j.toString().length
      console.log(addZero)
      i++
     
      timeData.push(
        <Picker.Item key={i} label={ (j.toString().length===1?"0"+(i-1)+":30 - "+(i)+":00":(i-1)+":30 - "+(i)+":00")  } value={ (j.toString().length===1?"0"+(i-1)+":30 - "+(i)+":00":(i-1)+":30 - "+(i)+":00")  } />
      )
      i--
    }
    
  }
  return timeData

}

  render() {
    let specialization = this.props.navigation.state.params.data.specialization
    specialization = specialization.charAt(0).toUpperCase() + specialization.slice(1)


  
  var d = new Date();
  
  d.setDate(d.getDate() + 1)
  console.log('changed',d)
  // const newDate =  date.setDate(date.getDate() + 1);
    return (
      <View style={styles.container}>
          <StatusBar backgroundColor={'#45b3e0'} />

          <View style={{justifyContent:"center",alignItems:"center", backgroundColor:'#45b3e0',width:width,height:100}}>
              <Text style={{fontSize:22,fontWeight:'700'}}>Book Appointment</Text>
          </View>
          <ScrollView style={{padding:20,}}>
            <Card style={{padding:20,borderRadius:10}}>
                <Text style={{ fontSize: 20 }}>{this.props.navigation.state.params.data.name} </Text>
              <View style={{flexDirection:"row",justifyContent:'space-between',alignItems:"center",height:40}}>
                <Text style={{ fontSize: 14,color:'grey'}}> {specialization} &nbsp; {this.props.navigation.state.params.data.qualification}</Text>
                <Button rounded block style={{width:100,backgroundColor:'#458ce0',elevation:3}} onPress={async()=> await Linking.openURL('tel:+123456789')}>
                  <Icon1 style={{ fontSize: 18,color:'white' }} name="call-outline"/>
                  <Text style={{ fontSize: 14,color:'white' }}>  Contact  </Text>
                </Button>
              </View>
                
            </Card>
        
           

                
           
           
            
            <Card style={{ padding: 10, borderRadius: 10,marginTop:20, }}>
              <CardItem style={{borderRadius:10,marginTop:10,flexDirection:'column',}}>
                <Text style={{fontSize:16,fontWeight:'bold',marginBottom:15}}>{this.state.bgColor?new Date().toLocaleString().substr(0,10):d.toLocaleString().substr(0,10)}</Text>
                
                <View style={{flexDirection:'row',justifyContent:'space-evenly',width:width*0.6}}>

                  <TouchableOpacity onPress={()=>this.setState({bgColor:!this.state.bgColor})}
                      style={{borderRadius:10,backgroundColor:this.state.bgColor?'#458ce0':'#fff',flexDirection:'row',padding:8}}>
                    <Icon style={{ fontSize: 18,color:this.state.bgColor?'#fff':'#000' }} name="date" />
                    <Text style={{color:this.state.bgColor?'#fff':'#000',fontSize: 15,}}> Today</Text>
                  </TouchableOpacity> 

                  <TouchableOpacity onPress={()=>this.setState({bgColor:!this.state.bgColor})}
                      style={{borderRadius:10,backgroundColor:this.state.bgColor?'#fff':'#458ce0',flexDirection:'row',padding:8}}>
                    <Icon style={{ fontSize: 18,color:this.state.bgColor?'#000':'#fff'  }} name="date" />
                    <Text style={{color:this.state.bgColor?'#000':'#fff',fontSize: 16,}}> Tomorrow</Text>
                  </TouchableOpacity>

                </View>
                
  

              </CardItem>
              {(this.state.disableMor && this.state.disableEvn && this.state.bgColor)?
                                <Text style={{fontStyle:'italic',alignSelf:'center',paddingBottom:10}}>Online Appointments are full for Today!</Text>

            :<>
              <CardItem style={{alignSelf:'center'}}>
              {this.state.disableMor && this.state.bgColor?
                <Picker
                  selectedValue={this.state.TimeState}
                  style={{height: 50, width: 130}}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({TimeState: itemValue})
                  }>
                    <Picker.Item label="Select" value="" />
                  <Picker.Item label="Evening" value="Evening" />
                  </Picker>
                  :
                  <Picker
                  selectedValue={this.state.TimeState}
                  style={{height: 50, width: 130}}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({TimeState: itemValue})
                  }>
                  <Picker.Item label="Select" value="" />
                  <Picker.Item label="Morning" value="Morning" />
                <Picker.Item label="Evening" value="Evening" />
                </Picker>}
     
                
                {/*
                <Picker.Item label="Morning" value="Morning"  />
                  <Picker.Item label="Evening" value="Evening" /> */}
               {this.state.TimeState===""?null:
               <Picker
               selectedValue={this.state.Time}
               style={{height: 50, width: width*0.4}}
               onValueChange={(itemValue, itemIndex) =>
                 this.setState({Time: itemValue})
               }>
                 {this.checkTimeData()}
             </Picker>
               }
                    
               
                    </CardItem>
                  
                       {this.state.disableMor&&this.state.bgColor?<Text style={{fontStyle:'italic',alignSelf:'center',paddingBottom:10}}>Morning Appointments are full!</Text>:null}
                       {(this.state.TimeState==="" || this.state.Time==="")?null:
                 <Button rounded block info style={{width:width*0.6,marginVertical:10, alignSelf:'center'}} onPress={()=>this.setState({bookApp:true})}>
                   <Text style={{color:'white'}}>JOIN QUEUE</Text>
                 </Button>
                 }
                  </>}

              
             
            </Card>

            <Card style={{ padding: 10, borderRadius: 10,marginTop:20, }}>
              <CardItem>
              <Button rounded block 
                onPress={()=> 
                  {
        
               this.props.navigation.state.params.onGoBack();
                this.props.navigation.goBack();
                }
                }
                style={{width:'100%',backgroundColor:'#458ce0',}}>
                <Text style={{color:'#fff'}}>All Appointments</Text>
              </Button>
              
              </CardItem>
            </Card>

          </ScrollView>
          <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.bookApp}
          onRequestClose={() => this.setState({bookApp:false}) }
         
        >
          <View  style={styles.centeredView} >
            <View style={styles.modalView}  >
              <TouchableOpacity onPress={() => this.setState({bookApp:false})} onPressOut={() => this.setState({bookApp:false})} 
                  style={{ position:'absolute',right:0,top:0,width:60,height:60,justifyContent:'center',alignItems:"center" }} >
                <Icon1 style={{ fontSize: 20,color:'#000' }} name="close"/>
              </TouchableOpacity>
              <Text style={styles.textStyle}>{this.props.navigation.state.params.data.name} </Text>
              <Text style={{ fontSize: 14,color:'grey'}}> {specialization} </Text>

              <Text>{this.state.bgColor?new Date().toDateString():d.toDateString()}</Text>
              <Text style={{fontSize:15}}>
              <Icon1 style={{ fontSize: 18 }} name="time-outline" />
                {this.state.Time}, {this.state.TimeState}
              </Text>
             
             
              <View style={{flexDirection:'row'}}>
              <Text>Checkup type:&nbsp;&nbsp;</Text>
              <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1,minWidth:200,borderRadius:10 }}
              //  multiline={true}
                onChangeText={text => this.setState({checkupType:text})}
                value={this.state.checkupType}
              />
              </View>
              <Button rounded block 
                onPress={()=>this.bookApp()}
                style={{width:100,backgroundColor:'#458ce0',elevation:3,alignSelf:'flex-end',margin:20}}>
                <Text style={{color:'#fff'}}>Book</Text>
              </Button>
              


             
            </View>
          </View >
        </Modal>
          
      </View>


    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#d3edf8',
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor:'#d3edf880'
    // alignItems: "center",
   // marginTop: 22
  },
  modalView: {
    backgroundColor: "white",
    borderTopRightRadius:10,
    borderTopLeftRadius:10,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection:'column',
    height:height*0.5,
    justifyContent:'space-evenly'
  },
  
  textStyle: {
    color: "#000",
    fontWeight: "bold",
    fontSize:22
  //  textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
  //  textAlign: "center"
  }

})  