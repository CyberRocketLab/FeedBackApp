import React, { useState, useEffect } from 'react';
import { View, TextInput, ScrollView, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';

function ForumScreen() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  // Load messages from AsyncStorage when component mounts
  useEffect(() => {
    AsyncStorage.getItem('messages').then((storedMessages) => {
      if (storedMessages !== null) {
        setMessages(JSON.parse(storedMessages));
      }
    });
  }, []);

  const sendMessage = async () => {
    if (input.trim() !== '') {
      const newMessages = [...messages, input];
      setMessages(newMessages);
      // Save messages to AsyncStorage when a new message is sent
      try {
        await AsyncStorage.setItem('messages', JSON.stringify(newMessages));
      } catch (error) {
        console.error("Error saving data", error);
      }
      setInput('');
    }
  };

  const deleteMessage = async (index) => {
    const updatedMessages = [...messages];
    updatedMessages.splice(index, 1);
    setMessages(updatedMessages);
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(updatedMessages));
    } catch (error) {
      console.error("Error saving data", error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.messagesContainer} contentContainerStyle={styles.messagesContentContainer}>
          {messages.map((message, index) => (
            <TouchableOpacity
              key={index}
              style={styles.messageContainer}
              onLongPress={() => deleteMessage(index)}
            >
              <View style={styles.messageContent}>
                <Text style={styles.messageText}>{message}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View style={styles.inputContainer}>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Type your message"
            style={styles.input}
          />
          <TouchableOpacity onPress={sendMessage}>
            <MaterialIcons name="send" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContentContainer: {
    padding: 20,
  },
  messageContainer: {
    marginBottom: 16,
  },
  messageContent: {
    backgroundColor: '#F9F9F9',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginRight: 16,
  },
});

export default ForumScreen;
