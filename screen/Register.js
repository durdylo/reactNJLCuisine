import axios from 'axios';
import React, { useContext, useState } from 'react'
import { StyleSheet, Text, TextInput, Button, View } from 'react-native';
import { UserContext } from '../App';

export default function Register({navigation}) {	
	const context = useContext(UserContext);

	const [message, setMessage] = useState('');
	const [name, setName] = useState('');
	const [firstName, setFirstName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const handlePress = () => {
		const data = {
			name: name,
			firstname: firstName,
			email: email,
			password: password,
			confirmpassword: confirmPassword
		};
		const url = 'http://localhost/projetCubes3/Models/user/insertUser.php'
		axios.post(url, data)
		.then((response)=> {
			const result = response.data;
			if (result.state == "success") {	
				navigation.replace('login');
			}
			else {
				console.log("pas ok");
				setMessage(result.message);
			}
		});
	};

	return (
		<View>
			<TextInput
				onChangeText = {setName}
				value = {name}
				placeholder="Nom"
				style = {[styles.base, styles.border]}
			/>
			<TextInput
				onChangeText = {setFirstName}
				value = {firstName}
				placeholder="Prénom"
				style = {[styles.base, styles.border]}
			/>
			<TextInput
				onChangeText = {setEmail}
				value = {email}
				placeholder="Email"
				style = {[styles.base, styles.border]}
			/>
			<TextInput
				onChangeText = {setPassword}
				value = {password}
				placeholder="Mot de passe"
				style = {[styles.base, styles.border]}
			/>
			<TextInput
				onChangeText = {setConfirmPassword}
				value = {confirmPassword}
				placeholder="Confirmez votre mot de passe"
				style = {[styles.base, styles.border]}
			/>
			<Text
				style = {styles.error}
			>{message}
			</Text>
			<Button
				title = "Créer mon compte"
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
	},
	error: {
		color: 'red',
		textAlign: 'center'
	}
});
