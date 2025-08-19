import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import HomeHeader from '../components/homeHeader';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';


const index = () => {
    const router = useRouter();
    const [user, setUser] = useState<any>([])

    const handleScanNavigate = () => {
        router.push('/(tabs)/scan');
    };

    const handleTypeNavigate = () => {
        router.push('/(tabs)/profile');
    }

     const handleSavedNavigate = () => {
        router.push('/(tabs)/saved');
     }

     const getUserData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@user_data');
    if(jsonValue !== null) {
      const userData = JSON.parse(jsonValue);
      setUser(userData);
      console.log('User data fetched successfully:', userData);
    }
   else {
      setUser(null);
      return null;
    }
  } catch (e) {
    console.error('Failed to fetch data from local storage', e);
  }
};

  useEffect(() => {
        getUserData();
},[])

  return (
    <SafeAreaView className='flex-1 bg-[#FAF7FA]'>
        <HomeHeader />
        
    <View className="bg-[#FAF7FA] flex-1  pt-5" >
       
      <Text className='pl-5 font-semibold text-2xl'>Welcome back, {user && user.name ? user.name.split(' ')[0] : 'Guest'}</Text>
      <View className='flex-column items-center justify-between px-5 mt-5'>
        <TouchableOpacity onPress={handleScanNavigate}>
        <View className='bg-[#B21A2B] h-12 w-[318px] rounded-lg'>
            <Text className='text-white text-lg font-semibold text-center pt-3'>Scan Solfa Sheet</Text>
        </View>
        </TouchableOpacity>

         <TouchableOpacity onPress={handleTypeNavigate}>
        <View className='bg-[#B21A2B] h-12 w-[318px] mt-4 rounded-lg'>
            <Text className='text-white text-lg font-semibold text-center pt-3'>Type Solfa</Text>
        </View>
        </TouchableOpacity>
         
          <TouchableOpacity onPress={handleSavedNavigate}>
         <View className='bg-[#B21A2B] h-12 w-[318px] mt-4 rounded-lg'>
            <Text className='text-white text-lg font-semibold text-center pt-3'>  My Songs</Text>
        </View>
        </TouchableOpacity>

         <TouchableOpacity>
         <View className='bg-[#F2E8E8] h-12 w-[318px] mt-4 rounded-lg'>
            <Text className='text-black text-lg font-semibold text-center pt-3'>Sign Up</Text>
        </View>
        </TouchableOpacity>

      </View>
    </View>
    </SafeAreaView>
  )
}

export default index

const styles = StyleSheet.create({})