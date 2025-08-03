import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const HomeHeader = () => {
  return (
    <View className='flex-row '>
       <Image
        source={require('../../assets/images/profile.png')}  // Replace with your logo URL
        className='w-[60px] h-[60px] rounded-full'
       />
       <View className='flex-1 justify-center pl-[80px]'>
       <Text className='text-[#1C0D0F] font-semibold text-[25px]'> 𝐀𝐬𝐚𝐩𝐡 </Text>
       </View>
    </View>
  )
}

export default HomeHeader

