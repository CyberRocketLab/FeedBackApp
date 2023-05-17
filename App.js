import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import FacultiesScreen from './screens/FacultiesScreen';
import CoursesScreen from './screens/CoursesScreen';
import CourseScreen from './screens/CourseScreen';
import FeedbackScreen from './screens/FeedbackScreen';
import ForumScreen from './screens/ForumScreen';
import PersonalSettingsScreen from './screens/PersonalSettingsScreen';

import {CourseContext} from './screens/CourseContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
    // ...
    return (
        <Stack.Navigator initialRouteName="Faculties">
            <Stack.Screen name="Faculties" component={FacultiesScreen}/>
            <Stack.Screen name="Courses" component={CoursesScreen}/>
            <Stack.Screen name="Course" component={CourseScreen}/>
            <Stack.Screen name="Feedback" component={FeedbackScreen}/>
            <Stack.Screen name="Forum" component={ForumScreen}/>
        </Stack.Navigator>
    );
}

function SettingsStack() {
    // ...
    return (
        <Stack.Navigator initialRouteName="Personal Settings"
                         screenOptions={{
                             headerShown: false,  // This line hides the header
                         }}>
            <Stack.Screen name="Personal Settings" component={PersonalSettingsScreen}/>
            {/* Add more screens here if there are other screens under Personal Settings */}
        </Stack.Navigator>
    );
}

function App() {
    const [scores, setScores] = useState({});

    return (
        <CourseContext.Provider value={{scores, setScores}}>
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={({route}) => ({
                        tabBarIcon: ({focused, color, size}) => {
                            let iconName;
                            if (route.name === 'Home') {
                                iconName = focused ? 'home' : 'home-outline';
                            } else if (route.name === 'Settings') {
                                iconName = focused ? 'settings' : 'settings-outline';
                            }
                            return <Ionicons name={iconName} size={size} color={color}/>;
                            },
                        tabBarActiveTintColor: 'tomato',
                        tabBarInactiveTintColor: 'gray',
                        tabBarStyle: [
                            { display: "flex" },
                            null
                        ]
                    })}
                    >
                    <Tab.Screen
                        name="Home"
                        component={HomeStack}
                        options={{title: 'Faculties', headerShown: false}}
                    />
                    <Tab.Screen name="Settings" component={SettingsStack}/>
                </Tab.Navigator>
            </NavigationContainer>
        </CourseContext.Provider>
        );
}

export default App;
