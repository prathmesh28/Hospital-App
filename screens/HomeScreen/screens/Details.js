import React from 'react';
import { Dimensions, StyleSheet, Text, View, TouchableOpacity, Button, Image } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {PermissionsAndroid} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import { utils } from '@react-native-firebase/app';
import Loader from './Loader'

const { height, width } = Dimensions.get('screen')  

export default class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resourcePath: {},
      photoUri:'',
      Name:'',
      Phone:'',
      textInfo:'Loading...',
      loading:false
    };
  }

  componentDidMount(){
    // console.log(this.props.navigation.state.params.data)

    this.setState({
      Name:this.props.navigation.state.params.data.Name,
      Phone:this.props.navigation.state.params.data.Phone
    })
  }
 
  // Launch Camera
  cameraLaunch = async() => {
    let options = {
      title: 'Choose Image',
      maxWidth: 1000,
      maxHeight: 1000,
      quality: 0.7,
      mediaType: 'photo',
      storageOptions: {
        skipBackup: true,
        path: 'Pictures/myAppPicture/', //-->this is neccesary
        privateDirectory: true
      },
    };
 
    if (Platform.OS === 'android') {
      try {
        await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        ])
  
        const permissionCamera = await PermissionsAndroid.check('android.permission.CAMERA')
        const permissionWriteStorage = await PermissionsAndroid.check('android.permission.WRITE_EXTERNAL_STORAGE')
  
        if (!permissionCamera || !permissionWriteStorage) {
          return {
            error: 'Failed to get the required permissions.'
          }
        }
      } catch (error) {
        return {
          error: 'Failed to get the required permissions.'
        }
      }
    }
      
    ImagePicker.showImagePicker(options, res => {
      // console.log('Response = ', res);

      if (res.didCancel) {
        // console.log('User cancelled image picker');
      } else if (res.error) {
        // console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        // console.log('User tapped custom button: ', res.customButton);
        alert(res.customButton);
      } else {
        let source = res;
        this.setState({
          resourcePath: source,
        });
      }
    });
      
                     
  }


  uploadImage=async()=>{
    //this.setState({loading:true})
   
    
    const { uid } = auth().currentUser

    let newDate = new Date()
    let d = newDate.getDate();
    let m = newDate.getMonth() + 1;
    let y = newDate.getFullYear();
    let h = newDate.getHours();
    let mt = newDate.getMinutes();
    let s = newDate.getSeconds();
    let ms = newDate.getMilliseconds();
    let usernewdate = newDate.toLocaleString()
    let newId = d+''+m+y+h+mt+s+ms+uid

    this.setState({textInfo:'Uploading Image...'})

    const reference = storage().ref('photos/'+newId+this.state.resourcePath.fileName);
    const pathToFile = this.state.resourcePath.uri
    await reference.putFile(pathToFile);

    this.setState({textInfo:'Checking...'})

    const url = await storage().ref('photos/'+newId+this.state.resourcePath.fileName).getDownloadURL()

    this.setState({textInfo:'Sending data to pharmacy...'})

    const data = {
      name:this.state.Name,
      phone:this.state.Phone,
      url:url,
      code:uid,
      date:usernewdate,
      status:false,
      id:newId
    }

    await database()
      .ref('Pharmacy/'+newId)
      .set({
        data
      })
      .then(() => console.log('Data set.'))

    this.setState({loading:false})

    this.props.navigation.navigate("History")

  }

  render() {
    return (
      <View style={styles.container}>
        <Loader loading={this.state.loading} textInfo={this.state.textInfo}/>
        
        {this.state.resourcePath.uri?
        <View style={{paddingVertical:50}}>
        <Image
        source={{ uri: this.state.resourcePath.uri }}
        style={{ width: 200, height: 200 }}
          />
          </View>:
          <View style={{paddingVertical:50}}><Text>
        <Text style={{fontWeight:'bold',fontSize:15}}>*intru:</Text> {'\n'}
        1. Upload clear Photo of the report. {'\n'}
        2. Validity of report is 1hr.{'\n'}
        3. ........


        </Text></View>}
          {
            this.state.resourcePath.uri?<TouchableOpacity onPress={this.cameraLaunch} style={styles.button}  >
            <Text style={styles.buttonText}>Change photo</Text>
        </TouchableOpacity>:
            <TouchableOpacity onPress={this.cameraLaunch} style={styles.button}  >
              <Text style={styles.buttonText}>Upload Prescription</Text>
          </TouchableOpacity>

          }

          <TouchableOpacity onPress={this.uploadImage} style={{
            width: 100,
            height: 50,
            backgroundColor: '#5A71E2',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 50, 
            marginVertical:30
          }}  >
              <Text style={styles.buttonText}>Send </Text>
          </TouchableOpacity>
          
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
  //  padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d3edf8'
  },
  button: {
    width: 250,
    height: 60,
    backgroundColor: '#5A71E2',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10, 
    paddingVertical:30
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 15,
    color: '#fff'
  }
});