import React, {useState, useEffect} from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar,
    Alert,
    Dimensions
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { LoginSvgOne } from './assets/SubtlePrismSvg'
import auth from '@react-native-firebase/auth';

const { height, width } = Dimensions.get('screen')




const PhoneAuth = ({navigation}) => {

    const [data, setData] = React.useState({
        username: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });
   
    
   
    const [phone, setPhone] = useState('');
    const [confirm, setConfirm] = useState(null);
    const [code, setCode] = useState('');

    const [user, setUser] = useState();

    const textInputChange = (val) => {
        setPhone(val)
      //  console.log(val)
        // if( val.trim().length >= 4 ) {
            
        // } else {
            
        // }
    }

    const handlePasswordChange = (val) => {
        if( val.trim().length >= 6 ) {
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false
            });
        }
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const handleValidUser = (val) => {
        if( val.trim().length >= 4 ) {
            setData({
                ...data,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                isValidUser: false
            });
        }
    }



    
                   
        



    const loginHandle = async(phone) => {
        //link with email









        
         console.log(phone)
        const confirmation = await auth().signInWithPhoneNumber(phone);
        setConfirm(confirmation);
        console.log(confirmation.verificationId)







       
       

        
    }
     // Handle confirm code button press
  async function confirmCode(code) {
    try {
      const credential = auth.PhoneAuthProvider.credential(
        confirm.verificationId,
        code,
      );
      console.log(credential)
      let userData = await auth().currentUser.linkWithCredential(credential);
      //setUser(userData.user);
    //  console.log(userData.user)
      navigation.navigate("App")
    } catch (error) {
      if (error.code == 'auth/invalid-verification-code') {
        console.log('Invalid code.');
      } else {
        console.log('Account linking error');
      }
    }
  }
    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#2e86c1' barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={styles.text_header}>Phone no. authentication!</Text>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={[styles.footer, {
               // backgroundColor: "#fff"
            }]}
        >
         

<View style={{bottom:-20}}>
          <LoginSvgOne width={width*1} height={height*0.15} color={'#fff'} ></LoginSvgOne>
        </View>

        <View style={styles.footernew}> 
       <Text style={[styles.text_footer, {
             //   color: colors.text
            }]}>Phone no.</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                   // color={colors.text}
                    size={20}
                />
                <TextInput 
                    placeholder="Enter phone number"
                    placeholderTextColor="#666666"
                    style={[styles.textInput, {
                      //  color: colors.text
                    }]}
                    autoCapitalize="none"
                    onChangeText={(val) => textInputChange(val)}
               //     onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
                />
                {data.check_textInputChange ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>
            { data.isValidUser ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Incorrect No.</Text>
            </Animatable.View>
            }
            

          { confirm ?<View>
            <Text style={[styles.text_footer, {
              //  color: colors.text,
                    marginTop: 35
                }]}>Code</Text>
                <View style={styles.action}>
                    <Feather 
                        name="lock"
                //     color={colors.text}
                        size={20}
                    />
                <TextInput 
                    placeholder="Enter Code"
                    placeholderTextColor="#666666"
                    //secureTextEntry={data.secureTextEntry ? true : false}
                    style={[styles.textInput, {
                 //       color: colors.text
                    }]}
                    autoCapitalize="none"
                    onChangeText={(val) => {setCode(val)}}
                />
                 </View>
          </View>: null}
         
             


                {/* <TouchableOpacity
                    onPress={updateSecureTextEntry}
                > */}
                    {/* {data.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    } */}
                {/* </TouchableOpacity> */}
          
            { data.isValidPassword ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
            </Animatable.View>
            }
            

            <View style={styles.button}>
                {confirm?
                    <TouchableOpacity
                        onPress={() => {confirmCode(code)}}
                        style={[styles.signIn, {
                            borderColor: '#2e86c1',
                            borderWidth: 1,
                            marginTop: 15
                        }]}
                    >
                        <Text style={[styles.textSign, {
                            color: '#2e86c1'
                        }]}>check</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity
                        style={styles.signIn}
                        onPress={() => {loginHandle( phone)}}
                    >
                        <LinearGradient
                            colors={['#87CEEB', '#2e86c1']}
                            style={styles.signIn}
                        >
                            <Text style={[styles.textSign, {
                                color:'#fff'
                            }]}>Send code</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                }
                

                
            </View>
            </View>
        </Animatable.View>
      </View>
    );
};
export default PhoneAuth

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#2e86c1'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 0
    },
    footer: {
        flex: 5,
        backgroundColor: 'transparent',
        // borderTopLeftRadius: 30,
        // borderTopRightRadius: 30,
     //   paddingHorizontal: 0,
         padding: 0,
         margin: 0
    },
    footernew: {
      flex: 1,
      backgroundColor: '#fff',
      // borderTopLeftRadius: 30,
      // borderTopRightRadius: 30,
      paddingHorizontal: 20,
      paddingVertical: 30
  },

    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
  });