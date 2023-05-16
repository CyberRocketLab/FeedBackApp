import React, { useState, useEffect } from 'react';
import { Button, View, Text } from 'react-native';
import Slider from '@react-native-community/slider';

function FeedbackScreen({ route, navigation }) {
    const { course } = route.params;

    const [rating1, setRating1] = useState(5);
    const [rating2, setRating2] = useState(5);
    const [rating3, setRating3] = useState(5);
    const [submitted, setSubmitted] = useState(false);
    const [averageScore, setAverageScore] = useState(0);
    const [numberOfReviews, setNumberOfReviews] = useState(0);

    useEffect(() => {
        if (submitted) {
            const newAverage = ((averageScore * numberOfReviews) + ((rating1 + rating2 + rating3) / 3)) / (numberOfReviews + 1);
            setAverageScore(newAverage);
            setNumberOfReviews(numberOfReviews + 1);
            setSubmitted(false);
        }
    }, [submitted]);

    const submit = () => {
        setSubmitted(true);
    };

    const viewScore = () => {
        navigation.navigate('Score', {
            course: course,
            averageScore: averageScore.toFixed(2),
        });
    };

    return (
        <View>
            <Text>Question 1: {rating1}</Text>
            <Slider value={rating1} onValueChange={setRating1} minimumValue={1} maximumValue={10} step={1} />

            <Text>Question 2: {rating2}</Text>
            <Slider value={rating2} onValueChange={setRating2} minimumValue={1} maximumValue={10} step={1} />

            <Text>Question 3: {rating3}</Text>
            <Slider value={rating3} onValueChange={setRating3} minimumValue={1} maximumValue={10} step={1} />

            <Button title="Submit" onPress={submit} />
            {submitted && <Text>Thank you for your review</Text>}
            <Button title="View Score" onPress={viewScore} />
        </View>
    );
}

export default FeedbackScreen;
