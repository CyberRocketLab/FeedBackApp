import React from 'react';
import { Text, View } from 'react-native';

function ScoreScreen({ route }) {
    const { course } = route.params;

    return (
        <View>
            <Text>Score for {course}: 8/10</Text>
        </View>
    );
}

export default ScoreScreen;
