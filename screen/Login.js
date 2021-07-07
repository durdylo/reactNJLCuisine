import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useContext, useState } from 'react'
import { StyleSheet, TextInput, Button, View } from 'react-native';
import { UserContext } from '../App';
import { userStorageKey } from '../service/userService';

export default function Login({navigation}) {

	const [email, setEmail] = useState('');
	const [pwd, setPwd] = useState('');
	const key = 'authToken';
	const context = useContext(UserContext);

	console.log('login');
	const handlePress = () => {
		const data = {
			identifier: email,
			password: pwd
		};
		//const url = 'http://localhost:1337/auth/local';
		const url = 'http://localhost/projetCubes3/Models/user/selectUser.php'
		axios.post(url, data)
		.then((response)=> {
			console.log(response);
			const {jwt, user} = response.data;
			AsyncStorage.setItem(key, jwt);
			AsyncStorage.setItem(userStorageKey, JSON.stringify(user));
			axios.defaults.headers['Authorization'] = 'Bearer ' + jwt;
			context.setUser(user);
			navigation.replace('home');
		})
		.catch(function (error) {
			if (error.response) {
			  // The request was made and the server responded with a status code
			  // that falls out of the range of 2xx
			  console.log(error.response.data);
			  console.log(error.response.status);
			  console.log(error.response.headers);
			} else if (error.request) {
			  // The request was made but no response was received
			  // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
			  // http.ClientRequest in node.js
			  console.log(error.request);
			} else {
			  // Something happened in setting up the request that triggered an Error
			  console.log('Error', error.message);
			}
			console.log(error.config);
		  });;
	}

	return (
		<View>
			<TextInput
				onChangeText = {setEmail}
				value = {email}
				placeholder="Email"
				style = {[styles.base, styles.border]}
			/>
			<TextInput
				onChangeText = {setPwd}
				value = {pwd}
				placeholder="Mot de passe"
				style = {[styles.base, styles.border]}
			/>
			<Button
				title = "Connexion"
				onPress = {handlePress}
				style = {styles.base}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	base: {
		margin: 20,
		height: 80
	},
	border: {
		borderColor: 'black',
		borderWidth: 1
	}
});