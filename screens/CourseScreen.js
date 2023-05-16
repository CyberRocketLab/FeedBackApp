import React from 'react';
import { Button, View, Text } from 'react-native';

function CourseScreen({ route, navigation }) {
    const { course } = route.params;

    return (
        <View>
            <Text>{course}</Text>
            <Button title="Feedback" onPress={() => navigation.navigate('Feedback', { course })} />
            <Button title="View Score" onPress={() => navigation.navigate('Score', { course })} />
        </View>
    );
}

export default CourseScreen;

