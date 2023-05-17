import React, {useContext, useState, useEffect} from 'react';
import {Button, View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import Slider from '@react-native-community/slider';
import {CourseContext} from './CourseContext';

function FeedbackScreen({route, navigation}) {
    // Getting course
    const {course} = route.params;
    // Getting scores from Context
    const {scores, setScores} = useContext(CourseContext);

    // Setting and storing data
    const [rating1, setRating1] = useState(5); // 5 is for default score
    const [rating2, setRating2] = useState(5);
    const [rating3, setRating3] = useState(5);
    const [rating4, setRating4] = useState(5);
    const [rating5, setRating5] = useState(5);
    const [submitted, setSubmitted] = useState(false);

    // Updating the Average Score based on new Submit
    useEffect(() => {
        if (submitted) {
            const newAverage =
                ((scores[course]?.averageScore || 0) * (scores[course]?.numberOfReviews || 0) +
                    (rating1 + rating2 + rating3 + rating4 + rating5) / 5) /
                ((scores[course]?.numberOfReviews || 0) + 1);

            setScores(prevScores => ({
                ...prevScores,
                [course]: {
                    averageScore: newAverage,
                    numberOfReviews: (scores[course]?.numberOfReviews || 0) + 1,
                },
            }));

            setSubmitted(false);
            navigation.goBack(); // Navigating back to CourseScreen
        }
    }, [submitted]);

    const submit = () => {
        setSubmitted(true);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Provide Feedback</Text>

            <Text style={styles.label}>Difficulty: {'\n'}{rating1}</Text>
            <Slider
                value={rating1}
                onValueChange={setRating1}
                minimumValue={1}
                maximumValue={10}
                step={1}
                style={styles.slider}
            />

            <Text style={styles.label}>Question 2: {'\n'}{rating2}</Text>
            <Slider
                value={rating2}
                onValueChange={setRating2}
                minimumValue={1}
                maximumValue={10}
                step={1}
                style={styles.slider}
            />

            <Text style={styles.label}>Question 3: {'\n'}{rating3}</Text>
            <Slider
                value={rating3}
                onValueChange={setRating3}
                minimumValue={1}
                maximumValue={10}
                step={1}
                style={styles.slider}
            />

            <Text style={styles.label}>Question 4: {'\n'}{rating4}</Text>
            <Slider
                value={rating4}
                onValueChange={setRating4}
                minimumValue={1}
                maximumValue={10}
                step={1}
                style={styles.slider}
            />

            <Text style={styles.label}>Question 5: {'\n'}{rating5}</Text>
            <Slider
                value={rating5}
                onValueChange={setRating5}
                minimumValue={1}
                maximumValue={10}
                step={1}
                style={styles.slider}
            />

            <View style={styles.buttonContainer}>
                <TouchableHighlight
                    style={styles.button}
                    underlayColor="#E0DCDC"
                    onPress={submit}
                >
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableHighlight>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F5F5F5',
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
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignSelf: 'center',
    },
    button: {
        flex: 1,
        padding: 10,
        marginBottom: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
        backgroundColor: '#FFFFFF',
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginVertical: 5,
        borderRadius: 5,
        borderColor: '#E0E0E0',
        borderWidth: 1,
//    shadowColor: '#000',
//    shadowOffset: {
//      width: 0,
//      height: 1,
//    },
//    shadowOpacity: 0.2,
//    shadowRadius: 2,
//    elevation: 3,
    },
    buttonText: {
        fontSize: 18,
    },
});

export default FeedbackScreen;
