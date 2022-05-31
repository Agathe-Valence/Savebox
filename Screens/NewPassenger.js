import { View, Text, FlatList, StyleSheet, Pressable, ImageBackground, TextInput, TouchableOpacity, Keyboard } from 'react-native'
import React, { useState, useEffect } from 'react'
import { firebase } from '../config';
import { useNavigation } from '@react-navigation/native';

import { getDatabase, ref, set } from "firebase/database";


const NewPassenger = () => {
    const [person, setPerson] = useState([]);
    const personRef = firebase.firestore().collection('person');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [age, setAge] = useState('');
    const [number, setnNumber] = useState('');
    const [blood, setBlood] = useState('');
    const [health, setHealth] = useState('');
    const navigation = useNavigation();
    const image = require("../assets/fond_ecran2.jpg");


    // fetch or read the data from firestore
    useEffect(() => {
        personRef
        .orderBy('Firstname', 'desc')
        .onSnapshot( 
            querySnapshot => {
            const person = []
            querySnapshot.forEach((doc) => {
                const {Firstname} = doc.data()
                person.push({
                    id: doc.id,
                    Firstname,
                })
            })
            
            setPerson(person)
        })
    }, [])

    function writeUserData(personRef,firstname, lastname, age, number, blood, health) {
        const db = getDatabase();
        set(ref(db, 'persons/' + personRef), {
            Firstname: firstname,
            Lastname: lastname,
            Age : age,
            Number : number,
            Blood: blood,
            Health: health,
        });
    }

    // add a todo
    const addPerson = () => {
        // check if we have a todo.
        if (firstname && firstname.length > 0) {
            // get the timestamp

            const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            const data = {
                Firstname: firstname,
                Lastname: lastname,
                Age : age,
                Number : number,
                Blood: blood,
                Health: health,
                createdAt: timestamp
            };

            personRef
                .add(data)
                .then((ref) => {
                    // release todo state
                    setFirstname('');
                    setLastname('');
                    setAge('');
                    setnNumber('');
                    setBlood('');
                    setHealth('');
                    // release keyboard
                    Keyboard.dismiss();
                    alert("Vous avez bien été ajouté, ajouté les autres passagers ou retourné à l'accueil")
                    writeUserData(ref.id, firstname, lastname, age, number, blood, health)
                    if(person.length + 1 == 5){
                        alert('Vous avez atteint la limite de place (5)')
                        navigation.navigate('Home')
                    }
                })
                .catch((error) => {
                    // show an alert in case of error
                    alert(error);
                })
        }
    }

    return (
        <View style={styles.container}>
            
                <Text style={styles.title}>ADD A NEW PASSENGER</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Firstname'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(firstname) => setFirstname(firstname)}
                        value={firstname}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Lastname'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(lastname) => setLastname(lastname)}
                        value={lastname}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Age'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(age) => setAge(age)}
                        value={age}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Telephone number'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(number) => setnNumber(number)}
                        value={number}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Blood group'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(blood) => setBlood(blood)}
                        value={blood}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Health Care'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(health) => setHealth(health)}
                        value={health}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TouchableOpacity style={styles.button}
                    onPress={addPerson}>
                        <Text style={styles.buttonText}>Ajouter</Text>
                    </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({

    title : {
        color: "white",
        marginTop:10,
        marginBottom:20,
        fontSize:30,
        textAlign: 'center',
    },
    image: {
        flex: 1,
        justifyContent: "center"
    },
    container: {
        flex:1,
        backgroundColor:'black',
    },
    input: {
        marginBottom: 10,
        marginLeft : 10,
        marginRight:10,
        padding: 10,
        fontSize: 15,
        color: "#000000",
        backgroundColor: "#e0e0e0",
        borderRadius: 5
    },
    formContainer: {
        flexDirection: 'col',
        height: 200,
        marginLeft:10,
        marginRight: 10,
        marginTop:30,
    },
    button: {
        height: 47,
        borderRadius: 5,
        backgroundColor: '#788eec',
        width: 80,
        alignItems: "center",
        justifyContent: 'center',
        marginLeft : 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
    },
    personIcon:{
        marginTop:5,
        fontSize:20,
        marginLeft:14,
    },
});

export default NewPassenger