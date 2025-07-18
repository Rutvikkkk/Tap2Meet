import React, { useState } from 'react';
import { View, KeyboardAvoidingView, Platform } from 'react-native';
import AuthForm from '../components/AuthForm';

export default function AuthScreen() {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');

  const toggleMode = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin');
  };

  return (
    <KeyboardAvoidingView 
      className="flex-1 bg-gradient-to-br from-blue-50 to-indigo-100"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View className="flex-1 justify-center px-6">
        <AuthForm mode={mode} onToggleMode={toggleMode} />
      </View>
    </KeyboardAvoidingView>
  );
}