import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, ScrollView, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
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

    const sendMessage = () => {
        if (input.trim() !== '') {
            const newMessages = [...messages, input];
            setMessages(newMessages);
            // Save messages to AsyncStorage when a new message is sent
            AsyncStorage.setItem('messages', JSON.stringify(newMessages));
            setInput('');
        }
    };

    const deleteMessage = (index) => {
        const updatedMessages = [...messages];
        updatedMessages.splice(index, 1);
        setMessages(updatedMessages);
        AsyncStorage.setItem('messages', JSON.stringify(updatedMessages));
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
        >
            <ScrollView style={styles.messagesContainer}>
                {messages.map((message, index) => (
                    <View key={index} style={styles.messageContainer}>
                        <Text style={styles.messageText}>{message}</Text>
                        <TouchableOpacity onPress={() => deleteMessage(index)}>
                            <MaterialIcons name="delete" size={24} color="red" />
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
            <View style={styles.inputContainer}>
                <TextInput
                    value={input}
                    onChangeText={setInput}
                    placeholder="Type your message"
                    style={styles.input}
                />
                <Button title="Send" onPress={sendMessage} />
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    messagesContainer: {
        flex: 1,
        marginBottom: 8,
    },
    messageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        borderRadius: 16,
        padding: 10,
        marginBottom: 8,
    },
    messageText: {
        flex: 1,
        fontSize: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginBottom: 30,
    },
    input: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 16,
        padding: 10,
        marginRight: 8,
    },
});

export default ForumScreen;
