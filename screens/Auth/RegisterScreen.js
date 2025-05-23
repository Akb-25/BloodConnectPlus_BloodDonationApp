import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, View, TextInput, Text, TouchableOpacity, Button } from 'react-native';
import { supabase } from '../../config/supabase';
import axios from 'axios';
import { BASE_URL } from '../../constants';
import Header from "../../components/Header";
// const { setUser, setIsNewUser } = useContext(AuthenticatedUserContext);
import { useContext } from 'react';
import { AuthenticatedUserContext } from "../../context/AuthenticatedUserContext";


export default function Register({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { setUser, setFirstLogin } = useContext(AuthenticatedUserContext);


  const signUpWithEmail = async () => {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) Alert.alert('Signup Error', error.message);
    if (!data.session) Alert.alert('Enter correct email and password.');

    const supabaseAuthId = data.user.id; 
      const response = await axios.post(`${BASE_URL}/user/register-profile`, {
        email: email,
        supabaseAuthId: supabaseAuthId,
      });


    setUser(data.user);
    setFirstLogin(true);
    setLoading(false);
    // navigation.navigate("ProfileNavigator");
  };

  useEffect(() => {
     axios
      .get(BASE_URL)
      .then(response => console.log(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <View style={styles.container}>
        <Header title="Register" />
        <View style={styles.form}>
            <Text style={styles.label}>Enter Email</Text>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={(text) => setEmail(text)}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <Text style={styles.label}>Enter Password</Text>
            <TextInput
                style={styles.input}
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry
                autoCapitalize="none"
            />

            <TouchableOpacity onPress={() => navigation.navigate("ForgetPassword")}>
                <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={signUpWithEmail}>
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.registerText}>Already have an account? Login</Text>
            </TouchableOpacity>
        </View>
    </View>
);
}


const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
},
form: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
},
label: {
    fontSize: 16,
    color: "#111827",
    marginBottom: 6,
    marginTop: 14,
    fontWeight: "500",
},
input: {
    height: 42,
    borderBottomWidth: 1,
    borderColor: "#9CA3AF",
    marginBottom: 12,
    fontSize: 16,
    paddingHorizontal: 4,
    color: "#111827",
},
forgotText: {
    fontSize: 13,
    color: "#111827",
    textAlign: "right",
    marginBottom: 20,
},
button: {
    backgroundColor: "#DC2626",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#DC2626",
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
registerText: {
    color: "#111827",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
},
});