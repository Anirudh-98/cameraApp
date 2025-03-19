import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, Text } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import ScanScreen from '../screens/ScanScreen';
import ProfileScreen from '../screens/ProfileScreen';
import InfraredDetectionScreen from '../screens/InfraredDetectionScreen';
import MagneticDetectionScreen from '../screens/MagneticDetectionScreen';
import { BottomTabParamList } from '../types';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#2563EB',
        tabBarInactiveTintColor: '#94A3B8',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E2E8F0',
          height: 60,
          paddingBottom: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View className="items-center">
              <Ionicons 
                name={focused ? 'home' : 'home-outline'} 
                size={24} 
                color={color} 
              />
              <Text className="text-xs mt-1" style={{ color }}>
                Home
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Scan"
        component={ScanScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View className="items-center">
              <Ionicons 
                name={focused ? 'scan-circle' : 'scan-circle-outline'} 
                size={24} 
                color={color} 
              />
              <Text className="text-xs mt-1" style={{ color }}>
                Scan
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View className="items-center">
              <Ionicons 
                name={focused ? 'person' : 'person-outline'} 
                size={24} 
                color={color} 
              />
              <Text className="text-xs mt-1" style={{ color }}>
                Profile
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="InfraredDetection"
        component={InfraredDetectionScreen}
        options={{
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        name="MagneticDetection"
        component={MagneticDetectionScreen}
        options={{
          tabBarButton: () => null,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator; 