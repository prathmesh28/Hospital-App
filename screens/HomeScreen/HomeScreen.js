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
import MainSVG from '../../TabBar/Main'
import TimeAgo from 'react-native-timeago';
import { withNavigation } from "react-navigation";



class HomeScreen extends Component {
  _isMounted = false;
  constructor(props){
    super(props);
  
    this.state={
      data:this.props.data.data,
      Name:this.props.data.data.Name,
      NextDate:this.props.data.data.NextDate,
      remark:this.props.data.data.remark,

    }
  }


componentDidMount(){
  this._isMounted = true;

}
async componentDidUpdate(prevProps, prevState){
if(prevProps.data.data.NextDate!==this.props.data.data.NextDate){
  console.log('date changed')
}
if(prevProps.data.data.remark!==this.props.data.data.remark){
  console.log('remark changed')
}
}
componentWillUnmount() {
  this._isMounted = false;
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

        <View style={{width:width*0.9,alignSelf:"center",padding:10,marginTop:40}}>
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
        <Card>
          <CardItem 
           
            >
              <Button  onPress={()=>this.props.navigation.navigate('History',{data:this.props.data})}>
              <Text>your pharmacy</Text>

              </Button>
          </CardItem>
        </Card>
       
    
    </View>
   </View>
    )  
  }
}
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
  
 

})  