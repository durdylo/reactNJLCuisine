import React, { createContext, useEffect, useState, useContext} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screen/Login';
import { NavigationContainer } from '@react-navigation/native';
import { getUser } from './service/userService';
import Home from './screen/Home';
import Moncompte from './screen/Moncompte';
import Register from './screen/Register';
import Admin from './screen/Admin';

const Stack = createStackNavigator();

export const UserContext = createContext({
  user: {},
  setUser: () => { }
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
  const SettingsStack = createStackNavigator();

  function HomeStackScreen() {
    return (
      <SettingsStack.Navigator>
        <SettingsStack.Screen name="home" component={Home} />
        <SettingsStack.Screen name="login" component={Login} />
        <SettingsStack.Screen name="register" component={Register} />
      </SettingsStack.Navigator>
    );
  }
  function AccountStackScreen() {

    return (
      <SettingsStack.Navigator>
        <SettingsStack.Screen name="Mon compte" component={Moncompte} />
      </SettingsStack.Navigator>
    );
  }
  function LoginStackScreen() {
    return (
      <SettingsStack.Navigator>
        <SettingsStack.Screen name="login" component={Login}/>
        <SettingsStack.Screen name="register" component={Register}/>
      </SettingsStack.Navigator>
    );
  }
  function AdminStackScreen(){
      return (
        <SettingsStack.Navigator>
          <SettingsStack.Screen name="Admin" component={Admin} />
        </SettingsStack.Navigator>
      );
    
  }
  console.log(user.email);
  if(user.email !== undefined){
    console.log(user);
    if(user.role === '0'){
      return (
        <UserContext.Provider value={userContextValue}>
          <NavigationContainer>
            <Tab.Navigator>
              <Tab.Screen name="home" component={HomeStackScreen}/>
              <Tab.Screen name="account" component={AccountStackScreen}/>
              <Tab.Screen name="Admin" component={AdminStackScreen}/>
            </Tab.Navigator>
          </NavigationContainer>
        </UserContext.Provider>
      );
    }
      return (
        <UserContext.Provider value={userContextValue}>
          <NavigationContainer>
            <Tab.Navigator>
              <Tab.Screen name="home" component={HomeStackScreen}/>
              <Tab.Screen name="account" component={AccountStackScreen}/>
            </Tab.Navigator>
          </NavigationContainer>
        </UserContext.Provider>
      );
  
  }else{
    return (
      <UserContext.Provider value={userContextValue}>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="home" component={HomeStackScreen}/>
            <Tab.Screen name="login" component={LoginStackScreen}/>
          </Tab.Navigator>
        </NavigationContainer>
      </UserContext.Provider>
    );
  }

}

const styles = StyleSheet.create({});
