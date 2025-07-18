import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';

export default function HomeScreen() {
  const { user } = useAuth();

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-6">
        <Text className="text-3xl font-bold text-gray-800 mb-2">
          Welcome back{user?.displayName ? `, ${user.displayName}` : ''}!
        </Text>
        <Text className="text-gray-600 mb-8">
          You're successfully signed in to Tap2Meet
        </Text>

        <View className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <Text className="text-xl font-semibold text-gray-800 mb-4">
            Account Information
          </Text>
          <View className="space-y-3">
            <View>
              <Text className="text-gray-500 text-sm">Email</Text>
              <Text className="text-gray-800 font-medium">{user?.email}</Text>
            </View>
            {user?.displayName && (
              <View>
                <Text className="text-gray-500 text-sm">Name</Text>
                <Text className="text-gray-800 font-medium">{user.displayName}</Text>
              </View>
            )}
            <View>
              <Text className="text-gray-500 text-sm">Account Created</Text>
              <Text className="text-gray-800 font-medium">
                {user?.metadata.creationTime 
                  ? new Date(user.metadata.creationTime).toLocaleDateString()
                  : 'Unknown'
                }
              </Text>
            </View>
          </View>
        </View>

        <View className="bg-blue-50 rounded-xl p-6">
          <Text className="text-lg font-semibold text-blue-800 mb-2">
            🎉 Authentication Setup Complete!
          </Text>
          <Text className="text-blue-700">
            Your Firebase authentication is working perfectly. You can now build amazing features on top of this secure foundation.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}