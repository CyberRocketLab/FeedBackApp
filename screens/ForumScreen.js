// ForumScreen.js
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, ScrollView, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function ForumScreen() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    // Load messages from AsyncStorage when component mounts
    useEffect(() => {
        AsyncStorage.getItem('messages').then(storedMessages => {
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

    return (
        <View>
            <ScrollView>
                {messages.map((message, index) => (
                    <Text key={index}>{message}</Text>
                ))}
            </ScrollView>
            <TextInput
                value={input}
                onChangeText={setInput}
                placeholder="Type your message"
            />
            <Button title="Send" onPress={sendMessage} />
        </View>
    );
}

export default ForumScreen;
