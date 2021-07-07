import React, { useContext } from "react";
import {StyleSheet, Text, View } from "react-native";
import { UserContext } from "../App";

export default function Home() {

	const {user} = useContext(UserContext);

	return (
		<View>
			<Text>Bienvenue {user.username||"test"}</Text>
		</View>
	);
}

const styles = StyleSheet.create({});