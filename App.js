import React, { createContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screen/Login';
import { NavigationContainer } from '@react-navigation/native';
import { getUser } from './service/userService';
import Home from './screen/Home';
import Moncompte from './screen/Moncompte';

const Stack = createStackNavigator();

export const UserContext = createContext({
  user : {},
  setUser: () => {}
});

export default function App() {

	const [user, setUser] = useState('');

	useEffect(() => {
		getUser().then(result => setUser(result));
	}, []);

	const userContextValue = {
		user: user,
		setUser: setUser
	};

  return (
	<UserContext.Provider value = {userContextValue}>
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="login" component={Login} />
				<Stack.Screen name="home" component={Home} />
				<Stack.Screen name="Mon Compte" component={Moncompte} />
			</Stack.Navigator>
		</NavigationContainer>
	</UserContext.Provider>
  );
}

const styles = StyleSheet.create({});
