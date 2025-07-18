import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useAuth } from '../contexts/AuthContext';

interface AuthFormProps {
  mode: 'signin' | 'signup';
  onToggleMode: () => void;
}

export default function AuthForm({ mode, onToggleMode }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();

  const handleSubmit = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (mode === 'signup' && !displayName) {
      Alert.alert('Error', 'Please enter your name');
      return;
    }

    setLoading(true);
    try {
      if (mode === 'signin') {
        await signIn(email, password);
      } else {
        await signUp(email, password, displayName);
      }
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="w-full max-w-sm mx-auto p-6">
      <Text className="text-3xl font-bold text-center mb-8 text-gray-800">
        {mode === 'signin' ? 'Welcome Back' : 'Create Account'}
      </Text>

      {mode === 'signup' && (
        <View className="mb-4">
          <Text className="text-gray-700 mb-2 font-medium">Name</Text>
          <TextInput
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white"
            placeholder="Enter your name"
            value={displayName}
            onChangeText={setDisplayName}
            autoCapitalize="words"
          />
        </View>
      )}

      <View className="mb-4">
        <Text className="text-gray-700 mb-2 font-medium">Email</Text>
        <TextInput
          className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white"
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      <View className="mb-6">
        <Text className="text-gray-700 mb-2 font-medium">Password</Text>
        <TextInput
          className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white"
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
        />
      </View>

      <TouchableOpacity
        className={`w-full py-4 rounded-lg mb-4 ${
          loading ? 'bg-gray-400' : 'bg-blue-600'
        }`}
        onPress={handleSubmit}
        disabled={loading}
      >
        <Text className="text-white text-center font-semibold text-lg">
          {loading 
            ? 'Loading...' 
            : mode === 'signin' 
              ? 'Sign In' 
              : 'Create Account'
          }
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onToggleMode} className="py-2">
        <Text className="text-blue-600 text-center">
          {mode === 'signin' 
            ? "Don't have an account? Sign up" 
            : 'Already have an account? Sign in'
          }
        </Text>
      </TouchableOpacity>
    </View>
  );
}