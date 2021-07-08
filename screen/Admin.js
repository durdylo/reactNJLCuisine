import axios from 'axios';
import React, { useContext, useState, useEffect } from 'react'
import { StyleSheet, Text, TextInput, Button, FlatList, View, ScrollView } from 'react-native';
import { UserContext } from '../App';

export default function Admin({ navigation }) {
	const { user } = useContext(UserContext);
	if (!user || user == '')
		navigation.replace('login');
	else if (user.role != 1) {
		return (
			<View>
				<Text style={styles.error}>You are not an admin</Text>
			</View>
		);
	}

	const [userList, setUserList] = useState([]);
	const [recipeList, setRecipeList] = useState([]);

	useEffect(() => {
		getUsers();
	}, []);

	const getUsers = () => {
		const url = 'http://localhost/projetCubes3/Models/user/selectAllUsers.php'
		axios.post(url, null)
			.then((response) => {
				const result = response.data;
				if (result.state == "success") {
					setUserList(result.data);
				}
				else {
					console.log(result.message);
				}
			});
	};

	const getRecipe = (id_user) => {
		const data = {
			id_user: id_user
		};
		
		const url = 'http://localhost/projetCubes3/Models/recipe/selectRecipe.php'
		axios.post(url, data)
			.then((response) => {
				const result = response.data;
				if (result.state == "success") {
					setRecipeList(result.data);
				}
				else {
					console.log(result.message);
				}
			});
	};

	const onUserPress = (item) => {
		getRecipe(item.id);
	};

	const onDeleteUserPress = (item) => {
		const data = {
			id: item.id
		};
		const url = 'http://localhost/projetCubes3/Models/user/deleteUser.php';
		axios.post(url, data)
			.then((response) => {
				const result = response.data;
				if (result.state == "success") {
					setUserList(userList.filter(elem => elem.id !== item.id));
				}
				else {
					console.log(result.message);
				}
			});


	};

	const onDeleteRecipePress = (item) => {
		const data = {
			id: item.id
		};
		const url = 'http://localhost/projetCubes3/Models/recipe/deleteRecipe.php';
		axios.post(url, data)
			.then((response) => {
				const result = response.data;
				if (result.state == "success") {
					setRecipeList(recipeList.filter(elem => elem.id !== item.id));
				}
				else {
					console.log(result.message);
				}
			});
	}

	const renderUser = ({ item }) => (
		<View style={styles.listItem}>
			<Text onPress={() => { onUserPress(item) }}>
				{item.firstname} {item.name}
			</Text>
			<Button
				title="-"
				onPress={() => { onDeleteUserPress(item) }}
			/>
		</View>
	);

	const renderRecipe = ({ item }) => (
		<View style={styles.listItem}>
			<Text>
				{item.name} {item.description}
			</Text>
			{<Button
				title="-"
				onPress={() => { onDeleteRecipePress(item) }}
			/>}
		</View>
	);

	return (
		<ScrollView>
			<Text style={styles.title}> Utilisateurs</Text>
			<FlatList
			style={styles.border}
				data={userList}
				renderItem={renderUser}
				vertical
			/>
			<Text style={styles.title}> Recettes de l'utilisateur</Text>
			<FlatList
			style={styles.border}
				data={recipeList}
				renderItem={renderRecipe}
				vertical
			/>
		</ScrollView>
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
	},
	listItem: {
		flexDirection: "row"
	},
	title: {
		fontSize:24,
		textAlign: 'center'
	}
});
