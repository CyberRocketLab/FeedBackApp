import React, {useContext, useState, useEffect} from 'react';
import {Button, View, Text, StyleSheet, TouchableHighlight, ScrollView, Alert} from 'react-native';
import Slider from '@react-native-community/slider';
import {CourseContext} from './CourseContext';

// FeedbackScreen provides a feedback form
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
            // Calculating new average score based on current average score
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
            // Showing a Success alert after submission
            Alert.alert('Erfolg', 'Vielen Dank für das Feedback!');
            navigation.goBack(); // Navigating back to CourseScreen
        }
    }, [submitted]);

    const submit = () => {
        setSubmitted(true);
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.card}>
                    <Text style={styles.label}>Die Lehrperson ist zur Vermittlung der Inhalte der LV geeignet:</Text>
                    <View style={styles.sliderRating}>
                        <Text  style={styles.badGoodRating} >Stimme nicht zu</Text>
                        <Text style={styles.badGoodRating}>Stimme völlig zu</Text>
                    </View>
                    <Text style={styles.ratingNumber}>{rating1}</Text>
                    <Slider

                        value={rating1}
                        onValueChange={setRating1}
                        minimumValue={1}
                        maximumValue={10}
                        step={1}
                    />

                </View>
                <View style={styles.card}>
                    <Text style={styles.label}>Die Anzahl der ECTS-Punkte entspricht dem Aufwand der
                        LV:</Text>
                    <View style={styles.sliderRating}>
                        <Text  style={styles.badGoodRating} >Stimme nicht zu</Text>
                        <Text style={styles.badGoodRating}>Stimme völlig zu</Text>
                    </View>
                    <Text style={styles.ratingNumber}>{rating2}</Text>
                    <Slider
                        value={rating2}
                        onValueChange={setRating2}
                        minimumValue={1}
                        maximumValue={10}
                        step={1}
                    />
                </View>
                <View style={styles.card}>
                    <Text style={styles.label}>Ich empfinde die Inhalte als wichtig für kommende
                        LVs: </Text>
                    <View style={styles.sliderRating}>
                        <Text  style={styles.badGoodRating} >Stimme nicht zu</Text>
                        <Text style={styles.badGoodRating}>Stimme völlig zu</Text>
                    </View>
                    <Text style={styles.ratingNumber}>{rating3}</Text>
                    <Slider
                        value={rating3}
                        onValueChange={setRating3}
                        minimumValue={1}
                        maximumValue={10}
                        step={1}
                    />
                </View>
                <View style={styles.card}>
                    <Text style={styles.label}>Die Prüfungsanforderungen sind realistisch: </Text>
                    <View style={styles.sliderRating}>
                        <Text  style={styles.badGoodRating} >Stimme nicht zu</Text>
                        <Text style={styles.badGoodRating}>Stimme völlig zu</Text>
                    </View>
                    <Text style={styles.ratingNumber}>{rating4}</Text>
                    <Slider
                        value={rating4}
                        onValueChange={setRating4}
                        minimumValue={1}
                        maximumValue={10}
                        step={1}
                    />
                </View>
                <View style={styles.card}>
                    <Text style={styles.label}>Ich würde die LV an meine Kommiliton*innen
                        weiterempfehlen:</Text>
                    <View style={styles.sliderRating}>
                        <Text  style={styles.badGoodRating} >Stimme nicht zu</Text>
                        <Text style={styles.badGoodRating}>Stimme völlig zu</Text>
                    </View>
                    <Text style={styles.ratingNumber}>{rating5}</Text>
                    <Slider
                        value={rating5}
                        onValueChange={setRating5}
                        minimumValue={1}
                        maximumValue={10}
                        step={1}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableHighlight
                        style={styles.button}
                        underlayColor="#E0DCDC"
                        onPress={submit}
                    >
                        <Text style={styles.buttonText}>Abgeben</Text>
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
        width: '100%',
    },
    title: {
        fontSize: 28,
        fontWeight:
            'bold',
        marginVertical: 10,
        textAlign: 'center',
        color: '#3182CE',
    },
    ratingContainer: {
        marginBottom: 30,
    },
    card: {
        borderRadius: 5,
        borderColor: '#E0E0E0',
        borderWidth: 1,
        backgroundColor: '#FFFFFF',
        padding: 10,
        paddingTop: 15,
        marginBottom: 15,
        marginHorizontal: 12,
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
        marginVertical: 5,
        marginHorizontal: 12,

    },
    buttonText: {
        fontSize: 18,
        color: '#fff',
        textAlign: 'center',
    },
    scrollView: {
        marginTop: 10,
        flex: 1,
    },
    ratingNumber: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: "center",
        marginVertical: 5,
    },
    sliderRating: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30,  // add some space between the text and the slider
    },
    badGoodRating: {
        fontSize: 14,
        color: '#3182CE',
    },

});


export default FeedbackScreen;
