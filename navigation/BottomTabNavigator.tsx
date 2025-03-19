import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Platform, View, StyleSheet, Text, Dimensions } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import ScanScreen from '../screens/ScanScreen';
import ProfileScreen from '../screens/ProfileScreen';
import InfraredDetectionScreen from '../screens/InfraredDetectionScreen';
import MagneticDetectionScreen from '../screens/MagneticDetectionScreen';
import { BottomTabParamList } from '../types';

const { width: screenWidth } = Dimensions.get('window');
const TAB_BAR_WIDTH = Math.min(320, screenWidth - 32); // Slightly smaller max width

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#2563EB',
        tabBarInactiveTintColor: '#94A3B8',
        tabBarStyle: {
          position: 'absolute',
          bottom: 16,
          left: '50%',
          transform: [{ translateX: -TAB_BAR_WIDTH / 2 }],
          width: TAB_BAR_WIDTH,
          height: 60,
          backgroundColor: '#FFFFFF',
          borderWidth: 1,
          borderColor: '#E2E8F0',
          borderRadius: 30,
          paddingHorizontal: 8,
          paddingBottom: 0,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.1,
          shadowRadius: 12,
        },
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
          marginTop: 0,
          paddingBottom: Platform.OS === 'ios' ? 0 : 4,
        },
        tabBarItemStyle: {
          height: '100%',
          paddingTop: 8,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <View style={styles.iconContainer}>
              <Ionicons 
                name={focused ? 'home' : 'home-outline'} 
                size={24} 
                color={color} 
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Scan"
        component={ScanScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <View style={styles.iconContainer}>
              <Ionicons 
                name={focused ? 'scan-circle' : 'scan-circle-outline'} 
                size={24} 
                color={color} 
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <View style={styles.iconContainer}>
              <Ionicons 
                name={focused ? 'person' : 'person-outline'} 
                size={24} 
                color={color} 
              />
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

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 32,
  },
});

export default BottomTabNavigator; 