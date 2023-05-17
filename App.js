////import React, {useState} from 'react';
////import {NavigationContainer} from '@react-navigation/native';
////import {createStackNavigator} from '@react-navigation/stack';
////
////import FacultiesScreen from './screens/FacultiesScreen';
////import CoursesScreen from './screens/CoursesScreen';
////import CourseScreen from './screens/CourseScreen';
////import FeedbackScreen from './screens/FeedbackScreen';
////import ForumScreen from './screens/ForumScreen';
////
////import {CourseContext} from './screens/CourseContext'; // make sure the path is correct
////
////const Stack = createStackNavigator();
////
////function App() {
////    const [scores, setScores] = useState({});
////
////    return (
////        <CourseContext.Provider value={{scores, setScores}}>
////            <NavigationContainer>
////                <Stack.Navigator initialRouteName="Faculties">
////                    <Stack.Screen name="Faculties" component={FacultiesScreen}/>
////                    <Stack.Screen name="Courses" component={CoursesScreen}/>
////                    <Stack.Screen name="Course" component={CourseScreen}/>
////                    <Stack.Screen name="Feedback" component={FeedbackScreen}/>
////                    <Stack.Screen name="Forum" component={ForumScreen}/>
////                </Stack.Navigator>
////            </NavigationContainer>
////        </CourseContext.Provider>
////    );
////}
////// test
////export default App;
//
//
//import React, { useState } from 'react';
//import { NavigationContainer } from '@react-navigation/native';
//import { createStackNavigator } from '@react-navigation/stack';
//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//
//import FacultiesScreen from './screens/FacultiesScreen';
//import CoursesScreen from './screens/CoursesScreen';
//import CourseScreen from './screens/CourseScreen';
//import FeedbackScreen from './screens/FeedbackScreen';
//import ForumScreen from './screens/ForumScreen';
//import PersonalSettingsScreen from './screens/PersonalSettingsScreen'; // Import your PersonalSettingsScreen
//
//import { CourseContext } from './screens/CourseContext'; // make sure the path is correct
//
//const Stack = createStackNavigator();
//const Tab = createBottomTabNavigator();
//
//function HomeStack() {
//    return (
//        <Stack.Navigator initialRouteName="Faculties">
//            <Stack.Screen name="Faculties" component={FacultiesScreen} />
//            <Stack.Screen name="Courses" component={CoursesScreen} />
//            <Stack.Screen name="Course" component={CourseScreen} />
//            <Stack.Screen name="Feedback" component={FeedbackScreen} />
//            <Stack.Screen name="Forum" component={ForumScreen} />
//        </Stack.Navigator>
//        );
//}
//
//function SettingsStack() {
//    return (
//        <Stack.Navigator initialRouteName="Personal Settings"
//            screenOptions={{
//            headerShown: false,  // This line hides the header
//        }}>
//            <Stack.Screen name="Personal Settings" component={PersonalSettingsScreen} />
//            {/* Add more screens here if there are other screens under Personal Settings */}
//        </Stack.Navigator>
//        );
//}
//
//function App() {
//    const [scores, setScores] = useState({});
//
//    return (
//        <CourseContext.Provider value={{ scores, setScores }}>
//            <NavigationContainer>
//                <Tab.Navigator>
//                    <Tab.Screen
//                        name="Home"
//                        component={HomeStack}
//                        options={{ title: 'Faculties',headerShown: false, }}// Customizes the header title for the Home stack
//                    />
//                    <Tab.Screen name="Settings" component={SettingsStack} />
//                </Tab.Navigator>
//            </NavigationContainer>
//        </CourseContext.Provider>
//        );
//}
//
//export default App;


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
import PersonalSettingsScreen from './screens/PersonalSettingsScreen'; // Import your PersonalSettingsScreen

import {CourseContext} from './screens/CourseContext'; // make sure the path is correct

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

                            // Select an icon based on the route name
                            if (route.name === 'Home') {
                                iconName = focused ? 'home' : 'home-outline';
                            } else if (route.name === 'Settings') {
                                iconName = focused ? 'settings' : 'settings-outline';
                            }

                            // Return the Icon component
                            return <Ionicons name={iconName} size={size} color={color}/>;
                        },
                    })}
                    tabBarOptions={{
                        activeTintColor: 'tomato',
                        inactiveTintColor: 'gray',
                    }}
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
