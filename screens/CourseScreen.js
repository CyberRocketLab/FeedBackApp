import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, ScrollView } from 'react-native';
import { CourseContext } from './CourseContext';

function CourseScreen({ route, navigation }) {
  // Receiving (course, description) data from route parametr
  const { course, description } = route.params;
  // Receving (scores) from CourseContext
  const { scores } = useContext(CourseContext);
  //Calculating average score
  const averageScore = (scores[course]?.averageScore || 0).toFixed(2);

  return (
      <View style={styles.container}>
        <Text style={styles.courseTitle}>{course}</Text>
        <View style={styles.descriptionContainer}>
          <ScrollView>
            <Text style={styles.description}>{description}</Text>
          </ScrollView>
        </View>
        <Text style={styles.averageScore}>Average Difficulty: {averageScore}</Text>
        <View style={styles.buttonContainer}>
          <TouchableHighlight
              style={styles.button}
              underlayColor="#e0dcdc"
              onPress={() => navigation.navigate('Feedback', { course })}
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
    backgroundColor: '#F5F5F5',
  },
  courseTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    paddingBottom: 15,
    paddingLeft: 10,
    color: '#3B3B3B',
  },
  descriptionContainer: {
    height: 350,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 50,
    borderColor: '#E0E0E0',
    borderWidth: 1,
  },
  description: {
    fontSize: 18,
    lineHeight: 24,
  },
  averageScore: {
    fontSize: 20,
    marginBottom: 10,
    paddingLeft: 10,
    fontWeight: '600',
    color: '#FF6347',
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
    elevation: 2,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3B3B3B',
  },
});

export default CourseScreen;
