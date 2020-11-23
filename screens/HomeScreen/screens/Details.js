import React from 'react';
import { Dimensions, StyleSheet, Text, View, TouchableOpacity, Button, Image } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {PermissionsAndroid} from 'react-native';
const { height, width } = Dimensions.get('screen')  

export default class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resourcePath: {},
      photoUri:''
    };
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
        // skipBackup: true,
        // path: 'images',
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
      console.log('Response = ', res);

      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        alert(res.customButton);
      } else {
        let source = res;
        this.setState({
          resourcePath: source,
        });
      }
    });
      
                     
  }


  

  render() {
    return (
      <View style={styles.container}>
        <View style={{backgroundColor:'#87CEEB',height:100,width:width,position:'absolute',bottom:0}}>
        <TouchableOpacity onPress={this.cameraLaunch} style={styles.button}  >
              <Text style={styles.buttonText}>Launch Camera Directly</Text>
          </TouchableOpacity>
        </View>
          <Image
            source={{
              uri: 'data:image/jpeg;base64,' + this.state.resourcePath.data,
            }}
            style={{ width: 100, height: 100 }}
          />
          <Image
            source={{ uri: this.state.resourcePath.uri }}
            style={{ width: 200, height: 200 }}
          />
          <Text style={{ alignItems: 'center' }}>
            {this.state.resourcePath.uri}
          </Text>


        

          

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  button: {
    width: 250,
    height: 60,
    backgroundColor: '#3740ff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    marginBottom:12    
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 15,
    color: '#fff'
  }
});