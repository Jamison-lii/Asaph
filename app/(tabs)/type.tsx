import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';
import { useNavigation } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { parseSongParts } from '../Utils/ParseSolfa'; // make sure this is exported correctly

const TypeSolfaScreen = () => {
  const navigation = useNavigation();

  const [soprano, setSoprano] = useState('');
  const [alto, setAlto] = useState('');
  const [tenor, setTenor] = useState('');
  const [bass, setBass] = useState('');

  // Modal state for saving song
  const [modalVisible, setModalVisible] = useState(false);
  const [songTitle, setSongTitle] = useState('');
  const [key, setKey] = useState('C'); // default song key

  // Modal state for play preview key
  const [keyModalVisible, setKeyModalVisible] = useState(false);
  const [previewKey, setPreviewKey] = useState('C'); // key for preview

  // Handle actual parsing and preview
  const handlePlayPreview = (selectedKey: string) => {
    if (!soprano && !alto && !tenor && !bass) {
      Alert.alert('No input', 'Please enter solfa for at least one part to play a preview.');
      return;
    }

    try {
      const parsedParts = parseSongParts({ soprano, alto, tenor, bass }, selectedKey);
      console.log('Parsed song for preview:', parsedParts);
      Alert.alert('Preview Ready', 'Check console for parsed notes.');
      // TODO: Implement audio playback here using parsedParts
    } catch (err) {
      console.error('Parsing failed', err);
      Alert.alert('Error', 'Could not parse solfa lines.');
    }
  };

  // Play Preview button pressed -> show key modal
  const playPreview = () => {
    setPreviewKey(key); // default to current key
    setKeyModalVisible(true);
  };

  // Save song
  const handleSaveSong = async () => {
    if (!songTitle) {
      Alert.alert('Enter Title', 'Please enter a song title.');
      return;
    }

    try {
      const parsedParts = parseSongParts({ soprano, alto, tenor, bass }, key);

      const song = {
        title: songTitle,
        key: key || 'C',
        rawParts: { soprano, alto, tenor, bass },
        parsedParts,
      };

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
      Alert.alert('❌ Error', 'Could not save song.');
    }
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

      <Text className="px-5 mt-5 text-lg font-medium text-gray-800">
        Enter solfa for each part:
      </Text>

      <ScrollView className="mx-5 mt-3 gap-3">
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
      </ScrollView>

      {/* Buttons */}
      <View className="mt-6 items-center">
        <TouchableOpacity
          onPress={playPreview}
          className="bg-[#B21A2B] w-[318px] h-12 rounded-lg justify-center mb-3"
        >
          <Text className="text-white text-lg font-semibold text-center">▶ Play Preview</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          className="bg-[#F2E8E8] w-[318px] h-12 rounded-lg justify-center"
        >
          <Text className="text-black text-lg font-semibold text-center">💾 Save Song</Text>
        </TouchableOpacity>
      </View>

      {/* Modal for entering song title */}
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

            <Text className="text-lg font-semibold mb-3">Enter the key for the song:</Text>
            <TextInput
              className="border border-gray-300 rounded-md p-2 mb-4"
              placeholder="Key (e.g., C, G, F#)"
              value={key}
              onChangeText={setKey}
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

      {/* Modal for preview key */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={keyModalVisible}
        onRequestClose={() => setKeyModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white p-6 rounded-lg w-[300px]">
            <Text className="text-lg font-semibold mb-3">Enter the key for this preview:</Text>
            <TextInput
              className="border border-gray-300 rounded-md p-2 mb-4"
              placeholder="Key (e.g., C, G, F#)"
              value={previewKey}
              onChangeText={setPreviewKey}
            />

            <TouchableOpacity
              onPress={() => {
                setKeyModalVisible(false);
                handlePlayPreview(previewKey);
              }}
              className="bg-[#B21A2B] p-3 rounded-md mb-2"
            >
              <Text className="text-white text-center font-semibold">OK</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setKeyModalVisible(false)}
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
