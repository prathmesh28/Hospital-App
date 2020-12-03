import React, { Component } from "react"  
import {
    Text,
  SafeAreaView,
  Dimensions,
  StatusBar,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  Button,
  View,
  Image,
  ImageBackground
} from "react-native"  
import { withNavigation } from 'react-navigation';
import MainSVG from '../../TabBar/Main'
import Paediatric from './component/Paediatric'
import Pregnancy from './component/Pregnancy'
import Other from './component/Other'

const { height, width } = Dimensions.get('screen')  

class ReportScreen extends Component {

  state={
    data:null,
    Disease:""
  }
  componentDidMount(){
    // console.log(this.props.data.data.Disease)
    // this.setState({data:this.props.data.data})
    // this.setState({Disease:this.props.data.data.Disease})
  }
  render() {


    //for patient type categeries
    let renderData
    if (this.props.data.data.Disease === 'Paediatric'){
      renderData= <Paediatric  data={ this.props.data}/>
    }
    else if (this.props.data.data.Disease === 'Pregnancy'){
      renderData= <Pregnancy  data={ this.props.data}/>
    }
    else{
      renderData= <Other data={ this.props.data} />
    }
   
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={'#45b3e0'} />

        <View style={{ backgroundColor: '#45b3e0', height: 50 }}>
            
            <MainSVG width={width*1.01} height={150}></MainSVG>
          </View>
        <Text style={{fontSize:25,position:"absolute",marginLeft:20,top:20,color:'#171717',fontWeight:'400'}}>
              User Report
        </Text>

        <View style={{top:100}}>
            {renderData}
        </View>  

      
   </View>
    )  
  }
 
  
}
export default withNavigation(ReportScreen);
const styles = StyleSheet.create({
  container: {
    backgroundColor:"#d3edf8",
    flex: 1,
  
  },
  ViewReportStyles:{
    padding:0,
     margin:0,
     alignSelf:"center",
     marginHorizontal:0,
     marginBottom:10,
     borderWidth:1,
     borderColor:"black",
     width:width*0.5,
     height:40 
    }
})  