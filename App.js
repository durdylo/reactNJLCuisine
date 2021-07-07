import React, { createContext, useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screen/Login';
import { NavigationContainer } from '@react-navigation/native';
import { getUser } from './service/userService';
import Home from './screen/Home';
import Moncompte from './screen/Moncompte';
import Register from './screen/Register';

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
  const Tab = createBottomTabNavigator();

	const userContextValue = {
		user: user,
		setUser: setUser
	};

  return (
	<UserContext.Provider value = {userContextValue}>
		{/* <NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="login" component={Login} />
				<Stack.Screen name="home" component={Home} />
				<Stack.Screen name="Mon Compte" component={Moncompte} />
				<Stack.Screen name="register" component={Register} />
			</Stack.Navigator>
		</NavigationContainer> */}
    <NavigationContainer>
      <Tab.Navigator>
      <Tab.Screen name="login" component={Login}  />
      <Tab.Screen name="register" component={Register}  />
      </Tab.Navigator>
    </NavigationContainer>
	</UserContext.Provider>
  );
}

const styles = StyleSheet.create({});
