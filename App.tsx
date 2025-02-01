import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import Home from './src/screens/Home';
import Explore from './src/screens/Explore';
import Favorites from './src/screens/Favorites';
import Octicons from 'react-native-vector-icons/Octicons'
import { colors } from './src/theme';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.activeTabColor,
          tabBarInactiveTintColor: colors.inactiveTabColor,
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: colors.primary
          }
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon:
              ({ color, size, focused }) => <Octicons
                name="home"
                size={focused ? size : 20}
                color={color}
              />
          }} />
        <Tab.Screen
          name="Explore"
          component={Explore}
          options={{
            tabBarIcon:
              ({ color, size, focused }) => <Octicons
                name="search"
                size={focused ? size : 20}
                color={color}
              />
          }}
        />
        <Tab.Screen
          name="Favorites"
          component={Favorites}
          options={{
            tabBarIcon:
              ({ color, size, focused }) => <Octicons
                name={focused ? "heart-fill" : "heart"}
                size={focused ? size : 20}
                color={color}
              />
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}





