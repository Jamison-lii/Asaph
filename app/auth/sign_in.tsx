import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const sign_in = () => {
   const [text, setText] = useState(''); 
  return (
    <SafeAreaView className='flex-1 pt-14 pl-4 gap-4  bg-[#FAF7FA]'>

          <TextInput
        className='h-14 w-[330px] rounded-lg bg-[#F5F0F2] pl-2'
        placeholder="Username"
        value={text}
        onChangeText={setText}
      />

             <TextInput
        className='h-14 w-[330px] rounded-lg bg-[#F5F0F2] pl-2'
        placeholder="Password"
        value={text}
        onChangeText={setText}
      />

          <TouchableOpacity className=' '>
                       <View className='bg-[#B21A2B] h-12 w-[325px] rounded-full'>
                           <Text className='text-white text-lg font-semibold text-center pt-3'>Take a photo</Text>
                       </View>
           </TouchableOpacity>
         
    </SafeAreaView>
  )
}

export default sign_in
