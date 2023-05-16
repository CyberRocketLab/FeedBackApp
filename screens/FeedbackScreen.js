import React, { useContext, useState, useEffect } from 'react';
import { Button, View, Text } from 'react-native';
import Slider from '@react-native-community/slider';
import { CourseContext } from './CourseContext';

function FeedbackScreen({ route, navigation }) {
    const { course } = route.params;
    const { scores, setScores } = useContext(CourseContext);

    const [rating1, setRating1] = useState(5);
    const [rating2, setRating2] = useState(5);
    const [rating3, setRating3] = useState(5);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        if (submitted) {
            const newAverage = ((scores[course]?.averageScore * scores[course]?.numberOfReviews || 0) + ((rating1 + rating2 + rating3) / 3)) / ((scores[course]?.numberOfReviews || 0) + 1);
            setScores(prevScores => ({
                ...prevScores,
                [course]: {
                    averageScore: newAverage,
                    numberOfReviews: (scores[course]?.numberOfReviews || 0) + 1
                },
            }));
            setSubmitted(false);
        }
    }, [submitted]);

    const submit = () => {
        setSubmitted(true);
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
        </View>
    );
}

export default FeedbackScreen;
