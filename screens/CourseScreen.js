// CourseScreen.js
import React, { useContext } from 'react';
import { Button, View, Text } from 'react-native';
import { CourseContext } from './CourseContext';

function CourseScreen({ route, navigation }) {
    const { course } = route.params;
    const { scores } = useContext(CourseContext);

    return (
        <View>
            <Text>{course}</Text>
            <Button title="Feedback" onPress={() => navigation.navigate('Feedback', { course })} />
            <Button title="View Score" onPress={() => navigation.navigate('Score', { course, averageScore: (scores[course]?.averageScore || 0).toFixed(2) })} />
            <Button title="Forum" onPress={() => navigation.navigate('Forum')} />
        </View>
    );
}

export default CourseScreen;
