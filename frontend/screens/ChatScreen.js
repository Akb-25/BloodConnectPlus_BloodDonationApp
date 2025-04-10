import React, { useState } from "react";
import {
  View, ScrollView, Text, TextInput, StyleSheet,
  TouchableOpacity, KeyboardAvoidingView,
  Platform, SafeAreaView
} from "react-native";

const ChatScreen = () => {
  const [messages, setMessages] = useState([
    { id: "1", text: "Hi there!", sender: "donor" },
    { id: "2", text: "How can I help you today?", sender: "donor" },
    { id: "3", text: "I'm available to donate blood.", sender: "donor" },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const donorName = "Jacob Fatu";

  const sendMessage = () => {
    if (inputMessage.trim() !== "") {
      setMessages([...messages, { id: Date.now().toString(), text: inputMessage, sender: "user" }]);
      setInputMessage("");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={80}
      >
        <View style={styles.header}>
          <Text style={styles.headerText}>{donorName}</Text>
        </View>

        <ScrollView contentContainerStyle={styles.messageList}>
          {messages.map((item) => (
            <View
              key={item.id}
              style={[
                styles.messageContainer,
                item.sender === "user" ? styles.sentMessage : styles.receivedMessage,
              ]}
            >
              <Text style={styles.messageText}>{item.text}</Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type your message..."
            placeholderTextColor="#888"
            value={inputMessage}
            onChangeText={setInputMessage}
            onSubmitEditing={sendMessage}
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff0f0",
  },
  container: {
    flex: 1,
  },
  header: {
    paddingTop: Platform.OS === "android" ? 50 : 60,
    paddingBottom: 20,
    backgroundColor: "#c62828",
    alignItems: "center",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    elevation: 4,
  },
  headerText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  messageList: {
    padding: 16,
    flexGrow: 1,
    backgroundColor: "#fff5f5",
  },
  messageContainer: {
    marginBottom: 10,
    padding: 14,
    borderRadius: 20,
    maxWidth: "75%",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  messageText: {
    color: "#222",
    fontSize: 15,
  },
  sentMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#ffcdd2",
  },
  receivedMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#ffffff",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 12,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 44,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    fontSize: 15,
  },
  sendButton: {
    backgroundColor: "#d32f2f",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 18,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
});

export default ChatScreen;