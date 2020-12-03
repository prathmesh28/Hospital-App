import React, { Component } from "react"
import {

  SafeAreaView,
  Dimensions,
  StatusBar,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  FlatList,

  View,
  Image,
  ImageBackground
} from "react-native"
import { withNavigation } from 'react-navigation';
import _ from 'lodash'
import { Card, CardItem, Body, Text, Button } from 'native-base';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import TimeAgo from 'react-native-timeago';


const { height, width } = Dimensions.get('screen')

class History extends Component {

  _isMounted = false;
  state = {
    data: null,
    showButton:false
  }
  componentDidMount() {
    this._isMounted = true;
    const { uid } = auth().currentUser
    database().ref('/Pharmacy/').on('value', async (snapshot) => {

      
      const newcheck = _.map(snapshot.val(), (e) => {
        if(e.data.code===uid)
          return e.data   
      })
      const Pharmacy = _.filter(newcheck, (e) => {
        return e
      })
      
      if(Pharmacy.length>2)
      {
        this.setState({showButton:false,data: Pharmacy})
      }
      else{
        this.setState({showButton:true,data: Pharmacy})
      }

    })
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  renderItem = ({ item }) => {
    return (
      <Card style={styles.itemCard}>
        
            <View  style={styles.cardItemView} >
              <View style={{padding:10,width:width*0.35}}>
              <Image
                source={{ uri: item.url }}
                style={{
                  height: width*0.25,
                  width: width*0.25,
                  borderRadius:10
                }}
              />
            </View>
            <View style={{padding:10,width:width*0.45,justifyContent:'space-evenly'}}>
             
              
              <Text style={{fontWeight:'bold'}}>
                {item.status?'Your medicines are packed, collect it from pharmacy.':'Your medicines are not yet packed.'}
              </Text>
              <Text >
                
                <TimeAgo time={item.date} interval={60000}/>
              </Text>
              
            </View>
        </View>
       
      </Card>


    )

  }
  renderSeparator = ({leadingItem, section})=>{
 
    return <View style={{height:10}}></View>
  };
  renderHeader = () => {
    return <View style={{ height: 10 }}>
    </View>
  };
  renderOnEmpty = () => {
    return <View style={{ height:300,backgroundColor:'#fff',width:width*0.8,alignSelf:"center",justifyContent:"center",alignItems:"center",borderRadius:20,elevation:4,margin:10 }}>
      <Text>Your Reports will appear here...</Text>
    </View>
  };

  render() {
    const data = this.state.data
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={'#87CEEB'} />
        <View style={{backgroundColor:'#87CEEB',height:80,justifyContent:"center",alignItems:"center"}}>
          <Text style={{fontWeight:"bold",fontSize:20,textAlign:"center",lineHeight:30}}>Your Pharmacy{'\n'}
         </Text>

        </View>
        <View style={{ flex: 1, paddingBottom: this.state.showButton ? 100 : 0 }}>
          <FlatList
            keyExtractor={item => item.url}
            data={data}
            renderItem={this.renderItem}
            ItemSeparatorComponent={this.renderSeparator}
            ListHeaderComponent={this.renderHeader}
            ListEmptyComponent={this.renderOnEmpty}
          />

        </View>
        {this.state.showButton?
          <View style={{ backgroundColor: '#87CEEB', height: 100, width: width, 
              position: 'absolute', bottom: 0, }}>
            <View style={{display:'flex',flexDirection:"row",justifyContent:'space-between'}}>

              <View style={{width:width*0.8,padding:20}}>
                <Text style={{textAlign:"justify"}}>Collect your medicine from the store within time.</Text>
              </View>
              <View style={{alignSelf:'center',width:width*0.2,marginRight:10}}>
                <Button style={{backgroundColor:'#5A71E2',borderRadius:15}} onPress={()=>this.props.navigation.navigate('Details',{data:this.props.navigation.state.params.data.data})}>
                  <Text>New</Text>
                </Button>
              </View>
            </View>
          </View>:null}
        

      </View>
    )
  }
}



export default withNavigation(History);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#d3edf8",
    flex: 1,

  },
  itemCard: {
    width: width *.85, 
    borderRadius: 10,
    padding:10,
    alignSelf:"center",
    
  },
  cardItemView: {
    display:"flex", 
    flexDirection:'row',
    justifyContent:'space-evenly',
    flexWrap: 'wrap',
    width: width *.8
  }

})  


