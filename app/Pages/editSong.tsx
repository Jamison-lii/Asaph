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

  const [song, setSong] = useState<Song | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Load the song directly from AsyncStorage
  useEffect(() => {
    const loadSong = async () => {
      try {
        const stored = await AsyncStorage.getItem("songs");
        if (!stored) {
          setLoading(false);
          return;
        }

        const parsed: Song[] = JSON.parse(stored);
        const idx = Number(index);

        if (!isNaN(idx) && parsed[idx]) {
          setSong(parsed[idx]);
        }
      } catch (error) {
        console.error("Failed to load song", error);
        Alert.alert("Error", "Failed to load song data.");
      } finally {
        setLoading(false);
      }
    };

    loadSong();
  }, [index]);

  // 🔹 Save song changes back to AsyncStorage
  const saveChanges = async () => {
    if (!song) return;

    try {
      const stored = await AsyncStorage.getItem("songs");
      const parsed: Song[] = stored ? JSON.parse(stored) : [];
      const idx = Number(index);

      if (!isNaN(idx)) {
        parsed[idx] = song;
        await AsyncStorage.setItem("songs", JSON.stringify(parsed));
        Alert.alert("✅ Success", "Song updated successfully!");
        router.back();
      }
    } catch (error) {
      console.error("Failed to save song", error);
      Alert.alert("Error", "Could not save changes.");
    }
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-[#FAF7FA]">
        <Text className="text-gray-500 text-lg">Loading song...</Text>
      </SafeAreaView>
    );
  }

  if (!song) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-[#FAF7FA]">
        <Text className="text-gray-500 text-lg">Song not found.</Text>
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
        <Text className="text-white text-xl font-semibold ml-3">Edit Song</Text>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
        <Text className="text-gray-800 font-semibold mb-2">Title</Text>
        <TextInput
          value={song.title}
          onChangeText={(text) => setSong({ ...song, title: text })}
          className="bg-white rounded-md shadow px-5 py-3 mb-4 text-lg"
          placeholder="Song Title"
        />

        <Text className="text-gray-800 font-semibold mb-2">Key</Text>
        <TextInput
          value={song.key}
          onChangeText={(text) => setSong({ ...song, key: text })}
          className="bg-white rounded-md shadow px-5 py-3 mb-4 text-lg"
          placeholder="e.g., C, F#, G"
        />

        <Text className="text-gray-800 font-semibold mb-2">Soprano</Text>
        <TextInput
          value={song.parts.soprano}
          onChangeText={(text) =>
            setSong({ ...song, parts: { ...song.parts, soprano: text } })
          }
          className="bg-white rounded-md shadow px-5 py-3 mb-4 text-lg"
          multiline
        />

        <Text className="text-gray-800 font-semibold mb-2">Alto</Text>
        <TextInput
          value={song.parts.alto}
          onChangeText={(text) =>
            setSong({ ...song, parts: { ...song.parts, alto: text } })
          }
          className="bg-white rounded-md shadow px-5 py-3 mb-4 text-lg"
          multiline
        />

        <Text className="text-gray-800 font-semibold mb-2">Tenor</Text>
        <TextInput
          value={song.parts.tenor}
          onChangeText={(text) =>
            setSong({ ...song, parts: { ...song.parts, tenor: text } })
          }
          className="bg-white rounded-md shadow px-5 py-3 mb-4 text-lg"
          multiline
        />

        <Text className="text-gray-800 font-semibold mb-2">Bass</Text>
        <TextInput
          value={song.parts.bass}
          onChangeText={(text) =>
            setSong({ ...song, parts: { ...song.parts, bass: text } })
          }
          className="bg-white rounded-md shadow px-5 py-3 mb-6 text-lg"
          multiline
        />

        {/* Save button */}
        <TouchableOpacity
          onPress={saveChanges}
          className="bg-[#B21A2B] rounded-lg py-3"
        >
          <Text className="text-white text-center font-semibold text-lg">
            💾 Save Changes
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditSong;
