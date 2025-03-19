import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { HomeScreenNavigationProp } from '../types';

const ScanScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="p-4 bg-indigo-600">
        <View className="flex-row justify-between items-center">
          <Text className="text-2xl font-bold text-white">Scan</Text>
          <TouchableOpacity 
            onPress={() => navigation.navigate('Profile')}
            className="bg-white/20 p-2 rounded-full"
          >
            <Ionicons name="person-circle" size={32} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Scan Options */}
      <View className="p-4">
        <Text className="text-xl font-semibold text-gray-800 mb-4">Scan Options</Text>
        <View className="space-y-4">
          <TouchableOpacity 
            className="bg-white p-4 rounded-xl shadow-sm"
            onPress={() => navigation.navigate('InfraredDetection')}
          >
            <View className="flex-row items-center">
              <View className="w-12 h-12 bg-indigo-100 rounded-full items-center justify-center">
                <Ionicons name="scan-circle" size={24} color="#4F46E5" />
              </View>
              <View className="ml-4 flex-1">
                <Text className="text-lg font-medium text-gray-800">Infrared Scan</Text>
                <Text className="text-gray-500">Detect hidden cameras using infrared</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#9CA3AF" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            className="bg-white p-4 rounded-xl shadow-sm"
            onPress={() => navigation.navigate('MagneticDetection')}
          >
            <View className="flex-row items-center">
              <View className="w-12 h-12 bg-indigo-100 rounded-full items-center justify-center">
                <Ionicons name="magnet" size={24} color="#4F46E5" />
              </View>
              <View className="ml-4 flex-1">
                <Text className="text-lg font-medium text-gray-800">Magnetic Scan</Text>
                <Text className="text-gray-500">Detect magnetic fields from hidden devices</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#9CA3AF" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ScanScreen; 