import React, { useContext } from "react";
import { View, Text, Button } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUser, userStorageKey } from '../service/userService';
import { UserContext } from "../App";


export default function Moncompte() {	

	const context = useContext(UserContext);
	const {user} = useContext(UserContext);
	
	const doLogout = () => {
		AsyncStorage.removeItem(userStorageKey);
		context.setUser('');
	}

    return (
        <View>
			<Text>Bienvenue {user.firstname||"test"}</Text>
			<Text> {user.name||"test"}</Text>
			<Text> {user.email||"test"}</Text>
			<Button
				title = "logout"
				onPress = {doLogout}
			/>
        </View>
    )
}
