import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from '../screen/Login';
import Register from '../screen/Register';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Login" component={Login} />
      <Tab.Screen name="Register" component={Register} />
    </Tab.Navigator>
  );
}