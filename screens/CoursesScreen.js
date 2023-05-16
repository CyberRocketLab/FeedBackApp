import React from 'react';
import { Button, View, Text, StyleSheet, ScrollView } from 'react-native';

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
                <View key={semester}>
                    <Text style={styles.semesterTitle}>Semester {semester}</Text>
                    {semesters[semester].map(course => (
                        <Button
                            key={course}
                            title={course}
                            onPress={() => navigation.navigate('Course', { course })}
                        />
                    ))}
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    semesterTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
    },
});

export default CoursesScreen;

