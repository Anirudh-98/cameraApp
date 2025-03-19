import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// Define the type for your stack navigator's parameters
type RootStackParamList = {
  Welcome: undefined;
  Home: undefined;
  Scan: undefined;
  Login: undefined;
};

// Define the props for LoginScreen
type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Login pressed', email, password);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.container}>

        <Text style={styles.header}>Welcome Back!</Text>

        <View style={styles.inputContainer}>
          <View style={styles.inputField}>
            <Icon name="mail-outline" size={24} color="#999" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
          </View>
          <View style={styles.inputField}>
            <Icon name="lock-closed-outline" size={24} color="#999" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.forgotPasswordButton} onPress={() => { /* Handle forgot password action */ }}>
          <Text style={styles.forgotPasswordButtonText}>Forgot Password?</Text>
        </TouchableOpacity>

        <Text style={styles.signupText}>
          Don't have an account?{' '}
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Text style={styles.signupLinkText}>Sign up</Text>
          </TouchableOpacity>
        </Text>

        

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: '#FFFFFF',
    },
    container: {
      flex: 1,
      padding: 20,
      justifyContent: 'center', // Center content vertically
      alignItems: 'center', // Center content horizontally
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 40,
      textAlign: 'center',
    },
    inputContainer: {
      width: '100%',
      marginBottom: 20,
    },
    inputField: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#CCC',
      borderRadius: 8,
      paddingHorizontal: 10,
      marginBottom: 10,
    },
    inputIcon: {
      marginRight: 10,
    },
    input: {
      flex: 1,
      height: 40,
    },
    loginButton: {
      backgroundColor: '#9370DB',
      paddingVertical: 15,
      paddingHorizontal: 120,
      borderRadius: 8,
      alignItems: 'center',
      marginBottom: 20,
    },
    loginButtonText: {
      fontSize: 18,
      color: '#FFFFFF',
      fontWeight: 'bold',
    },
    forgotPasswordButton: {
      marginBottom: 20,
    },
    forgotPasswordButtonText: {
      fontSize: 16,
      color: '#333',
    },
    signupText: {
      fontSize: 16,
      color: '#333',
      marginBottom: 40,
    },
    signupLinkText: {
      color: '#9370DB',
      fontWeight: 'bold',
    },
    bottomTabBar: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingVertical: 15,
      borderTopWidth: 1,
      borderTopColor: '#EEE',
      position: 'absolute',
      bottom: 0,
      width: '100%',
    },
  });
  
  export default LoginScreen;