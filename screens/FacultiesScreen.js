import React from 'react';
import {Button, View, FlatList, Text, StyleSheet, TouchableHighlight} from 'react-native';

function FacultiesScreen({navigation}) {
    // Add more faculties as needed
    const faculties = ['Informatik', 'Chemie', 'Mathematik'];

    const renderItem = ({item}) => (
        <TouchableHighlight
            style={styles.item}
            underlayColor="#e0dcdc" // Set the background color when the card is pressed
            onPress={() => navigation.navigate('Courses', {faculty: item})}
        >
            <Text style={styles.title}>{item}</Text>
        </TouchableHighlight>
    );

    return (
        <FlatList
            data={faculties}
            renderItem={renderItem}
            keyExtractor={item => item}
            style={styles.list} // Add this line to apply the list style
        />
    );
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
        width: '100%',
        marginTop: 8,
        paddingHorizontal: 16, // Add horizontal padding to match the CoursesScreen style
    },
    item: {
        backgroundColor: '#f9c2ff',
        paddingVertical: 15, // Adjust the vertical padding to match the CoursesScreen style
        paddingHorizontal: 20, // Adjust the horizontal padding to match the CoursesScreen style
        marginVertical: 8,
        borderRadius: 16, // Add this line to apply the card-like appearance
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    title: {
        fontSize: 25,
        // fontWeight: "bold", // Add this line to apply the bold font weight
    },
});

export default FacultiesScreen;
