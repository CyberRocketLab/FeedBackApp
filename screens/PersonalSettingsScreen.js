import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, Image, TouchableOpacity, ScrollView } from 'react-native';

function PersonalSettingsScreen() {
    const [name, setName] = useState('Max Müller');
    const [email, setEmail] = useState('maxmueller@gmail.com');
    const [address, setAddress] = useState('Muster Strasse 88');
    const [phone, setPhone] = useState('+49 123 456 7890');
    const [password, setPassword] = useState('********');

    const handleSave = () => {
        // This is where you would usually update the user's information in your database
        console.log('Saved:', name, email, address, phone, password);

        // Notify the user that their settings have been saved
        Alert.alert('Erfolg', 'Deine Änderungen wurden gespeichert.');
    };

    return (
        <View style={styles.container}>
            <Image
                style={styles.userImage}
                source={require('../image/userImage.png')}
            />
            <ScrollView style={styles.scrollView}>
                <Text style={styles.label}>Name:</Text>
                <TextInput style={styles.input} value={name} onChangeText={setName} />

                <Text style={styles.label}>Email:</Text>
                <TextInput style={styles.input} value={email} onChangeText={setEmail} />
            <Text style={styles.label}>Adresse:</Text>
            <TextInput style={styles.input} value={address} onChangeText={setAddress} />

            <Text style={styles.label}>Telefonnummer:</Text>
            <TextInput style={styles.input} value={phone} onChangeText={setPhone} />

            <Text style={styles.label}>Passwort:</Text>
            <TextInput style={styles.input} value={password} onChangeText={setPassword} secureTextEntry />

            </ScrollView>
            <TouchableOpacity style={styles.button} onPress={handleSave}>
                <Text style={styles.buttonText}>Speichern</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'stretch',
        backgroundColor: '#F5F5F5',
        padding: 20,
        paddingTop: 50,
    },
    userImage: {
        alignSelf: 'center',
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
    },
    scrollView: {
        flex: 1,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingLeft: 10,
    },
    button: {
        alignSelf: 'center',
        width: '100%',
        height: 52,
        backgroundColor: '#3182CE',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
});

export default PersonalSettingsScreen;
