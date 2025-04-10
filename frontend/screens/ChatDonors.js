import React from "react";
import { ScrollView, Text, StyleSheet, Image, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";

const ChatDonors = () => {
  const navigation = useNavigation();

  const chats = [
    { id: 1, name: "John Doe", message: "Hey, I am available to donate blood." },
    { id: 2, name: "Jane Smith", message: "I donated last month, but I can help with logistics." },
    { id: 3, name: "Emily Johnson", message: "Let me know if you need more donors." },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Contact Donors" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {chats.map((chat) => (
          <TouchableOpacity
            key={chat.id}
            style={styles.chatItem}
            activeOpacity={0.8}
            // onPress={() => navigation.navigate("ChatDetail", { chatId: chat.id })}
          >
            <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.avatar} />
            <View style={styles.textContainer}>
              <Text style={styles.name}>{chat.name}</Text>
              <Text style={styles.message}>{chat.message}</Text>
            </View>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("ChatScreen")}>
          <Text style={styles.buttonText}>Start New Chat</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    padding: 16,
    marginTop: 62
  },
  chatItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    marginRight: 16,
    borderWidth: 2,
    borderColor: "#e63946",
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 17,
    fontWeight: "600",
    color: "#1d3557",
    marginBottom: 4,
  },
  message: {
    fontSize: 14,
    color: "#6c757d",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#e63946",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#e63946",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default ChatDonors;