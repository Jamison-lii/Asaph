import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router';

const sign_in = () => {
   const [name, setName] = useState('');
   const [pass, setPass] = useState('') 
   const router = useRouter();
  return (
    <SafeAreaView className='flex-1 pt-60 pl-4 gap-4   bg-[#FAF7FA]'>

       
             <Text className='text-[#1C0D0F] text-center font-semibold text-[25px]'> 𝐀𝐬𝐚𝐩𝐡 </Text>
    

          <TextInput
        className='h-14 w-[330px] rounded-lg bg-[#F5F0F2] pl-2'
        placeholder="Username"
        value={name}
        onChangeText={setName}
      />

             <TextInput
        className='h-14 w-[330px] rounded-lg bg-[#F5F0F2] pl-2'
        placeholder="Password"
        value={pass}
        onChangeText={setPass}
      />

          <TouchableOpacity className=' '>
                       <View className='bg-[#B21A2B] h-12 w-[325px] rounded-full'>
                           <Text className='text-white text-lg font-semibold text-center pt-3'> Login </Text>
                       </View>
           </TouchableOpacity>

            <Text className='text-[#686868]  text-center font-semibold text-5'> Don't have an account? <Text className='underline'onPress={()=>{router.push('/auth/sign_up')}}>Sign-up</Text> </Text>
         
    </SafeAreaView>
  )
}

export default sign_in
