// PersonalSettingsScreen.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function PersonalSettingsScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Name: Max Müller</Text>
            <Text style={styles.text}>Email: maxmueller@gmail.com</Text>
            <Text style={styles.text}>Address: Muster Strasse 88</Text>
        </View>
        );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
    },
    text: {
        fontSize: 20,
    },
});

export default PersonalSettingsScreen;
