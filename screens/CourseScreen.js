import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { CourseContext } from './CourseContext';


function CourseScreen({ route, navigation }) {
    const { course, description } = route.params;
    const { scores } = useContext(CourseContext);
    const averageScore = (scores[course]?.averageScore || 0).toFixed(2);

    return (
        <View style={styles.container}>
            <Text style={styles.courseTitle}>{course}</Text>
            <Text style={styles.description}>{description}</Text>
            <Text style={styles.averageScore}>Average Score: {averageScore}</Text>
            <View style={styles.buttonContainer}>
                <TouchableHighlight
                    style={styles.button}
                    underlayColor="#e0dcdc" // Set the background color when the button is pressed
                    onPress={() => navigation.navigate('Feedback', {course})}
                >
                    <Text style={styles.buttonText}>Feedback</Text>
                </TouchableHighlight>

        <TouchableHighlight
          style={styles.button}
          underlayColor="#E0DCDC"
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
    backgroundColor: '#FFFFFF',
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
    padding: 10,
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 5,
    borderRadius: 5,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  buttonText: {
    fontSize: 18,
  },
});

export default CourseScreen;
