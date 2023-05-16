import React from 'react';
import { Text, View } from 'react-native';

function ScoreScreen({ route }) {
    const { course, averageScore } = route.params;

    return (
        <View>
            <Text>Score for {course}: {averageScore}/10</Text>
        </View>
    );
}

export default ScoreScreen;
