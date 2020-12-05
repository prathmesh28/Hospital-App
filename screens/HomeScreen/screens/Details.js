import React from 'react';
import { Dimensions, StyleSheet, Text, View, TouchableOpacity, Button, Image,TextInput } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {PermissionsAndroid} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import { utils } from '@react-native-firebase/app';
import Loader from '../../Loader'
import { Container, Header, Content, Card, CardItem, Body, Left, Row, Right, Fab, Icon } from 'native-base';

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
        console.log('User cancelled image picker');
      } else if (res.error) {
        alert(res.error);
        console.log('ImagePicker Error: ', res.error);
      } else {
        let source = res;
        this.setState({
          resourcePath: source,
        });
      }
    });
      
                     
  }


  uploadImage=async()=>{
    this.setState({loading:true})
    if(this.state.resourcePath.uri){
   
    
    const { uid } = auth().currentUser

    let newDate = new Date()
    let d = newDate.getDate();
    let m = newDate.getMonth() + 1;
    let y = newDate.getFullYear();
    let h = newDate.getHours();
    let mt = newDate.getMinutes();
    let s = newDate.getSeconds();
    let ms = newDate.getMilliseconds();
    let usernewdate = newDate.toISOString()
    let newId = d+''+m+y+h+mt+s+ms+uid

  //  console.log(usernewdate)
    this.setState({textInfo:'Uploading Image...'})

    const reference = storage().ref('photos/'+newId+this.state.resourcePath.fileName);
    const pathToFile = this.state.resourcePath.uri


    await reference.putFile(pathToFile)
    .on(
      storage.TaskEvent.STATE_CHANGED,
      async(snapshot) => {
        console.log('hi')
        this.setState({textInfo:'Uploading '+(snapshot.bytesTransferred / snapshot.totalBytes) * 100+'%...'})
        console.log((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
       
        
        if (snapshot.state === storage.TaskState.SUCCESS) {
          console.log('hi')

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

          database()
            .ref('Pharmacy/'+newId)
            .set({
              data
            })
            .then(() => console.log('Data set.'))
            
         }
         
      },
      error => {
        unsubscribe();
        alert('Sorry, Try again.');
        console.log(error)
      }
    );


    this.setState({textInfo:'Checking...'})

    

    this.setState({loading:false})

    this.props.navigation.navigate("History")
    }else{
      this.setState({loading:false})
    }

  }

  render() {
    return (
      <View style={styles.container}>
        <Loader loading={this.state.loading} textInfo={this.state.textInfo}/>
        <View>
        <Card style={{width:width*0.8,alignSelf:"center",borderTopLeftRadius:10,borderTopRightRadius:10,justifyContent:"center"}}>
        {this.state.resourcePath.uri?
          <CardItem bordered style={{paddingVertical:50,justifyContent:"center"}}>
            <Image
              source={{ uri: this.state.resourcePath.uri }}
              style={{ width: width*0.7, height: width*0.7 }}
            />
          </CardItem>
        :
        
            <>
          
              <CardItem header bordered style={{borderTopStartRadius:10,borderTopEndRadius:10,backgroundColor:'#458ce0',justifyContent:"center"}}>
                <Text style={{color:'#fff',fontWeight:'bold',fontSize:18,lineHeight:20}}>Instructions:</Text>
              </CardItem>
            
              <CardItem bordered >
                <Text style={{fontSize:15,lineHeight:25}}>
                1. Upload clear Photo of the report. {'\n'}
              2. Validity of report is 1hr.{'\n'}
                // Instructions here //
                </Text>
              </CardItem>
             
             
      </>
        }
          
        {this.state.resourcePath.uri?
        <>
       <CardItem bordered style={{justifyContent:"center"}}>
          <TouchableOpacity onPress={this.cameraLaunch} style={{...styles.button,  borderColor: '#458ce0', borderWidth:1,backgroundColor:'#fff'}}  >
            <Text style={{...styles.buttonText,color:'#000'}}>Change photo</Text>
          </TouchableOpacity>
          </CardItem>

           <CardItem bordered style={{justifyContent:"center"}}>
           <TextInput
              style={{ height: 80, borderColor: 'gray', borderWidth: 1,width:width*0.7,backgroundColor:'white' }}
              multiline={true}
            //  onChangeText={text => onChangeText(text)}
            //   value={value}
            />
            </CardItem>
             <CardItem bordered style={{justifyContent:"center"}}>
            <TouchableOpacity onPress={this.uploadImage} 
              style={{
                width: 100,
                height: 50,
                backgroundColor: '#458ce0',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10, 
                elevation:3
               // marginVertical:30
              }}>
              <Text style={styles.buttonText}>Send </Text>
            </TouchableOpacity> 
           </CardItem>
          
           </>
        :
        <CardItem bordered style={{justifyContent:"center"}}>
          <TouchableOpacity onPress={this.cameraLaunch} style={styles.button}  >
            <Text style={styles.buttonText}>Upload Prescription</Text>
          </TouchableOpacity>
          </CardItem>
          
        }
        
        </Card>
      
        </View>
       
      </View>
    )
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
    width: width*0.5,
    backgroundColor: '#458ce0',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10, 
    paddingVertical:15,
    elevation:4,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 17,
    color: '#fff'
  }
});