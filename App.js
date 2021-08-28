import React from 'react'
import { View, StatusBar } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import index from './src/index'
import address from './src/addressscreen'
import profile from './src/profilescreen'
import card from './src/cardscreen'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
const App = () => {
  return (

    <NavigationContainer>
      <StatusBar backgroundColor="#e6eaf5" barStyle="dark-content" />
      <Tab.Navigator>

        <Tab.Screen name="Home" component={index}

          options={{
            headerShown: false,

            tabBarIcon: ({ color }) => (
              <Ionicons name="home-outline" color={color} size={25} />
            ),
          }}
        />
        <Tab.Screen name="Card" component={card}
          options={{
            headerShown: false,
            tabBarLabel: 'Category',
            tabBarIcon: ({ color }) => (
              <Ionicons name="apps-outline" color={color} size={25} />
            ),
          }}
        />
        <Tab.Screen name="Address" component={address} />
        <Tab.Screen name="Profile" component={profile} />
      </Tab.Navigator>
    </NavigationContainer>

  )



}

export default App;
