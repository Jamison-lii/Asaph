import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { ArrowLeft } from "lucide-react-native";
import { useNavigation } from "expo-router";

const scan = () => {
    const navigation = useNavigation();
  return (
    <SafeAreaView className='flex-1 pt-14 pl-5  bg-[#FAF7FA]'>
      <View className="flex-row ">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft  size={28} />
        </TouchableOpacity>
        <Text className='text-2xl font-semibold ml-32'> 𝐒𝐜𝐚𝐧 </Text>
      </View>

      <View className="pt-7">
       <Text className=' font-medium text-2xl'>𝐒𝐜𝐚𝐧 𝐲𝐨𝐮𝐫 𝐬𝐨𝐥𝐟𝐚 𝐬𝐡𝐞𝐞𝐭𝐬</Text>
       <Text className='mt-4  font-medium text-xl'>Take a photo or upload the photo or scanned song</Text>
      </View>

       <TouchableOpacity className='mt-9 '>
              <View className='bg-[#B21A2B] h-12 w-[318px] rounded-lg'>
                  <Text className='text-white text-lg font-semibold text-center pt-3'>Take a photo</Text>
              </View>
        </TouchableOpacity>

         <TouchableOpacity>
                 <View className='bg-[#F2E8E8] h-12 w-[318px] mt-4 rounded-lg'>
                    <Text className='text-black text-lg font-semibold text-center pt-3'>Upload an image</Text>
                </View>
        </TouchableOpacity>
      
    </SafeAreaView>
  );
};

export default scan;


