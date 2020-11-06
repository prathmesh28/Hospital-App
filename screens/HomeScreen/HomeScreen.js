import React, { Component } from "react"  
import {
  Dimensions,
  StatusBar,
  StyleSheet,
  FlatList,
  View,
} from "react-native"  
import { Card, CardItem, Body, Text } from 'native-base';
const { height, width } = Dimensions.get('screen')  
import _ from 'lodash'
import RNUrlPreview from 'react-native-url-preview';
import MainSVG from '../../TabBar/Main'
import TimeAgo from 'react-native-timeago';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];
export default class HomeScreen extends Component {

  state={
    data:[],
    Name:'',
    NextDate:null,
    remark:''
  }
componentDidMount(){
   const data = this.props.data.data

 
  this.setState({Name:data.Name})
  this.setState({NextDate:data.NextDate})
  this.setState({remark:data.remark})
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
          height:height*0.25,
          justifyContent:"center"
          }}>
          <Text style={{fontSize:20,marginLeft:20}}>
                  Hello, {'\n'}
        <Text style={{fontSize:30,fontWeight:"bold"}}>
          {name}
          </Text>
                </Text>
                <Text style={{fontSize:17,bottom:0,alignContent:"space-between",color:'#000',marginLeft:20}}>
                  How're you today?
                </Text>
        </View>
        
        <View style={{width:width*0.9,alignSelf:"center",padding:10}}>
          <Card 
              style={{
                padding:0,
                borderRadius:20,
                // borderColor:'#7ec0ee4d',
                // shadowColor: "#000",
                // shadowOffset: {
                //   width: 0,
                //   height: 1,
                // },
                // shadowOpacity: 0.22,
                // shadowRadius: 2.22,
                borderWidth:0,
                elevation: 0,
                }}>
            <CardItem style={{padding:0,borderRadius:20, 
            backgroundColor:'#87CEEB66',
            //  backgroundColor:'#7ec0ee66',
            //  borderColor:'#7ec0ee4d',
              borderWidth:0}}>
              <Body>
            {
              NextDate?
              <>
                <Text style={{fontSize:20,fontWeight:"900",alignSelf:'center'}}>
                   Your next appointment is 

                </Text>
                <Text style={{fontSize:20,fontWeight:"bold",alignSelf:'center'}}>
                <TimeAgo time={NextDate} />
                
                </Text>
                
                
              </>
              :<Text style={{fontSize:20,fontWeight:"900",alignSelf:'center'}}>
                  No upcoming appointments.
              </Text>

            }
                
              </Body>
            </CardItem>
            {NextDate&&
            <CardItem style={{padding:0,borderRadius:20, borderWidth:0 }}>
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
                   
                  
                 {/* <Text style={{alignSelf:"fl"}}>
                  &nbsp;
                  {NextDate.toString().substr(8, 2)}
                  {NextDate.toString().substr(4, 4)}
                  {NextDate.toString().substr(0, 4)}&nbsp;
                  {NextDate.toString().substr(11, 5)}
                  {'\n'}
                  </Text>
                 

                  <Text>
                    Remarks:&nbsp;{remark}

                  </Text> */}
                </View>

              </Body>
            </CardItem>}
          </Card>
        </View>
        <View style={{width:width*0.9,alignSelf:"center",padding:10}}>
        <Card style={{padding:0,borderRadius:20,elevation:4,borderColor:'#7ec0ee4d'}}>
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
        </View>
        <View style={{alignItems:"center"}}>
        <FlatList
        data={DATA}
        renderItem={this.renderItem}
        keyExtractor={item => item.id}
      />
        </View>
      </View>
   </View>
    )  
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#87CEEB40'
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