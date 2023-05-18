import React, {useContext, useState, useEffect} from 'react';
import {Button, View, Text, StyleSheet, TouchableHighlight, ScrollView, Alert} from 'react-native';
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
            Alert.alert('Success', 'Vielen Dank für das Feedback!');
            navigation.goBack(); // Navigating back to CourseScreen
        }
    }, [submitted]);

    const submit = () => {
        setSubmitted(true);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Provide Feedback</Text>
            <ScrollView>

            <Text style={styles.label}>Die Lehrperson ist zur Vermittlung der Inhalte der LV geeignet: {'\n'}{rating1}</Text>
            <Slider
                value={rating1}
                onValueChange={setRating1}
                minimumValue={1}
                maximumValue={10}
                step={1}
            />

            <Text style={styles.label}>Die Anzahl der ECTS-Punkte entspricht dem Aufwand der LV: {'\n'}{rating2}</Text>
            <Slider
                value={rating2}
                onValueChange={setRating2}
                minimumValue={1}
                maximumValue={10}
                step={1}
            />

            <Text style={styles.label}>Ich empfinde die Inhalte als wichtig für kommende LVs: {'\n'}{rating3}</Text>
            <Slider
                value={rating3}
                onValueChange={setRating3}
                minimumValue={1}
                maximumValue={10}
                step={1}
            />

            <Text style={styles.label}>Die Prüfungsanforderungen sind realistisch: {'\n'}{rating4}</Text>
            <Slider
                value={rating4}
                onValueChange={setRating4}
                minimumValue={1}
                maximumValue={10}
                step={1}
            />

            <Text style={styles.label}>Ich würde die LV an meine Kommiliton*innen weiterempfehlen: {'\n'}{rating5}</Text>
            <Slider
                value={rating5}
                onValueChange={setRating5}
                minimumValue={1}
                maximumValue={10}
                step={1}
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
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#FF6347',
    },
    ratingContainer: {
        marginBottom: 30,
    },
    ratingText: {
        fontSize: 48,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    label: {
        fontSize: 18,
        color: '#2D3748',
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#3182CE',
        paddingVertical: 15,
        borderRadius: 5,
        marginTop: 30,
    },
    buttonText: {
        fontSize: 18,
        color: '#fff',
        textAlign: 'center',
    },

});


export default FeedbackScreen;
