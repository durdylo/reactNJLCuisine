import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useContext, useState } from 'react'
import { StyleSheet, Text, TextInput, Button, View } from 'react-native';
import { UserContext } from '../App';
import { userStorageKey } from '../service/userService';

export default function Login({navigation}) {

	const [message, setMessage] = useState('');
	const [email, setEmail] = useState('');
	const [pwd, setPwd] = useState('');
	const key = 'authToken';
	const context = useContext(UserContext);

	console.log('login');
	const handlePress = () => {
		const data = {
			email: email,
			password: pwd
		};
		const url = 'http://localhost/projetCubes3/Models/user/selectUser.php'
		axios.post(url, data)
		.then((response)=> {
			const result = response.data;
			if (result.state == "success") {	
				console.log("ok");
				AsyncStorage.setItem(userStorageKey, JSON.stringify(result.data));
				context.setUser(result.data);
				navigation.replace('home');
			}
			else {
				console.log("pas ok");
				setMessage(result.message);
			}
		})
	}

	const registerPress = () => {
		console.log("go register !! ");
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
			<Text
				style = {styles.error}
			>{message}
			</Text>
			<Button
				title = "Connexion"
				onPress = {handlePress}
				style = {styles.base}
			/>
			<Button
				title = "Créer un compte"
				onPress = {registerPress}
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
	},
	error: {
		color: 'red',
		textAlign: 'center'
	}
});