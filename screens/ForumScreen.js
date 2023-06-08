import React, {useState, useEffect, useLayoutEffect} from 'react';
import {
    View,
    TextInput,
    ScrollView,
    Text,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Image,
    Platform,
    SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MaterialIcons} from '@expo/vector-icons';
import Icon from "react-native-vector-icons/Ionicons";

function ForumScreen({route, navigation}) {
    const {course} = route.params;
    const storageKey = `messages_${course}`;
    const [search, setSearch] = useState('');
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    // Load messages from AsyncStorage when component mounts
    useEffect(() => {
        AsyncStorage.getItem(storageKey).then((storedMessages) => {
            if (storedMessages !== null) {
                setMessages(JSON.parse(storedMessages));
            }
        });
    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => console.log('Searching for ' + search)}>
                    <Icon name="ios-search" size={24} color="black" style={{ marginRight: 10 }}/>
                </TouchableOpacity>
            )
        });
    }, [navigation, search]);

    // Function to send a message.
    const sendMessage = async () => {
        if (input.trim() !== '') {
            const newMessage = {
                content: input,
                timestamp: new Date().toLocaleString([], { hour: '2-digit', minute: '2-digit' }), //  timestamp
            };

            const newMessages = [...messages, newMessage];
            setMessages(newMessages);

            // Save messages to AsyncStorage when a new message is sent
            try {
                await AsyncStorage.setItem(storageKey, JSON.stringify(newMessages));
            } catch (error) {
                console.error('Error saving data', error);
            }

            setInput('');
        }
    };

    // Function to delete message
    const deleteMessage = async (index) => {
        const updatedMessages = [...messages];
        updatedMessages.splice(index, 1);
        setMessages(updatedMessages);
        try {
            await AsyncStorage.setItem(storageKey, JSON.stringify(updatedMessages));
        } catch (error) {
            console.error('Error saving data', error);
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
                            <Image style={styles.avatar} source={require('../image/userImage.png')}/>
                            <View style={styles.messageContent}>
                                <Text style={styles.messageText}>{message.content}</Text>
                                <Text style={styles.messageTimestamp}>{message.timestamp}</Text>
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
                        multiline
                        numberOfLines={4}
                    />

                    <TouchableOpacity onPress={sendMessage}>
                        <MaterialIcons name="send" size={24} color="black"/>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    messagesContainer: {
        flex: 1,
    },
    messagesContentContainer: {
        padding: 20,
    },
    messageContainer: {
        flexDirection: 'row',
        marginBottom: 16,
        alignItems: 'center',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#AAA',
        marginRight: 16,
    },
    messageContent: {
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 8,
        borderColor: '#E0E0E0',
        borderWidth: 1,
        flex: 1,
    },
    messageText: {
        fontSize: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 30,
        //    textAlign: "center",
    },
    input: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: '#CCC',
        borderRadius: 8,
        paddingHorizontal: 16,
        marginRight: 16,
        backgroundColor: '#FFFFFF',
        textAlign: 'left',
        textAlignVertical: 'center',
        paddingTop: 10,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EEE',
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    searchInput: {
        flex: 1,
        height: 40,
        marginRight: 8,
        backgroundColor: '#FFF',
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    messageTimestamp: {
        fontSize: 12,
        color: '#AAA',
        marginTop: 4,
    },
});

export default ForumScreen;
