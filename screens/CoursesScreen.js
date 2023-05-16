import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableHighlight } from 'react-native';

function CoursesScreen({ route, navigation }) {
    const { faculty } = route.params;

    // Data structure containing faculties, semesters, and courses
    const faculties = {
        'Informatik': {
            '1': ['Informatik + Recht (RGG)', 'Theoretische Informatik (THI)', 'Technische Grundlagen der Informatik (TGI)', 'Mathematische Grundlagen der Informatik (MG1)', 'Programmierung 1 (PR1)'],
            '2': ['Modellierung (MOD)', 'Informatik + Gesellschaft (RGG)', 'Algorithmen und Datenstrukturen (ADS)', 'Betriebssysteme (OS)', 'Mathematische Grundlagen der Informatik 2 (MG2)', 'Programmierung 2 (PR2)'],
            '3': ['Projekt-manage-ment (HCI)', 'Grundl. d. intellig. Systeme (IDS)', 'Datenbanksysteme (IDS)', 'Einführung in Numerical Computing (NUM)', 'Einführende Statistik (EST)', 'Programmiersprachen und -konzepte (PLC)'],
            '4': ['Mensch-Computer-Interaktion (HCI)', 'Vertiefung 1', 'Vertiefung 2', 'Einführung in die mathematische Modellierung (MM)', 'Software Engineering 1 (SE1)'],
            '5': ['Netzwerktechnologien (NET)', 'Vertiefung 3', 'Vertiefung 4', 'Vertiefung 5', 'Software Engineering 2 (SE2)'],
            '6': ['Informa-tions-sicherheit (IS)', 'Erweiterung', 'Softwarepraktikum mit Bachelorarbeit']
        },
        'Chemie': {
            '1': ['Chemie Course 1', 'Chemie Course 2'],
            '2': ['Chemie Course 3', 'Chemie Course 4'],
            // ... rest of the semesters
        },
        'Mathematik': {
            '1': ['Math Course 1', 'Math Course 2'],
            '2': ['Math Course 3', 'Math Course 4'],
            // ... rest of the semesters
        },
        // ... rest of the faculties
    };

    // Get the semesters for the selected faculty
    const semesters = faculties[faculty];

    return (
        <ScrollView>
            {/* Render each semester and its courses */}
            {Object.keys(semesters).map(semester => (
                <View key={semester} style={styles.semesterContainer}>
                    <Text style={styles.semesterTitle}>Semester {semester}</Text>
                    {semesters[semester].map(course => (
                        <TouchableHighlight
                            key={course}
                            style={styles.courseCard}
                            underlayColor="#e0dcdc" // Set the background color when the card is pressed
                            onPress={() => navigation.navigate('Course', { course })}
                        >
                            <Text style={styles.courseTitle}>{course}</Text>
                        </TouchableHighlight>
                    ))}
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    semesterContainer: {
        flex: 1,
        marginTop: 10,
        marginHorizontal: 10,
        backgroundColor:'#ffffff',
        borderRadius: 16,
        padding: 10,
        marginBottom: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    semesterTitle: {
        fontSize: 25,
        //fontWeight: 'bold',
        paddingBottom: 15,
        paddingLeft: 10,
    },
    courseCard: {
        backgroundColor: '#f9c2ff',
        borderRadius: 16,
        padding: 10,
        marginBottom: 8,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    courseTitle: {
        fontSize: 18,
    },
});

export default CoursesScreen;
