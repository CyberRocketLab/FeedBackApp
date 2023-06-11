import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {enableScreens} from 'react-native-screens';
enableScreens();


import FacultiesScreen from './screens/FacultiesScreen';
import CoursesScreen from './screens/CoursesScreen';
import CourseScreen from './screens/CourseScreen';
import FeedbackScreen from './screens/FeedbackScreen';
import ForumScreen from './screens/ForumScreen';
import PersonalSettingsScreen from './screens/PersonalSettingsScreen';

import {CourseContext} from './screens/CourseContext';

// Add the new imports
import {SafeAreaProvider} from "react-native-safe-area-context";
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
    return (
        <Stack.Navigator initialRouteName="Faculties">
            <Stack.Screen name="Fakultäten" component={FacultiesScreen}
                          options={{headerBackTitle: 'Zurück'}}/>
            <Stack.Screen name="Lehrveranstaltungen" component={CoursesScreen}
                          options={{headerBackTitle: 'Zurück'}}/>
            <Stack.Screen name="Lehrveranstaltung" component={CourseScreen}
                          options={{headerBackTitle: 'Zurück'}}/>
            <Stack.Screen name="Umfrage" component={FeedbackScreen} options={{headerBackTitle: 'Zurück'}}/>
            <Stack.Screen name="Chat" component={ForumScreen} options={{headerBackTitle: 'Zurück'}}/>
        </Stack.Navigator>
    );
}

function SettingsStack() {
    return (
        <Stack.Navigator initialRouteName="Personal Settings"
                         screenOptions={{
                             headerShown: false,
                         }}>
            <Stack.Screen name="Personal Settings" component={PersonalSettingsScreen}/>
        </Stack.Navigator>
    );
}

function App() {
    const [scores, setScores] = useState({});

    return (
        <SafeAreaProvider>
            <GestureHandlerRootView style={{flex: 1}}>
                <CourseContext.Provider value={{scores, setScores}}>
                    <NavigationContainer>
                        <Tab.Navigator
                            screenOptions={({route}) => ({
                                tabBarIcon: ({focused, color, size}) => {
                                    let iconName;
                                    if (route.name === 'Home') {
                                        iconName = focused ? 'home' : 'home';
                                    } else if (route.name === 'Settings') {
                                        iconName = focused ? 'person' : 'person';
                                    }
                                    return <Ionicons name={iconName} size={size} color={color}/>;
                                },
                                tabBarActiveTintColor: '#3182CE',
                                tabBarShowLabel: false,
                                tabBarInactiveTintColor: 'gray',
                                tabBarStyle: [
                                    {display: "flex"},
                                    null
                                ]
                            })}
                        >
                            <Tab.Screen
                                name="Home"
                                component={HomeStack}
                                options={{title: 'Home', headerShown: false}}
                            />
                            <Tab.Screen
                                name="Settings"
                                component={SettingsStack}
                                options={{title: 'Persönliche Daten'}}/>
                        </Tab.Navigator>
                    </NavigationContainer>
                </CourseContext.Provider>
            </GestureHandlerRootView>
        </SafeAreaProvider>
    );
}

export default App;
