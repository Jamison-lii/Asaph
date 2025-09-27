import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';
import { useNavigation } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TypeSolfaScreen = () => {
  const navigation = useNavigation();

  // State for each voice part
  const [soprano, setSoprano] = useState('');
  const [alto, setAlto] = useState('');
  const [tenor, setTenor] = useState('');
  const [bass, setBass] = useState('');

  // Save function
  const handleSaveSong = () => {
    Alert.prompt(
      "Save Song",
      "Enter a title for this song:",
      async (title) => {
        if (!title) return;

        const song = {
          title,
          parts: {
            soprano,
            alto,
            tenor,
            bass,
          },
        };

        try {
          // Get existing songs
          const existing = await AsyncStorage.getItem('songs');
          const songs = existing ? JSON.parse(existing) : [];

          // Add new song
          songs.push(song);

          // Save back to storage
          await AsyncStorage.setItem('songs', JSON.stringify(songs));

          Alert.alert("✅ Saved", `Song "${title}" has been saved!`);
          navigation.goBack();
        } catch (error) {
          console.error("Save failed", error);
          Alert.alert("❌ Error", "Could not save song");
        }
      }
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FAF7FA]">
      {/* Header */}
      <View className="flex-row items-center p-4 bg-[#B21A2B]">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft color="white" size={28} />
        </TouchableOpacity>
        <Text className="text-white text-xl font-semibold ml-3">Type Solfa</Text>
      </View>

      {/* Instruction */}
      <Text className="px-5 mt-5 text-lg font-medium text-gray-800">
        Enter solfa for each part:
      </Text>

      {/* SATB Inputs */}
      <View className="mx-5 mt-3 space-y-3">
        <TextInput
          className="bg-white rounded-2xl shadow p-3 text-lg text-gray-900"
          placeholder="Soprano line..."
          multiline
          value={soprano}
          onChangeText={setSoprano}
        />
        <TextInput
          className="bg-white rounded-2xl shadow p-3 text-lg text-gray-900"
          placeholder="Alto line..."
          multiline
          value={alto}
          onChangeText={setAlto}
        />
        <TextInput
          className="bg-white rounded-2xl shadow p-3 text-lg text-gray-900"
          placeholder="Tenor line..."
          multiline
          value={tenor}
          onChangeText={setTenor}
        />
        <TextInput
          className="bg-white rounded-2xl shadow p-3 text-lg text-gray-900"
          placeholder="Bass line..."
          multiline
          value={bass}
          onChangeText={setBass}
        />
      </View>

      {/* Action Buttons */}
      <View className="mt-6 items-center">
        <TouchableOpacity className="bg-[#B21A2B] w-[318px] h-12 rounded-lg justify-center mb-3">
          <Text className="text-white text-lg font-semibold text-center">
            ▶ Play Preview
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleSaveSong}
          className="bg-[#F2E8E8] w-[318px] h-12 rounded-lg justify-center"
        >
          <Text className="text-black text-lg font-semibold text-center">
            💾 Save Song
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default TypeSolfaScreen;
