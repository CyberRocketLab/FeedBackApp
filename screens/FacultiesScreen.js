import React from 'react';
import { Button, View, FlatList, Text, StyleSheet } from 'react-native';

function FacultiesScreen({ navigation }) {
    // Add more faculties as needed
    const faculties = ['Informatik', 'Chemie', 'Mathematik'];

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text style={styles.title} onPress={() => navigation.navigate('Courses', { faculty: item })}>{item}</Text>
        </View>
    );

    return (
        <FlatList
            data={faculties}
            renderItem={renderItem}
            keyExtractor={item => item}
        />
    );
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
});

export default FacultiesScreen;
