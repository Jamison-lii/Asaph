import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

type User = {
  name: string;
  email: string;
  // Add other user properties as needed
};

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const getUserData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@user_data');
      if (jsonValue !== null) {
        const userData = JSON.parse(jsonValue);
        setUser(userData);
      } else {
        setUser(null);
      }
    } catch (e) {
      console.error('Error reading user data:', e);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const handleLogout = async () => {
  //  await AsyncStorage.removeItem('@user_data');
    setUser(null);
    router.replace('/auth/sign_up'); // or navigate to login screen
  };

  const handleNavigate  = () => {
    router.push('../Pages/saved');
  }

  return (
    <SafeAreaView className="flex-1 bg-[#FAF7FA] px-6 pt-10">
      <View className="items-center mb-6">
        {/* Avatar Circle or Placeholder */}
        <View className="bg-[#B21A2B] h-24 w-24 rounded-full flex items-center justify-center">
          <Text className="text-white text-3xl font-bold">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'G'}
          </Text>
        </View>
        <Text className="mt-4 text-xl font-semibold">{user?.name || 'Guest User'}</Text>
        <Text className="text-gray-500">{user?.email || 'guest@example.com'}</Text>
      </View>

      {/* Buttons */}
      <TouchableOpacity className="bg-[#B21A2B] py-3 rounded-lg mb-4">
        <Text className="text-white text-center text-lg font-semibold">Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleNavigate} className="bg-[#B21A2B] py-3 rounded-lg mb-4">
        <Text className="text-white text-center text-lg font-semibold">My Songs</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleLogout}
        className="bg-[#F2E8E8] py-3 rounded-lg mt-10"
      >
        <Text className="text-black text-center text-lg font-semibold">Log Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({});
