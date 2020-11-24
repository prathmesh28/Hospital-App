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


const { height, width } = Dimensions.get('screen')

class History extends Component {

  _isMounted = false;
  state = {
    data: null
  }
  componentDidMount() {
    this._isMounted = true;
    database().ref('/Pharmacy/').on('value', async (snapshot) => {
      const Pharmacy = _.map(snapshot.val(), (e) => {
        return e.data
      })
    //  console.log(Pharmacy)
      this.setState({data: Pharmacy})
      //console.log(snapshot.val())

    })

   
    // console.log(Pharmacy)
    // if (this._isMounted) {
    //   this.setState({ data: Pharmacy })
    // }
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  renderItem = ({ item }) => {




    return (
      <Card style={{
        padding: 5, width: width * .85, alignSelf: "center", borderRadius: 10,
        //  top: 0,
        // height:height*0.2
      }}>
        <Body>
          <CardItem>
            {/*  */}
            <View style={{ display: 'flex', flexDirection: 'row' }}>
                <Image
                  source={{ uri: item.url }}
                  style={{
                    height: 150,
                    width: 150
                  }}
                />
              </View>
              
              <View style={{left:0}}>
              
            {console.log(item)}
              <Text>
                Token No: </Text>
              
              <View ><Text>
                name:{item.name}</Text></View>
                

                <View >
                <Text>Ph No. {item.phone}</Text>
                </View>
                
          
          
          </View>
          </CardItem>
          </Body>
          

      </Card>


    )

  }
  renderHeader = () => {
    return <View style={{ height: 100 }}>
    </View>
  };

  render() {
    const data = this.state.data
    console.log(this.state.data)
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={'#87CEEB'} />
        <View style={{ flex: 1, paddingBottom: 60, marginTop: 30 }}>
          {/* <Text>qwerty</Text> */}
          <FlatList

            data={data}
            renderItem={this.renderItem}
            keyExtractor={item => item.id}
            ListHeaderComponent={this.renderHeader}
          />

        </View>
        <View style={{ backgroundColor: '#87CEEB', height: 100, width: width, position: 'absolute', bottom: 0 }}>
          <Button onPress={()=>this.props.navigation.navigate('Details',{data:this.props.navigation.state.params.data.data})}>
            <Text>your pharmacy</Text>

          </Button>
        </View>

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

})  


