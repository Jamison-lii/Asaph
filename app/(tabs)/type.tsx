import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';
import { useNavigation } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TypeSolfaScreen = () => {
  const navigation = useNavigation();

  const [soprano, setSoprano] = useState('');
  const [alto, setAlto] = useState('');
  const [tenor, setTenor] = useState('');
  const [bass, setBass] = useState('');

  // Modal state
  const [modalVisible, setModalVisible] = useState(false);
  const [songTitle, setSongTitle] = useState('');

  const handleSaveSong = async () => {
    if (!songTitle) return;

    const song = {
      title: songTitle,
      parts: { soprano, alto, tenor, bass },
    };

    try {
      const existing = await AsyncStorage.getItem('songs');
      const songs = existing ? JSON.parse(existing) : [];
      songs.push(song);
      await AsyncStorage.setItem('songs', JSON.stringify(songs));

      setModalVisible(false);
      setSongTitle('');
      Alert.alert('✅ Saved', `Song "${song.title}" has been saved!`);
      navigation.goBack();
    } catch (error) {
      console.error('Save failed', error);
      Alert.alert('❌ Error', 'Could not save song');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FAF7FA]">
      <View className="flex-row items-center p-4 bg-[#B21A2B]">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft color="white" size={28} />
        </TouchableOpacity>
        <Text className="text-white text-xl font-semibold ml-3">Type Solfa</Text>
      </View>

      <Text className="px-5 mt-5 text-lg font-medium text-gray-800">
        Enter solfa for each part:
      </Text>

      <View className="mx-5 mt-3 gap-3">
        <TextInput
          className="bg-white rounded-md shadow p-3 text-lg text-gray-900"
          placeholder="Soprano line..."
          multiline
          value={soprano}
          onChangeText={setSoprano}
        />
        <TextInput
          className="bg-white rounded-md shadow p-3 text-lg text-gray-900"
          placeholder="Alto line..."
          multiline
          value={alto}
          onChangeText={setAlto}
        />
        <TextInput
          className="bg-white rounded-md shadow p-3 text-lg text-gray-900"
          placeholder="Tenor line..."
          multiline
          value={tenor}
          onChangeText={setTenor}
        />
        <TextInput
          className="bg-white rounded-md shadow p-3 text-lg text-gray-900"
          placeholder="Bass line..."
          multiline
          value={bass}
          onChangeText={setBass}
        />
      </View>

      <View className="mt-6 items-center">
        <TouchableOpacity className="bg-[#B21A2B] w-[318px] h-12 rounded-lg justify-center mb-3">
          <Text className="text-white text-lg font-semibold text-center">▶ Play Preview</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          className="bg-[#F2E8E8] w-[318px] h-12 rounded-lg justify-center"
        >
          <Text className="text-black text-lg font-semibold text-center">💾 Save Song</Text>
        </TouchableOpacity>
      </View>

      {/* Custom Modal for song title */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white p-6 rounded-lg w-[300px]">
            <Text className="text-lg font-semibold mb-3">Enter a title for this song:</Text>
            <TextInput
              className="border border-gray-300 rounded-md p-2 mb-4"
              placeholder="Song Title"
              value={songTitle}
              onChangeText={setSongTitle}
            />
            <TouchableOpacity
              onPress={handleSaveSong}
              className="bg-[#B21A2B] p-3 rounded-md mb-2"
            >
              <Text className="text-white text-center font-semibold">Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              className="bg-gray-300 p-3 rounded-md"
            >
              <Text className="text-black text-center font-semibold">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default TypeSolfaScreen;
