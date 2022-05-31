import { View, Text, FlatList, StyleSheet, ImageBackground,Pressable, TextInput, TouchableOpacity, Keyboard } from 'react-native'
import React, { useState, useEffect } from 'react'
import { firebase } from '../config';
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { getDatabase, ref,remove } from "firebase/database";


const Passengers = () => {
    const [person, setPerson] = useState([]);
    const personRef = firebase.firestore().collection('person');
    const navigation = useNavigation();
    const image = require("../assets/fond_home.jpg");



    // fetch or read the data from firestore
    useEffect(() => {
        personRef
        .orderBy('Firstname', 'desc')
        .onSnapshot( 
            querySnapshot => {
            const person = []
            querySnapshot.forEach((doc) => {
                const {Firstname, Lastname,Age,Number,Blood,Health} = doc.data()
                person.push({
                    id: doc.id,
                    Firstname, Lastname,Age,Number,Blood,Health
                })
            })
            setPerson(person)
        })
    }, [])

    return (

        <View style={styles.container}>
            <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                
                <Text style = {styles.title}>ON BOARD</Text>
                <FlatList
                    style={{}}
                    data={person}
                    numColumns={1}
                    renderItem={({item}) => (
                        <View>
                            <View>
                                <Text style={styles.text}>
                                    {item.Firstname +' '+ item.Lastname + '\nAge : ' + item.Age + '\nTelephone : ' +
                                    item.Number + '\nBlood group : ' +item.Blood + '\nHealth care : ' + item.Health + '\n'}
                                </Text>
                                
                            </View> 

                        </View>
                    )}
                />
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    image: {
        flex: 1,
        justifyContent: "center"
    },
    text: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
        lineHeight: 20,
        marginLeft:20,
    },
    title : {
        color: "white",
        fontWeight: "bold",
        marginTop:70,
        marginBottom:20,
        fontSize:30,
        textAlign: 'center',
    },
    innerContainer: {
        alignItems: 'center',
        flexDirection: 'column',
    },
    itemHeading: {
        fontSize:18,
        marginTop:10,
        marginLeft:20,
    },
});

export default Passengers