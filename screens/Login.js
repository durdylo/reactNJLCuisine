import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useState } from 'react'
import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
import { UserContext } from '../App';
import { UserStorageKey } from '../services/userService';

export default function Login({ navigation }) {
    console.log(navigation);
    const key = "authToken";
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const handlePress = () => {
        console.log('login');
        const data = {
            identifier: email,
            password: pwd
        }
        const url = "http://localhost:1337/auth/local";
        axios.post(url, data)
            .then((response) => {
                const { jwt, user } = response.data;
                AsyncStorage.setItem(key, jwt);
                AsyncStorage.setItem(UserStorageKey, JSON.stringify(user));
                axios.defaults.headers['Authorization'] = "Bearer " + jwt;
                context.setUser(user);
                navigation.replace('home');
            })
            .catch(function (error) {

            })
    }
    return (
        <View>
            <TextInput
                style={[styles.base, styles.border]}

                onChangeText={setEmail}
                value={email}
                placeholder="Email"
            />
            <TextInput
                style={styles.base}
                onChangeText={setPwd}
                value={pwd}
                placeholder="Mot de passe"
            />
            <Button title="Connexion" onPress={() => { handlePress() }}></Button>
        </View>

    )
}

const styles = StyleSheet.create({
    base: {
        margin: 20,
        height: 50,
        backgroundColor: '#FFF',
        paddingHorizontal: 10
    },
    border: {
        borderColor: "#000",
        borderBottomColor: "black"
    }
})