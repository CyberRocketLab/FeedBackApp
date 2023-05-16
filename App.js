import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import FacultiesScreen from './screens/FacultiesScreen';
import CoursesScreen from './screens/CoursesScreen';
import CourseScreen from './screens/CourseScreen';
import FeedbackScreen from './screens/FeedbackScreen';
import ScoreScreen from './screens/ScoreScreen';

import { CourseContext } from './screens/CourseContext'; // make sure the path is correct

const Stack = createStackNavigator();

function App() {
    const [scores, setScores] = useState({});

    return (
        <CourseContext.Provider value={{ scores, setScores }}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Faculties">
                    <Stack.Screen name="Faculties" component={FacultiesScreen} />
                    <Stack.Screen name="Courses" component={CoursesScreen} />
                    <Stack.Screen name="Course" component={CourseScreen} />
                    <Stack.Screen name="Feedback" component={FeedbackScreen} />
                    <Stack.Screen name="Score" component={ScoreScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </CourseContext.Provider>
    );
}

export default App;
