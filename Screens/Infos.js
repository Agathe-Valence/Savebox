import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ImageBackground, Image, Pressable, TextInput,FlatList } from 'react-native'

const Infos = () => {

    const image = require("../assets/fond3.jpg");

    return (
        
        <View style={styles.container}>

            <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                <Text style={styles.title}>THE SAVE BOX</Text>
                <Text style={styles.text}>{"Le rôle de l'application est de rentrer les données des passagers, c'est à dire,"+
                " nom,prénom, groupe sanguin etc.Ces données seront ensuite envoyées vers la database. Le boitier s'occupera de traiter ces données et de les envoyer vers les pompiers en cas d'accidents" + '\n\n'
                    + "Ce projet a été développé par 5 étudiants de l'EFREI Paris pour votre sécurité, il sera bientôt disponible dans vos voiture sans que vous ayez besoin de télécharger l'application"
                    +". C'est un outil indispensable en cas d'accident" + '\n\n'+'Merci à  : '+ '\n'+
                    'AMOURA MEHDI'+'\n'+
                    'BEDEWY ROWA'+'\n'+
                    'ELBAZ JONATHAN'+'\n'+
                    'KASBAOUI KAIS'+'\n'+
                    'VALENCE AGATHE'}</Text>

                <Image style={styles.logo} source={require('../assets/efrei.png')} />

            </ImageBackground>

        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        justifyContent: "center"
      },
      text: {
        color: "white",
        fontWeight: "bold",
        fontSize: 14,
        lineHeight: 30,
        textAlign: "center",
    },
    container: {
        flex:1,
    },
    logo : {
        marginTop:20,
        marginLeft:20,
        resizeMode:'cover',
        
    },
    title : {
        marginTop:40,
        color: "white",
        fontWeight: "bold",
        marginBottom:20,
        fontSize:30,
        textAlign: 'center',
    },
});

export default Infos