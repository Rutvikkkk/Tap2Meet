import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { ChevronRight, Bell, Shield, HelpCircle, Info } from 'lucide-react-native';

export default function SettingsScreen() {
  const settingsItems = [
    {
      icon: Bell,
      title: 'Notifications',
      subtitle: 'Manage your notification preferences',
      onPress: () => console.log('Notifications pressed')
    },
    {
      icon: Shield,
      title: 'Privacy & Security',
      subtitle: 'Control your privacy settings',
      onPress: () => console.log('Privacy pressed')
    },
    {
      icon: HelpCircle,
      title: 'Help & Support',
      subtitle: 'Get help and contact support',
      onPress: () => console.log('Help pressed')
    },
    {
      icon: Info,
      title: 'About',
      subtitle: 'App version and information',
      onPress: () => console.log('About pressed')
    }
  ];

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-6">
        <Text className="text-3xl font-bold text-gray-800 mb-8">Settings</Text>

        <View className="bg-white rounded-xl shadow-sm overflow-hidden">
          {settingsItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              className={`flex-row items-center p-4 ${
                index !== settingsItems.length - 1 ? 'border-b border-gray-100' : ''
              }`}
              onPress={item.onPress}
            >
              <View className="w-10 h-10 bg-gray-100 rounded-lg items-center justify-center mr-4">
                <item.icon size={20} color="#6B7280" />
              </View>
              <View className="flex-1">
                <Text className="text-gray-800 font-medium">{item.title}</Text>
                <Text className="text-gray-500 text-sm">{item.subtitle}</Text>
              </View>
              <ChevronRight size={20} color="#D1D5DB" />
            </TouchableOpacity>
          ))}
        </View>

        <View className="mt-8 bg-blue-50 rounded-xl p-6">
          <Text className="text-lg font-semibold text-blue-800 mb-2">
            🔧 Settings Ready
          </Text>
          <Text className="text-blue-700">
            This is where you can add app-specific settings and preferences. The authentication system is fully integrated and ready for your custom features.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}