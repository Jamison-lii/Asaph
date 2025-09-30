import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft } from "lucide-react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Song {
  title: string;
  key: string;
  parts: {
    soprano: string;
    alto: string;
    tenor: string;
    bass: string;
  };
}

const EditSong = () => {
  const router = useRouter();
  const { index } = useLocalSearchParams<{ index: string }>();

  const [songs, setSongs] = useState<Song[]>([]);
  const [song, setSong] = useState<Song | null>(null);

  useEffect(() => {
    const loadSong = async () => {
      try {
        const stored = await AsyncStorage.getItem("songs");
        const parsed: Song[] = stored ? JSON.parse(stored) : [];
        setSongs(parsed);
        if (index !== undefined && parsed[+index]) {
          setSong(parsed[+index]);
        }
      } catch (error) {
        console.error("Failed to load song", error);
      }
    };
    loadSong();
  }, [index]);

  const saveChanges = async () => {
    if (!song) return;
    try {
      const updated = [...songs];
      updated[+index] = song;
      await AsyncStorage.setItem("songs", JSON.stringify(updated));
      Alert.alert("Success", "Song updated successfully!");
      router.back();
    } catch (error) {
      console.error("Failed to save song", error);
    }
  };

  if (!song) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <Text className="text-gray-500">Loading song...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#FAF7FA]">
      {/* Header */}
      <View className="flex-row items-center p-4 bg-[#B21A2B]">
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft color="white" size={28} />
        </TouchableOpacity>
        <Text className="text-white text-xl font-semibold ml-3">
          Edit Song
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
          <Text className="text-gray-800 font-semibold mb-2">Key</Text>
        <TextInput
          value={song.key}
          onChangeText={(text) => setSong({ ...song, key: text })}
          className="bg-white rounded-md shadow px-5 py-4 mb-4"
          placeholder="Song Key"
        />

        <Text className="text-gray-800 font-semibold mb-2">Title</Text>
        <TextInput
          value={song.title}
          onChangeText={(text) => setSong({ ...song, title: text })}
          className="bg-white rounded-md shadow px-5 py-2 mb-4"
          placeholder="Song Title"
        />

        <Text className="text-gray-800 font-semibold mb-2">Soprano</Text>
        <TextInput
          value={song.parts.soprano}
          onChangeText={(text) =>
            setSong({ ...song, parts: { ...song.parts, soprano: text } })
          }
          className="bg-white rounded-md shadow px-5 py-2 mb-4"
          placeholder="Soprano Part"
        />

        <Text className="text-gray-800 font-semibold mb-2">Alto</Text>
        <TextInput
          value={song.parts.alto}
          onChangeText={(text) =>
            setSong({ ...song, parts: { ...song.parts, alto: text } })
          }
          className="bg-white rounded-md shadow px-5 py-2 mb-4"
          placeholder="Alto Part"
        />

        <Text className="text-gray-800 font-semibold mb-2">Tenor</Text>
        <TextInput
          value={song.parts.tenor}
          onChangeText={(text) =>
            setSong({ ...song, parts: { ...song.parts, tenor: text } })
          }
          className="bg-white rounded-md shadow px-5 py-2 mb-4"
          placeholder="Tenor Part"
        />

        <Text className="text-gray-800 font-semibold mb-2">Bass</Text>
        <TextInput
          value={song.parts.bass}
          onChangeText={(text) =>
            setSong({ ...song, parts: { ...song.parts, bass: text } })
          }
          className="bg-white rounded-md shadow px-5 py-2 mb-6"
          placeholder="Bass Part"
        />

        <TouchableOpacity
          onPress={saveChanges}
          className="bg-[#B21A2B] rounded-lg py-3"
        >
          <Text className="text-white text-center font-semibold text-lg">
            Save Changes
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditSong;
