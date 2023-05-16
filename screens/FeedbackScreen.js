import React from 'react';
import { Button, View } from 'react-native';
import { Input } from 'react-native-elements';

function FeedbackScreen({ route, navigation }) {
    const { course } = route.params;

    return (
        <View>
            <Input placeholder="Question 1" />
            <Input placeholder="Question 2" />
            <Input placeholder="Question 3" />
            <Button title="Submit" onPress={() => navigation.goBack()} />
        </View>
    );
}

export default FeedbackScreen;
