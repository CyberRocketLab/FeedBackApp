import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { CourseContext } from './CourseContext';

function CourseScreen({ route, navigation }) {
    const { course } = route.params;
    const { scores } = useContext(CourseContext);
    const averageScore = (scores[course]?.averageScore || 0).toFixed(2);

    return (
        <View style={styles.container}>
            <Text style={styles.courseTitle}>{course}</Text>
            <Text style={styles.averageScore}>Average Score: {averageScore}</Text>
            <View style={styles.buttonContainer}>
                <TouchableHighlight
                    style={styles.button}
                    underlayColor="#e0dcdc" // Set the background color when the button is pressed
                    onPress={() => navigation.navigate('Feedback', { course })}
                >
                    <Text style={styles.buttonText}>Feedback</Text>
                </TouchableHighlight>

                <TouchableHighlight
                    style={styles.button}
                    underlayColor="#e0dcdc" // Set the background color when the button is pressed
                    onPress={() => navigation.navigate('Forum')}
                >
                    <Text style={styles.buttonText}>Forum</Text>
                </TouchableHighlight>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#ffffff',
    },
    courseTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        paddingBottom: 15,
        paddingLeft: 10,
    },
    averageScore: {
        fontSize: 18,
        marginBottom: 10,
        paddingLeft: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        flex: 1,
        backgroundColor: '#f9c2ff',
        borderRadius: 16,
        padding: 10,
        marginBottom: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    buttonText: {
        fontSize: 18,
    },
});

export default CourseScreen;
