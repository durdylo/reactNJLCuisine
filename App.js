import { StatusBar } from 'expo-status-bar';
import React, { createContext, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/Login';
import { NavigationContainer } from '@react-navigation/native';
import { getUser } from './services/userService';

const Stack = createStackNavigator();
export const UserContext = createContext({
  user: {},
  setUser: () => { }
});
export default function App() {
  const [user, setUser] = useState('');
  useEffect(() => {
    getUser.then(result => setUser(result))
  }, []);
const userContextValue = {
  user: user,
  setUser, setUser
}
return (
  <UserContext.Provider value={userContextValue}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="login" component={Login}></Stack.Screen>
        <Stack.Screen name="home" component={Login}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  </UserContext.Provider>


);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
