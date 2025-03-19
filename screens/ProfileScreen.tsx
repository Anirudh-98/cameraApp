import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type IconName = keyof typeof Ionicons.glyphMap;

const ProfileScreen = () => {
  const menuItems: Array<{
    icon: IconName;
    label: string;
    action: () => void;
  }> = [
    { icon: 'person', label: 'Account Settings', action: () => {} },
    { icon: 'notifications', label: 'Notifications', action: () => {} },
    { icon: 'shield-checkmark', label: 'Privacy', action: () => {} },
    { icon: 'help-circle', label: 'Help & Support', action: () => {} },
    { icon: 'information-circle', label: 'About', action: () => {} },
  ];

  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-indigo-600 p-6 items-center">
        <View className="w-24 h-24 bg-white rounded-full items-center justify-center mb-3">
          <Ionicons name="person" size={48} color="#4F46E5" />
        </View>
        <Text className="text-white text-xl font-semibold">Anirudh Jyothula</Text>
        <Text className="text-white/80">anirudhjyothula@gmail.com</Text>
      </View>

      {/* Stats */}
      <View className="flex-row justify-between p-4 bg-white mt-4 mx-4 rounded-xl shadow-sm">
        <View className="items-center">
          <Text className="text-2xl font-bold text-indigo-600">12</Text>
          <Text className="text-gray-600">Total Scans</Text>
        </View>
        <View className="items-center">
          <Text className="text-2xl font-bold text-indigo-600">3</Text>
          <Text className="text-gray-600">Detections</Text>
        </View>
        <View className="items-center">
          <Text className="text-2xl font-bold text-indigo-600">4.8</Text>
          <Text className="text-gray-600">Rating</Text>
        </View>
      </View>

      {/* Menu */}
      <View className="mt-4 bg-white mx-4 rounded-xl shadow-sm">
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={item.action}
            className={`flex-row items-center p-4 ${
              index < menuItems.length - 1 ? 'border-b border-gray-100' : ''
            }`}
          >
            <Ionicons name={item.icon} size={24} color="#4F46E5" />
            <Text className="flex-1 ml-3 text-gray-800">{item.label}</Text>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        ))}
      </View>

      {/* Sign Out Button */}
      <TouchableOpacity className="mt-6 mx-4 mb-8">
        <View className="bg-red-500 p-4 rounded-xl items-center">
          <Text className="text-white font-medium">Sign Out</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ProfileScreen; 