import { View, Text, StyleSheet, Pressable, TextInput,FlatList } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import NewPassenger from './Screens/NewPassenger';
import Detail from './Screens/Detail';
import Home from './Screens/Home';
import Infos from './Screens/Infos';
import Passengers from './Screens/Passengers';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createStackNavigator()
const Tab = createMaterialBottomTabNavigator();


function MyStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen 
            name='Home'
            component={Home}
            options={{headerShown: false}}
          />

          <Stack.Screen 
            name='NewPassenger' 
            component={NewPassenger} 
          />
          <Stack.Screen 
            name='Passengers'
            component={Passengers}
            options={{headerShown: false}}
          />
          <Stack.Screen 
            name='Detail'
            component={Detail}
          />
          <Stack.Screen 
            name='Infos'
            component={Infos}
            options={{headerShown: false}}
          />
        
      </Stack.Navigator>
    )
}   

function MyTabs() {
  return (
    <Tab.Navigator 
      barStyle={{ backgroundColor: 'white' }}
    >
      <Tab.Screen 
      name="Home" component={MyStack}
      options={{
        tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={25} />
        ),
      }}/>
      <Tab.Screen
       name="Passenger" component={Passengers} 
       options={{
        tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="head" color={color} size={25} />
        ),
      }}/>
      <Tab.Screen name="Infos" component={Infos} 
      options={{
        tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="car" color={color} size={25} />
        ),
      }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      
      <MyTabs/>

    </NavigationContainer>
  );
}

