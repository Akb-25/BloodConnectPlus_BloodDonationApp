import React, { useState } from "react";
import {
  TextInput,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Platform
} from "react-native";
import Header from "../components/Header";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../config/firebase.js";


export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const navigation = useNavigation();

  const register = async (email, password) => {
    try {
      console.log("Registering user...");
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("User registered is: " + user);
      Alert.alert("Success", "Registered successfully!");
      navigation.navigate("Home");
    } catch (error) {
      Alert.alert("Registration Failed", error.message);
    }
  };

  const handleRegister = () => {
    if (!email || !password) {
      Alert.alert("Error", "All fields are required");
      return;
    }
    register(email, password);
  };

  const onHandleRegister = () => {
    if (email !== '' && password !== '') {
  createUserWithEmailAndPassword(auth, email, password)
        .then(() => console.log('Signup success'))
        .catch((err) => Alert.alert("Login error", err.message));
    }
  };

  return (
    <View style={styles.container}>
        <Header title="Register" />
        <View style={styles.form}>
        <Text style={styles.label}>Enter email</Text>
        <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        textContentType="emailAdress"
        />
    
        <Text style={styles.label}>Enter password</Text>
        <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
        textContentType="password"
        />
     
        <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
        <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>


        <TouchableOpacity style={styles.button} onPress={onHandleRegister}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        

        <View style={styles.dividerContainer}>
          <View style={styles.line} />
          <Text style={styles.or}>OR</Text>
          <View style={styles.line} />
        </View>

        <TouchableOpacity style={styles.googleButton} onPress={() => navigation.navigate("RegisterGoogle")}>
          <Text style={styles.googleButtonText}>Continue with Google</Text>
        </TouchableOpacity>
        

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.loginLink}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  form: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  label: {
    fontSize: 16,
    color: "#444",
    marginBottom: 4,
    marginTop: 10,
  },
  
  input: {
    height: 40,
    borderBottomWidth: 1,
    borderColor: "#999",
    marginBottom: 20,
    fontSize: 16,
  },
  forgotText: {
    fontSize: 13,
    color: "red",
    textAlign: "right",
    marginBottom: 20.
  },
  button: {
    backgroundColor: "red",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "red",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },
  or: {
    marginHorizontal: 10,
    color: "#666",
    fontSize: 14,
  },
  googleButton: {
    backgroundColor: "#fff",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#111827",
  },
  googleButtonText: {
    color: "#111827",
    fontSize: 17,
    fontWeight: "600",
  },
  forgotText: {
    fontSize: 13,
    color: "red",
    textAlign: "right",
    marginBottom: 20,
  },
});