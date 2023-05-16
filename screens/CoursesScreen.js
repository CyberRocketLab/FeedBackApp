import React from 'react';
import { Button, View } from 'react-native';

function CoursesScreen({ route, navigation }) {
    const { faculty } = route.params;
    // Fetch the courses for the faculty from your backend
    // Hardcoded for simplicity
    const courses = ['course1', 'course2', 'course3'];

    return (
        <View>
            {/* Render each course */}
            {courses.map(course => (
                <Button key={course} title={course} onPress={() => navigation.navigate('Course', { course })} />
            ))}
        </View>
    );
}

export default CoursesScreen;
