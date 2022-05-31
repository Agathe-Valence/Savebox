import { Alert, View, Text, FlatList, StyleSheet, Pressable, ImageBackground, TouchableOpacity, Button } from 'react-native'
import React, { useState, useEffect } from 'react'
import { firebase } from '../config';
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { getDatabase, ref,remove } from "firebase/database";


const Home = () => {
    const [person, setPerson] = useState([]);
    const personRef = firebase.firestore().collection('person');
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
                const {Firstname, Lastname,Age,Number,Blood,Health} = doc.data()
                person.push({
                    id: doc.id,
                    Firstname,
                    Lastname,
                    Age,
                    Number,
                    Blood,
                    Health,
                })
            })
            setPerson(person)
        })
    }, [])

    function deleteRealTime(personRef) {
        const db = getDatabase();
        remove(ref(db,'/persons/'+personRef))
    }

    function place() {
        if(person.length < 5){
            return false
        }
        else{
            return true
        }
    }

    // delete a todo from firestore db
    const deletePerson = (person) => {
        personRef
            .doc(person.id)
            .delete()
            .then(() => {
                deleteRealTime(person.id)
                alert("Deleted successfully");
            })
            .catch(error => {
                alert(error);
            })
    }
 

    return (
        <View style={styles.container}>
            <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                <Text style = {styles.title}>SAVEBOX CAR ONE</Text>
                
                <TouchableOpacity disabled={place()} style={styles.buttonAdd} onPress={() => navigation.navigate('NewPassenger', {})}>
                    <Text>ADD A PASSAGER</Text>
                </TouchableOpacity>

                <FlatList
                    style={{}}
                    data={person}
                    numColumns={1}
                    renderItem={({item}) => (
                        <View>
                            <Pressable
                            style={styles.containerlist}
                            onPress={() => Alert.alert('Informations', 
                            item.Firstname +' '+ item.Lastname+ 
                            '\nAge : '+ item.Age +
                            '\nNumber : '+ item.Number +
                            '\nBlood Group'+ item.Blood +
                            '\nHealth care : '+ item.Health)}
                            >
                                <FontAwesome name="trash-o" 
                                color="red" 
                                onPress={() => deletePerson(item)} 
                                style={styles.personIcon} />
                                <View style={styles.innerContainer}>
                                    <Text style={styles.itemHeading}>
                                        {item.Firstname[0].toUpperCase() + item.Firstname.slice(1) + ' ' + item.Lastname}
                                    </Text>
                                </View> 
                                
                            </Pressable>
                        </View>
                    )}
                />

                <Text style = {styles.description}>{"Vous pouvez ajouter jusqu'à 5 passagers pour ce véhicule."+'\n\n'+"Vous êtes à : "+person.length+" passagers"}</Text>
                
          </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    containerlist: {
        backgroundColor:"#000000c0",
        padding: 15,
        borderRadius: 15,
        margin:5,
        marginHorizontal: 10,
        flexDirection:'row',
        alignItems:'center'
    },
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
        //textAlign: "center",
    },
    title : {
        color: "white",
        fontWeight: "bold",
        marginTop:70,
        marginBottom:20,
        fontSize:30,
        textAlign: 'center',
    },
    description : {
        color: "white",
        fontWeight: "bold",
        marginTop:10,
        marginBottom:20,
        fontSize:18,
        textAlign: 'center',
    },
    
    innerContainer: {
        alignItems: 'center',
        flexDirection: 'column',
        marginLeft:45,
    },
    itemHeading: {
        color: "white",
        fontWeight: 'bold',
        fontSize:18,
        marginRight:22
    },
    personIcon:{
        marginTop:5,
        fontSize:20,
        marginLeft:14,
    },
    buttonAdd: {
        marginTop: 20,
        marginLeft:50,
        marginRight:50,
        marginBottom:50,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 30,
        backgroundColor: 'white',
    },
    buttonStop: {
        marginLeft:50,
        marginRight:50,
        marginBottom:10,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 20,
        backgroundColor: 'red',
    },
});

export default Home