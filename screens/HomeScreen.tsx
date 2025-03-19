import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { HomeScreenNavigationProp } from '../types';

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Header Section */}
      <View className="p-4 bg-indigo-600">
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-2xl font-bold text-white">Welcome Anirudh!</Text>
            <Text className="text-white/80 mt-1">Let's keep your privacy protected</Text>
          </View>
          <TouchableOpacity 
            onPress={() => navigation.navigate('Profile')}
            className="bg-white/20 p-2 rounded-full"
          >
            <Ionicons name="person-circle" size={32} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Quick Actions */}
      <View className="p-4">
        <Text className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</Text>
        <View className="flex-row justify-between">
          <TouchableOpacity 
            onPress={() => navigation.navigate('Scan')}
            className="bg-white p-4 rounded-xl shadow-sm w-[48%] items-center"
          >
            <Ionicons name="scan-circle" size={32} color="#4F46E5" />
            <Text className="text-indigo-600 mt-2 font-medium">New Scan</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-white p-4 rounded-xl shadow-sm w-[48%] items-center">
            <Ionicons name="time" size={32} color="#4F46E5" />
            <Text className="text-indigo-600 mt-2 font-medium">History</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Recent Scans */}
      <View className="p-4">
        <Text className="text-xl font-semibold text-gray-800 mb-4">Recent Scans</Text>
        <View className="space-y-4">
          <TouchableOpacity className="bg-white p-4 rounded-xl shadow-sm">
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="text-lg font-medium text-gray-800">Living Room Scan</Text>
                <Text className="text-gray-500">2 hours ago</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#9CA3AF" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity className="bg-white p-4 rounded-xl shadow-sm">
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="text-lg font-medium text-gray-800">Bedroom Scan</Text>
                <Text className="text-gray-500">5 hours ago</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#9CA3AF" />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Tips Section */}
      <View className="p-4 mb-4">
        <Text className="text-xl font-semibold text-gray-800 mb-4">Privacy Tips</Text>
        <View className="bg-white p-4 rounded-xl shadow-sm">
          <Text className="text-gray-700 mb-2">• Check for hidden cameras in hotel rooms</Text>
          <Text className="text-gray-700 mb-2">• Look for unusual objects in your surroundings</Text>
          <Text className="text-gray-700">• Use infrared detection for better results</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
