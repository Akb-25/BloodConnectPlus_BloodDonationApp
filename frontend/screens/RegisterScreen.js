import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, View, TextInput, Button } from 'react-native';
import { supabase } from '../config/supabase';

export default function Register({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const signUpWithEmail = async () => {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) Alert.alert('Signup Error', error.message);
    if (!data.session) Alert.alert('Check your inbox to verify your email.');
    setLoading(false);
  };
  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users")
    .then(response => console.log(response.data))
    .catch(error => console.error(error));
  });
  return (
    <View style={styles.container}>
      <TextInput
        label="Email"
        leftIcon={{ type: 'font-awesome', name: 'envelope' }}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        placeholder="email@address.com"
      />
      <TextInput
        label="Password"
        leftIcon={{ type: 'font-awesome', name: 'lock' }}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
        placeholder="Password"
      />
      <Button title="Register" loading={loading} onPress={signUpWithEmail} />
      <Button title="Go to Login" type="clear" onPress={() => navigation.navigate('Login')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 40,
  },
});