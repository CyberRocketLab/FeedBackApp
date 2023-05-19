import React from 'react';
import { View, FlatList, Text, StyleSheet, TouchableHighlight, Image } from 'react-native';

function FacultiesScreen({ navigation }) {

  const faculties = ['Informatik', 'Chemie', 'Mathematik'];

  const renderItem = ({ item }) => (
    <TouchableHighlight
      style={styles.item}
      underlayColor="#E0DCDC"
      onPress={() => navigation.navigate('Lehrveranstaltungen', { faculty: item })}
    >
      <Text style={styles.title}>{item}</Text>
    </TouchableHighlight>
  );

  return (
    <View style={styles.container}>
      <Image
        style={styles.headerImage}
        source={require('../image/pngUni.png')}
      />
      <FlatList
        data={faculties}
        renderItem={renderItem}
        keyExtractor={item => item}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    backgroundColor: '#F5F5F5',
    padding: 16,
  },
  headerImage: {
    width: '100%', // adjust as needed
    height: 100, // adjust as needed
    resizeMode: 'contain', // or 'contain'
    marginTop: 30,
    marginBottom: 50,
  },
  list: {
    flex: 1,
    width: '100%',
    marginTop: 8,
  },
  item: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 5,
    borderRadius: 5,
    borderColor: '#E0E0E0',
    borderWidth: 1,
//    shadowColor: '#000',
//    shadowOffset: {
//      width: 0,
//      height: 1,
//    },
//    shadowOpacity: 0.2,
//    shadowRadius: 2,
//    elevation: 3,
  },
  title: {
    fontSize: 20,
  },
});

export default FacultiesScreen;
