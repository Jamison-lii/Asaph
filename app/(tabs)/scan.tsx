import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import React, { useState } from "react";
import { ArrowLeft } from "lucide-react-native";
import { useNavigation } from "expo-router";
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import type { DocumentPickerAsset } from 'expo-document-picker';

const scan = () => {
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);

    const handleTakePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Camera access is required to take a photo.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
    }

     const handleRemovePhoto = () => {
         setImageUri(null);
      };


    const handlePickDocument = async () => {
  const result = await DocumentPicker.getDocumentAsync({
    type: '*/*',
    copyToCacheDirectory: true,
  });

  if (!result.canceled && result.assets && result.assets.length > 0) {
    const asset: DocumentPickerAsset = result.assets[0];
    setFileName(asset.name);
   // setImageUri(asset.uri);
  } else {
    setFileName(null);
    setImageUri(null);
  }
};

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

       <TouchableOpacity className='mt-9 ' onPress={handleTakePhoto}>
              <View className='bg-[#B21A2B] h-12 w-[318px] rounded-lg'>
                  <Text className='text-white text-lg font-semibold text-center pt-3'>Take a photo</Text>
              </View>
             

     
         
        </TouchableOpacity>

         <TouchableOpacity onPress={handlePickDocument} >
                 <View className='bg-[#F2E8E8] h-12 w-[318px] mt-4 rounded-lg'>
                    <Text className='text-black text-lg font-semibold text-center pt-3'>Upload an image or Document</Text>
                </View>
        </TouchableOpacity>

          {imageUri && (
                <View>
        <Image
          source={{ uri: imageUri }}
          
          className="w-[200px] h-[200px] mt-4 rounded-lg ml-16"
        />
         
          <View className='flex-row gap-5'>
         <TouchableOpacity
            onPress={handleRemovePhoto}
            className=" bg-[#F2E8E8] mt-4 pt-3 h-12 w-[150px] rounded-md "
          > 
            <Text className=" text-black text-lg font-semibold text-center">Remove</Text>
          </TouchableOpacity> 

           <TouchableOpacity  >
                 <View className='bg-[#B21A2B] h-12 w-[150px] mt-4 rounded-lg'>
                    <Text className='text-white text-lg font-semibold text-center pt-3'>Generate audio</Text>
                </View>
        </TouchableOpacity>
        </View>
     </View>
      )}
      
    </SafeAreaView>
  );
};

export default scan;


