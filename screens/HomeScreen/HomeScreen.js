import React, { Component } from "react"  
import {
  Dimensions,
  StatusBar,
  StyleSheet,
  FlatList,
  View,
  Image,
  Alert,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  Modal

} from "react-native"  
import { Card, CardItem, Body, Text, Button } from 'native-base';
const { height, width } = Dimensions.get('screen')  
import _ from 'lodash'
import MainSVG from '../../TabBar/Main'
import TimeAgo from 'react-native-timeago';
import { withNavigation } from "react-navigation";
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import Icon1 from 'react-native-vector-icons/Ionicons';
import Loader from '../Loader'
import { ThemeProvider } from "react-native-elements";
import moment from "moment"

class HomeScreen extends Component {
  _isMounted = false;
  constructor(props){
    super(props);
  
    this.state={
      Name:this.props.data.data.Name,
      NextDate:this.props.data.data.NextDate,
      remark:this.props.data.data.remark,
      data: null,
      showDetails:false,
      itemData:{Date:new Date().toISOString()},
      loading:false
    }
  }


componentDidMount(){
  this.setState({loading:true})

 
this.setState({data: this.props.appt})
  this.setState({loading:false})

}
// async componentDidUpdate(prevProps, prevState){
// if(prevProps.data.data.NextDate!==this.props.data.data.NextDate){
//   // console.log('date changed')
// }
// if(prevProps.data.data.remark!==this.props.data.data.remark){
//   // console.log('remark changed')
// }
// }
componentWillUnmount() {
  this._isMounted = false;
}



renderItem = ({ item }) => {
  return (
    <TouchableHighlight activeOpacity={1}
    underlayColor="transparent"
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
pharmacyData = () =>{
  return <Card style={{width:width*0.85,borderTopRightRadius:20,borderTopLeftRadius:20,alignSelf:"center",}}>
  <CardItem header  style={{borderTopRightRadius:20,borderTopLeftRadius:20,justifyContent:'center',backgroundColor:'#45b3e0'}} >
          <Text style={{color:'#fff',fontWeight:'900',fontSize:18}}>Your Pharmacy</Text>
        </CardItem>
        <CardItem >
          <Text style={{textAlign:"center"}}>
            Upload your PRESCRIPTION here and collect the medicines from pharmacy.
          </Text>
        </CardItem>
        
    <CardItem  button style={{borderRadius:15,backgroundColor:'#2e86c1',height:45,justifyContent:'center',width:width*0.45,alignSelf:'center',marginBottom:20}}
        onPress={()=>this.props.navigation.navigate('History',{data:this.props.data})}>
      <Text style={{color:'#fff',fontWeight:'bold'}}>UPLOAD </Text>
    </CardItem>
  </Card>
}
renderSeparator = ({leadingItem, section})=>{

  return <View style={{height:10}}></View>
};
renderHeader = () => {
  return <View style={{ height: 10 }}>
  </View>
};
renderOnEmpty = () => {
  return <View style={{ height:30, }}>

  </View>
}
renderFooter=()=>{
  return <View>
     {this.pharmacyData()}
     <View style={{height:50,width:width,}}></View>

  </View>
}
  render() {
    const data = this.state.data
   // console.log(this.state.data)
    const name = this.state.Name
    const NextDate = this.state.NextDate
    const remark = this.state.remark

    return (
   <View style={styles.container}>
      <StatusBar backgroundColor={'#45b3e0'} />
      <Loader loading={this.state.loading} textInfo={'Loading'}/>
      <View style={{marginBottom:60}}>
       
        
        <View style={{position:'absolute'}}>
          <View style={{backgroundColor:'#45b3e0',height:height*0.14}} ></View>
          <View style={{backgroundColor:'#45b3e0',height:20}}>
            <MainSVG width={width*1.01} height={height*0.15}></MainSVG>
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
               left:20,justifyContent:'space-evenly'
                }}>
              <Text style={{fontSize:20,color:'#171717',height:30}}>
                      Hello, {'\n'}
                      </Text>
                <Text style={{fontSize:30,fontWeight:"bold",color:'#171717',height:40}}>
                  {name}
                
              </Text>
              <Text style={{fontSize:17,bottom:0,alignContent:"space-between",color:'#000',color:'#171717',height:40}}>
                How're you today?
              </Text>
              </View>
              <Image source={require('../../assets/hiclipart.com.png')} style={{height:70,width:70,right:20}} />
              

        </View>

        <FlatList
            // nestedScrollEnabled={false}
            // scrollEnabled={false}
            keyExtractor={item => item.id}
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
        {/* <View style={{width:width*0.9,alignSelf:"center",padding:10,marginTop:40}}>
          <Card 
              style={{
                padding:0,
                borderRadius:20,

                }}>
            
            {
              NextDate?
              <CardItem style={{
                //padding:0,
                //borderRadius:20, 
                backgroundColor:'#45b3e0',
                // borderBottomWidth:1,
                borderRadius:20,
                justifyContent:'center'
               // borderColor:'#7ec0ee66',
                 }}>
              {NextDate >= new Date().toISOString()?
              <>
                <Text style={{fontSize:20,fontWeight:"900",alignSelf:'center',textAlign:'center'}}>
                  Your next appointment is {'\n'}
                  <Text style={{fontSize:22,fontWeight:"bold",lineHeight:30,color:'#fff'}}> 
                    <TimeAgo time={NextDate} />
                  </Text>
                </Text>
              </>
              :
              <>
                <Text style={{fontSize:20,fontWeight:"900",alignSelf:'center',textAlign:'center'}}>
                  Your last appointment was {'\n'}
                  <Text style={{fontSize:22,fontWeight:"bold",alignSelf:'center',color:'#fff'}}>
                    <TimeAgo time={NextDate} />
                  </Text>
                </Text>
              </>
              }
                
                
                
                </CardItem>
              :
              <CardItem style={{
                //padding:0,
                //borderRadius:20, 
                backgroundColor:'#fff',
                // borderBottomWidth:1,
                borderRadius:20,
                justifyContent:'center'
               // borderColor:'#7ec0ee66',
                 }}>
              <Text style={{fontSize:18,fontWeight:"900",textAlign:'center',color:'#000'}}>
                  No upcoming appointments.
              </Text>
              </CardItem>

            }
                
            
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
                     
                      <Text style={{fontSize:18,fontWeight:"900",width:width*0.5}}>
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
                     
                      <Text style={{fontSize:18,fontWeight:"900",width:width*0.4}}>
                          &nbsp;{remark}
                          </Text>
                      </View>
                   
               
                </View>

              </Body>
            </CardItem>}
          </Card>
        </View> */}
        
      
       
    
    </View>
   </View>
    )  
  }
}

{/* <View style={{flex: 1}}>
  <View style={{flex: 0.9}}>
    <FlatList/>
  </View>
  <View style={{flex: 0.1}}/>
</View> */}
export default withNavigation(HomeScreen);
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
  cardItemView: {
    marginTop:40,
    marginBottom:20,
    borderColor:'#45b3e0',
    display:"flex", 
    flexDirection:'column',
    justifyContent:'space-evenly',
    height:130,
    borderRadius: 10,
    padding:10,
    width: width *.85, 
    alignSelf:'center',
    
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