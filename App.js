import React, { createContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screen/login';
import { NavigationContainer } from '@react-navigation/native';
import { getUser } from './service/userService';
import Home from './screen/home';

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
			</Stack.Navigator>
		</NavigationContainer>
	</UserContext.Provider>
  );
}

const styles = StyleSheet.create({});
