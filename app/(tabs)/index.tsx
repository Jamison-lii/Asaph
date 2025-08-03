import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import HomeHeader from '../components/homeHeader';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router';


const index = () => {
    const router = useRouter();

    const handleScanNavigate = () => {
        router.push('/(tabs)/scan');
    };

    const handleTypeNavigate = () => {
        router.push('/(tabs)/profile');
    }

     const handleSavedNavigate = () => {
        router.push('/(tabs)/saved');
     }

  return (
    <SafeAreaView className='flex-1 bg-[#FAF7FA]'>
        <HomeHeader />
        
    <View className="bg-[#FAF7FA] flex-1  pt-5" >
       
      <Text className='pl-5 font-semibold text-2xl'>Welcome back, Jamison</Text>
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
            <Text className='text-black text-lg font-semibold text-center pt-3'>Settings</Text>
        </View>
        </TouchableOpacity>

      </View>
    </View>
    </SafeAreaView>
  )
}

export default index

const styles = StyleSheet.create({})