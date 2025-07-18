import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { User, Mail, Calendar, LogOut } from 'lucide-react-native';

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Sign Out', 
          style: 'destructive',
          onPress: logout
        }
      ]
    );
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-6">
        <Text className="text-3xl font-bold text-gray-800 mb-8">Profile</Text>

        <View className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <View className="items-center mb-6">
            <View className="w-20 h-20 bg-blue-100 rounded-full items-center justify-center mb-4">
              <User size={40} color="#3B82F6" />
            </View>
            <Text className="text-xl font-semibold text-gray-800">
              {user?.displayName || 'User'}
            </Text>
            <Text className="text-gray-600">{user?.email}</Text>
          </View>

          <View className="space-y-4">
            <View className="flex-row items-center p-4 bg-gray-50 rounded-lg">
              <Mail size={20} color="#6B7280" />
              <View className="ml-3 flex-1">
                <Text className="text-gray-500 text-sm">Email Address</Text>
                <Text className="text-gray-800 font-medium">{user?.email}</Text>
              </View>
            </View>

            <View className="flex-row items-center p-4 bg-gray-50 rounded-lg">
              <Calendar size={20} color="#6B7280" />
              <View className="ml-3 flex-1">
                <Text className="text-gray-500 text-sm">Member Since</Text>
                <Text className="text-gray-800 font-medium">
                  {user?.metadata.creationTime 
                    ? new Date(user.metadata.creationTime).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })
                    : 'Unknown'
                  }
                </Text>
              </View>
            </View>
          </View>
        </View>

        <TouchableOpacity
          className="bg-red-600 rounded-xl p-4 flex-row items-center justify-center"
          onPress={handleLogout}
        >
          <LogOut size={20} color="white" />
          <Text className="text-white font-semibold ml-2">Sign Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}