// PersonalSettingsScreen.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function PersonalSettingsScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>This is the Personal Settings Screen</Text>
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
