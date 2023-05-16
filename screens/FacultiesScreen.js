import React from 'react';
import { Button, View } from 'react-native';

function FacultiesScreen({ navigation }) {
    return (
        <View>
            {/* Add more faculties as needed */}
            <Button title="Informatik" onPress={() => navigation.navigate('Courses', { faculty: 'Informatik' })} />
            <Button title="Chemie" onPress={() => navigation.navigate('Courses', { faculty: 'Chemie' })} />
            <Button title="Mathematik" onPress={() => navigation.navigate('Courses', { faculty: 'Mathematik' })} />
        </View>
    );
}

export default FacultiesScreen;
