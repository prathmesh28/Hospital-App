import { Button, Card, CardItem,} from "native-base"
import React, { Component } from "react"

import {
  SafeAreaView,
  Dimensions,
  StatusBar,
  ActivityIndicator,
  TouchableOpacity,
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

import Icon from 'react-native-vector-icons/Fontisto';
import Icon1 from 'react-native-vector-icons/Ionicons';
import {Picker} from '@react-native-community/picker'
const { height, width } = Dimensions.get('screen')

export default class Appointment extends Component {
state={
  bookApp:false,
  TimeState: 'Morning',
  Time:'',
  workFromHr:null,
  workFromMt:null,
  workToHr:null,
  workToMt:null,
  checkupType:''
}

componentDidMount(){
  this.setState({
    workFromHr:this.props.navigation.state.params.data.MorworkFrom.substr(0, 2),
    workFromMt:this.props.navigation.state.params.data.MorworkFrom.substr(3, 2),
    workToHr:this.props.navigation.state.params.data.MorworkTo.substr(0, 2),
    workToMt:this.props.navigation.state.params.data.MorworkTo.substr(3, 2)
  })
}
async componentDidUpdate(prevProps, prevState){
  console.log(prevState.TimeState)
  if(prevState.TimeState!==this.state.TimeState){
      if(this.state.TimeState==='Morning'){
    this.setState({
      workFromHr:this.props.navigation.state.params.data.MorworkFrom.substr(0, 2),
      workFromMt:this.props.navigation.state.params.data.MorworkFrom.substr(3, 2),
      workToHr:this.props.navigation.state.params.data.MorworkTo.substr(0, 2),
      workToMt:this.props.navigation.state.params.data.MorworkTo.substr(3, 2)
    })
  }else{
    this.setState({
      workFromHr:this.props.navigation.state.params.data.EvnworkFrom.substr(0, 2),
      workFromMt:this.props.navigation.state.params.data.EvnworkFrom.substr(3, 2),
      workToHr:this.props.navigation.state.params.data.EvnworkTo.substr(0, 2),
      workToMt:this.props.navigation.state.params.data.EvnworkTo.substr(3, 2)
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

  const data = {
    Doctor:this.props.navigation.state.params.data.name,
    Name:this.props.navigation.state.params.userData.data.Name,
    Phone:this.props.navigation.state.params.userData.data.Phone,
    Type:this.state.checkupType,
    Date:new Date().toISOString(),
    timeslot:this.state.Time,
    id:newId
  }
  console.log(data)
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


  render() {
    let specialization = this.props.navigation.state.params.data.specialization
    specialization = specialization.charAt(0).toUpperCase() + specialization.slice(1)


    var timeData = []

	for(let i = this.state.workFromHr; i < this.state.workToHr; i++){

    if(i===this.state.workFromHr && (this.state.workFromMt>=1 && this.state.workFromMt<=29)){
      console.log('hi')
    }else{
      timeData.push(
        <Picker.Item key={i} label={i+":00 - "+i+":30"} value={i+":00 - "+i+":30"} />
   )
    }
    
    
    if(i===this.state.workFromHr && (this.state.workToMt>=31 && this.state.workToMt<=59)){
      console.log('hi')
    }
    else{
      i++
      timeData.push(
        <Picker.Item key={i} label={(i-1)+":30 - "+(i)+":00"} value={(i-1)+":30 - "+(i)+":00"} />
      )
      i--
    }
    
	}

    return (
      <View style={styles.container}>
          <StatusBar backgroundColor={'#45b3e0'} />
          <View style={{justifyContent:"center",alignItems:"center", backgroundColor:'#45b3e0',width:width,height:100}}>
              <Text style={{fontSize:22,fontWeight:'700'}}>Book Appointment</Text>
          </View>
          <View style={{padding:20,}}>
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
        
            
            
            <Card style={{alignSelf:"flex-start",borderRadius:10,marginTop:20}}>
              <CardItem  style={{borderRadius:10,backgroundColor:'#ffff',marginHorizontal:10}}>
                <Icon style={{ fontSize: 18 }} name="date" />
                <Text>{'\t'}{new Date().toLocaleDateString()} ,Today</Text>
              </CardItem> 
            </Card>
            
            <Card style={{ padding: 10, borderRadius: 10,marginTop:20, }}>
              <CardItem>
               
                <Picker
                  selectedValue={this.state.TimeState}
                  style={{height: 50, width: 130}}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({TimeState: itemValue})
                  }>
                  <Picker.Item label="Morning" value="Morning" />
                  <Picker.Item label="Evening" value="Evening" />
                </Picker>
            
                  {
                    this.state.TimeState==='Morning'?
                    <Picker
                  selectedValue={this.state.Time}
                  style={{height: 50, width: width*0.4}}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({Time: itemValue})
                  }>
                    
                    {timeData}
                    
                   
                  </Picker>
                  :
                  <Picker
                  selectedValue={this.state.Time}
                  style={{height: 50, width: width*0.4}}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({Time: itemValue})
                  }>
                  
                  {timeData}
                
                  </Picker>
                  }
                  
                  </CardItem>

              
              
              <Button rounded block info style={{width:width*0.6,marginVertical:10, alignSelf:'center'}} onPress={()=>this.setState({bookApp:true})}>
                <Text style={{color:'white'}}>JOIN QUEUE</Text>
              </Button>
            </Card>

          </View>
          <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.bookApp}
          onRequestClose={() => this.setState({bookApp:false}) }
         
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.textStyle}>{this.props.navigation.state.params.data.name} </Text>
              <Text style={{ fontSize: 14,color:'grey'}}> {specialization} </Text>

              <Text>{new Date().toLocaleDateString()}</Text>
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
          </View>
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
    padding: 20,
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
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
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