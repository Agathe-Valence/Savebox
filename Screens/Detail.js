import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Pressable, TextInput,FlatList } from 'react-native'
import { firebase } from '../config';
import { useNavigation } from '@react-navigation/native';


const Detail = ({route}) => {

    const [person, setPerson] = useState([]);
    const personRef = firebase.firestore().collection('person');
    const [firstname, onChangeFirstnameText] = useState(route.params.item.name);
    const [lastname, onChangelastnameText] = useState(route.params.item.name);
    const [age, onChangeAgeText] = useState(route.params.item.name);
    const [number, onChangeNumberText] = useState(route.params.item.name);
    const [blood, onChangeBloodText] = useState(route.params.item.name);
    const [health, onChangeHealthText] = useState(route.params.item.name);


    const navigation = useNavigation();

    const updatePerson = () => {
        if (firstname && firstname.length > 0) {
            personRef
            .doc(route.params.item.id)
            .update({
                Firstname: firstname,
                Lastname: lastname,
                Age : age,
                Number : number,
                Blood: blood,
                Health: health,
            }).then(() => {

            }).catch((error) => {
                alert(error.message)
            })
            navigation.goBack()
        }
    }

    return (
        
        <View style={styles.container}>
            <Text style={styles.title}>UPDATE THE PASSENGER'S DETAILS</Text>
            <TextInput 
                style={styles.textfield}
                onChangeText={onChangeFirstnameText}
                value={firstname}
                placeholder="Firstname"
            />
            <TextInput 
                style={styles.textfield}
                onChangeText={onChangelastnameText}
                value={lastname}
                placeholder="Lastname"
            />
            <TextInput 
                style={styles.textfield}
                onChangeText={onChangeAgeText}
                value={age}
                placeholder="Age"
            />
            <TextInput 
                style={styles.textfield}
                onChangeText={onChangeNumberText}
                value={number}
                placeholder="Telephone Number"
            />
            <TextInput 
                style={styles.textfield}
                onChangeText={onChangeBloodText}
                value={blood}
                placeholder="Blood Group"
            />
            <TextInput 
                style={styles.textfield}
                onChangeText={onChangeHealthText}
                value={health}
                placeholder="Health Care"
            />
            <Pressable 
                style={styles.buttonUpdate}
                onPress={() => {updatePerson()}}>
                <Text>UPDATE USER</Text>
            </Pressable>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'black',
    },
    title : {
        color: "white",
        marginTop:10,
        marginBottom:20,
        fontSize:30,
        textAlign: 'center',
    },
    textfield: {
        marginLeft:10,
        marginRight:10,
        marginBottom: 10,
        padding: 10,
        fontSize: 15,
        color: "#000000",
        backgroundColor: "#e0e0e0",
        borderRadius: 5
    },
    buttonUpdate: {
        marginTop: 25,
        marginLeft:30,
        marginRight:30,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 20,
        elevation: 10,
        backgroundColor: '#0de065',
    },
});

export default Detail