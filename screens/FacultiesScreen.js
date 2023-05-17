import React, { useState, useRef, useLayoutEffect } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableHighlight, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

function FacultiesScreen({ navigation }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchVisible, setSearchVisible] = useState(false);

  const inputRef = useRef(null);

  const faculties = ['Informatik', 'Chemie', 'Mathematik'];

  const renderItem = ({ item }) => (
    <TouchableHighlight
      style={styles.item}
      underlayColor="#E0DCDC"
      onPress={() => navigation.navigate('Courses', { faculty: item })}
    >
      <Text style={styles.title}>{item}</Text>
    </TouchableHighlight>
  );

  const filteredFaculties = faculties.filter(faculty =>
    faculty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Icon
          name={searchVisible ? 'close-outline' : 'search-outline'}
          size={35}
          color="black"
          style={{ marginRight: 10 }}
          onPress={() => {
            setSearchVisible(!searchVisible);
            if (searchVisible) {
              setSearchTerm('');
            } else {
              setTimeout(() => inputRef.current.focus(), 100);
            }
          }}
        />
      ),
    });
  }, [navigation, searchVisible]);

  return (
    <View style={styles.container}>
      {searchVisible && (
        <TextInput
          style={styles.input}
          onChangeText={text => setSearchTerm(text)}
          value={searchTerm}
          placeholder="Search Faculties"
          ref={inputRef}
        />
      )}
      <FlatList
        data={filteredFaculties}
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
  },
  input: {
    height: 40,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    paddingLeft: 10,
    margin: 16,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
  },
  list: {
    flex: 1,
    width: '100%',
    marginTop: 8,
    paddingHorizontal: 16,
  },
  item: {
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
    title: {
      fontSize: 20,
    },
});

export default FacultiesScreen;
