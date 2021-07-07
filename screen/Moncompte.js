import React, { useContext } from "react";
import { View, Text } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUser } from '../service/userService';
import { UserContext } from "../App";


export default function Moncompte() {
	const {user} = useContext(UserContext);
    console.log(user.email);
    return (
        <View>
			<Text>Bienvenue {user.firstname||"test"}</Text>
			<Text>Bienvenue {user.name||"test"}</Text>
			<Text>Bienvenue {user.email||"test"}</Text>
        </View>
    )
}
