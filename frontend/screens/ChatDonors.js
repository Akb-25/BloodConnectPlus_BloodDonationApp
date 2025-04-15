import React, { useEffect, useState } from "react";
import { ScrollView, Text, StyleSheet, Image, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import axios from "axios";
// import { getCurrentUserId } from "../utils/auth"; // implement this to return logged-in user ID

const ChatDonors = () => {
  const navigation = useNavigation();
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchChats = async () => {
    try {
      const uid = await getCurrentUserId();
      const res = await axios.get(`http://192.168.1.6:5000/api/chat/${uid}`);
      setChats(res.data);
    } catch (err) {
      console.error("Error fetching chats:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Contact Donors" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {loading ? (
          <ActivityIndicator size="large" color="#e63946" />
        ) : chats.length === 0 ? (
          <Text style={styles.noChats}>No chats available</Text>
        ) : (
          chats.map((chat) => {
            const otherUser = chat.membersDetails.find((u) => u.id !== getCurrentUserId());
            return (
              <TouchableOpacity
                key={chat.chatId}
                style={styles.chatItem}
                activeOpacity={0.8}
                onPress={() =>
                  navigation.navigate("ChatScreen", {
                    chatId: chat.chatId,
                    receiverId: otherUser.id,
                    receiverName: otherUser.name,
                    receiverPhoto: otherUser.photoURL,
                  })
                }
              >
                <Image source={{ uri: otherUser.photoURL || "https://via.placeholder.com/150" }} style={styles.avatar} />
                <View style={styles.textContainer}>
                  <Text style={styles.name}>{otherUser.name}</Text>
                  <Text style={styles.message} numberOfLines={1}>
                    {chat.lastMessage}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })
        )}
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("ChatScreen")}>
          <Text style={styles.buttonText}>Start New Chat</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scrollContent: { padding: 16, marginTop: 62 },
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
  textContainer: { flex: 1 },
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
  noChats: {
    textAlign: "center",
    color: "#6c757d",
    fontSize: 16,
    marginTop: 20,
  },
});

export default ChatDonors;