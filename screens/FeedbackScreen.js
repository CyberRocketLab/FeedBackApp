import React, {useContext, useState, useEffect} from 'react';
import {Button, View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import Slider from '@react-native-community/slider';
import {CourseContext} from './CourseContext';

function FeedbackScreen({route, navigation}) {
    const {course} = route.params;
    const {scores, setScores} = useContext(CourseContext);

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
            navigation.goBack();
        }
    }, [submitted]);

    const submit = () => {
        setSubmitted(true);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Provide Feedback</Text>

            <Text style={styles.label}>Difficulty: {rating1}</Text>
            <Slider value={rating1} onValueChange={setRating1} minimumValue={1} maximumValue={10} step={1}
                    style={styles.slider}/>

            <Text style={styles.label}>Question 2: {rating2}</Text>
            <Slider value={rating2} onValueChange={setRating2} minimumValue={1} maximumValue={10} step={1}
                    style={styles.slider}/>

            <Text style={styles.label}>Question 3: {rating3}</Text>
            <Slider value={rating3} onValueChange={setRating3} minimumValue={1} maximumValue={10} step={1}
                    style={styles.slider}/>

            <View style={styles.buttonContainer}>
                <TouchableHighlight
                    style={styles.button}
                    underlayColor="#e0dcdc" // Set the background color when the button is pressed
                    onPress={submit}
                >
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableHighlight>
            </View>

            {submitted && <Text style={styles.submittedText}>Thank you for your review</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#ffffff',
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
    },
    slider: {
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignSelf: "center",
    },
    button: {
        backgroundColor: '#f9c2ff',
        borderRadius: 10,
        padding: 10,
        marginBottom: 8,
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
    },
    buttonText:
        {
            fontSize: 18,
        },
    submittedText: {
        fontSize: 18,
        marginTop: 10,
        color: 'green',
    },
});

export default FeedbackScreen;