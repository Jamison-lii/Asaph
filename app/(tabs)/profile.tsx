import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'

const type = () => {
  const router = useRouter();



  return (
    <SafeAreaView>

    <TouchableOpacity className='mt-20' onPress={() => router.push('/auth/sign_in')}>
             <View className='bg-[#F2E8E8] h-12 w-[318px] mt-4 ml-3 rounded-lg'>
                <Text className='text-black text-lg font-semibold text-center pt-3'>Login</Text>
            </View>
    </TouchableOpacity>

    <TouchableOpacity className='mt-4' onPress={() => router.push('/auth/sign_up')} >
             <View className='bg-[#F2E8E8] h-12 w-[318px] mt-4 ml-3 rounded-lg'>
                <Text className='text-black text-lg font-semibold text-center pt-3'>SignUp</Text>
            </View>
    </TouchableOpacity>
    
    </SafeAreaView>
  )
}

export default type

