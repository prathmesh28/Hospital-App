import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Dimensions, ImageBackground, Image } from "react-native";
import Firebase from '../../firebase';
import { Container, Header, Content, Card, CardItem, Body, Left, Button, Row } from 'native-base';
const { height, width } = Dimensions.get('screen')
import { withNavigation } from "react-navigation";
import MainSVG from '../../TabBar/Main'
import NotificationSvg from "./assets/NotificationSvg"
import RightArrowSvg from "./assets/RigthArrowSvg"
import ProfileUserSvg from "./assets/ProfileUserSvg"
import InformationSvg from "./assets/InformationSvg";
import LogoutSvg from "./assets/LogoutSvg";
import ProfileNameSvg from "./assets/ProfilenameSvg";
import PhoneNumberSvg from "./assets/PhoneNumberSvg"
import EmailSvg from "./assets/EmailSvg";


class ProfileScreen extends React.Component {

    state = {
        data: [],
        Name: '',
        PhoneNo: '',
        Email: ''
    }
    componentDidMount() {
        //  console.log(this.props.data.data)
        const data = this.props.data.data
        //this.setState({data})
        //   _.map( data, (e) => {
        //    // console.log(e)
        //   this.state.data.push(e)
        // })
        this.setState({ Name: data.Name })
        this.setState({ Email: data.Email })
        this.setState({ PhoneNo: data.Phone })


    }

    signOutUser = () => {
        Firebase.auth().signOut();
    };
    render() {
        const data = this.state.data
        // console.log(this.state.data.data)
        const name = this.state.Name
        const Email = this.state.Email
        const PhoneNo = this.state.PhoneNo

        return (


            <View style={styles.container}>
                <StatusBar backgroundColor={'#87CEEB'} />
                <View style={{ backgroundColor: '#87CEEB', height: 50 }}>
                    <MainSVG width={width} height={170}></MainSVG>

                </View>

                <View style={{ alignItems: "center", width: width, top: 50 }}>
                    <ProfileUserSvg />
                    {/* <Text style={{fontWeight:"bold",fontSize:20}}>  User Profile</Text> */}
                </View>


                <View style={{ top: 70 }}>
                    {/* <Card style={{ width: width * 0.86, alignSelf: "center", padding: 10, }}> */}
                    <Card style={styles.UserdetailStyle}>

                        <CardItem>
                            <View style={{ flex: 1, flexDirection: "row", padding: 0 }}>
                                <ProfileNameSvg marginHorizontal={19} />
                                <Text style={{ marginHorizontal: 12, fontWeight: "bold", color: "black", fontSize: 24, margin: -6 }}>{name} </Text>

                            </View>
                        </CardItem>

                        <CardItem>
                            <View style={{ flex: 1, flexDirection: "row" }}>
                                <PhoneNumberSvg />
                                <Text style={{ marginHorizontal: 10, fontSize: 16, color: "black", marginTop: 5, fontWeight: "bold" }}>{PhoneNo}
                                    {/* {'\n'}{'\n'}
                            {Email} */}
                                </Text>
                            </View>
                        </CardItem>
                        <CardItem>
                            <View style={{ flex: 1, flexDirection: "row" }}>
                                <EmailSvg />
                                <Text style={{ marginHorizontal: 10, marginTop: 15, fontSize: 16, color: "black", marginTop: 2, fontWeight: "bold" }}>{Email}

                                </Text>
                            </View>

                        </CardItem>




                    </Card>



                    <Card style={{ padding: 3, borderColor: "#87ceeb", marginTop: height * 0.035, borderWidth: 1, borderRadius: 19, alignSelf: "center", width: width * 0.9, height: height * 0.05 }}>


                        <TouchableOpacity
                            style={{ margin: 0, alignSelf: "center", height: height * 0.06, width: width * 0.9 }}
                            onPress={() => this.props.navigation.navigate('Notification')}>

                            <NotificationSvg ></NotificationSvg>
                            <Text style={{ fontWeight: "bold", fontSize: 22, color: "black", marginTop: -24, marginHorizontal: 50 }}>Notifications</Text>

                            <RightArrowSvg />

                        </TouchableOpacity>



                    </Card>



                    <Card style={{

                        alignSelf: "center",
                        borderRadius: 8,
                        marginTop: height * 0.04,

                        marginHorizontal: 30,

                    }}>

                        <View style={styles.AboutUsStyle}>
                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                <InformationSvg marginTop={70} />
                                <Text style={{
                                    fontSize: 22, fontWeight: "bold",

                                    color: "black"
                                }}>{'\t'}

                        About Us {'\n'}


                                </Text>
                            </View>

                            <Text style={{ fontSize: 16, fontWeight: "bold" }}>{'\t'} {'\t'}{'\t'}Vision Hospital{'\n'}{'\n'}
                                <Text style={{ fontSize: 16 }}>{'\t'}{'\t'}{'\t'}mapusa,Goa</Text></Text>

                        </View>

                    </Card>


                    <Card style={styles.LogoutStyles}>


                        <TouchableOpacity style={{ alignSelf: "center", display: "flex", flexDirection: "row", width: width * 0.4, height: 50 }} onPress={this.signOutUser}>

                            <Text style={{ fontWeight: "bold", alignSelf: "center", marginTop: 5, marginHorizontal: 35, color: "black" }}>Logout</Text>
                            <View style={{
                                marginTop: 14,
                                // marginHorizontal:80
                            }}>
                                <LogoutSvg />
                            </View>
                        </TouchableOpacity>




                    </Card>


                </View>

            </View>





        );

    }

}


export default withNavigation(ProfileScreen);
const styles = StyleSheet.create({
    container: {
        flex: 1,

        backgroundColor: "#87ceeb33"
    },
    UserdetailStyle: {
        padding: 5,
        borderRadius: 20,
        alignSelf: "center",
        width: width * 0.85,
        height: height * 0.25,
        top: 10,

        borderWidth: 1,
        borderColor: "#87ceeb",
        borderRadius: 6,
        borderBottomWidth: 1
    },

    AboutUsStyle: {
        borderColor: "#87ceeb",
        width: width * 0.85,
        height: height * 0.18,
        padding: 15,
        borderRadius: 8,
        borderWidth: 1,
    },
    LogoutStyles: {
        marginTop: height * 0.02,
        borderColor: "#87ceeb",
        alignSelf: "center",
        width: width * 0.4,
        borderRadius: 14,
        borderWidth: 1
    }






});
