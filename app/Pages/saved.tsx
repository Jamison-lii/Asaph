import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft, Trash2, Edit3 } from "lucide-react-native";
import { useRouter, useFocusEffect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Song {
  title: string;
  key: string;
  parts?: {
    soprano: string;
    alto: string;
    tenor: string;
    bass: string;
  };
  rawParts?: {
    soprano: string;
    alto: string;
    tenor: string;
    bass: string;
  };
}

const Saved = () => {
  const router = useRouter();
  const [songs, setSongs] = useState<Song[]>([]);

  // Fetch songs from AsyncStorage
  const fetchSongs = async () => {
    try {
      const stored = await AsyncStorage.getItem("songs");
      const parsed = stored ? JSON.parse(stored) : [];
      setSongs(parsed);
    } catch (error) {
      console.error("Failed to load songs", error);
    }
  };

  // Re-fetch when screen is focused
  useFocusEffect(
    React.useCallback(() => {
      fetchSongs();
    }, [])
  );

  // Delete a song
  const deleteSong = (index: number) => {
    Alert.alert(
      "Delete Song",
      `Are you sure you want to delete "${songs[index]?.title}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            const updated = [...songs];
            updated.splice(index, 1);
            setSongs(updated);
            await AsyncStorage.setItem("songs", JSON.stringify(updated));
          },
        },
      ]
    );
  };

  const renderSong = ({ item, index }: { item: Song; index: number }) => {
    // Support both old and new structure
    const parts = item.parts || item.rawParts;

    return (
      <View className="bg-white rounded-lg shadow p-4 mb-4 mx-5">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-lg font-semibold text-gray-800">
            {item.title || "Untitled"}
          </Text>

          <View className="flex-row gap-7">
            <TouchableOpacity
              onPress={() =>
                router.push({ pathname: "/Pages/editSong", params: { index } })
              }
            >
              <Edit3 size={20} color="#B21A2B" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => deleteSong(index)}>
              <Trash2 size={20} color="#B21A2B" />
            </TouchableOpacity>
          </View>
        </View>

        <Text className="text-gray-700 font-semibold mb-2">
          Key: {item.key || "C"}
        </Text>

        <Text className="text-gray-700 mb-1">
          Soprano: {parts?.soprano || "-"}
        </Text>
        <Text className="text-gray-700 mb-1">Alto: {parts?.alto || "-"}</Text>
        <Text className="text-gray-700 mb-1">Tenor: {parts?.tenor || "-"}</Text>
        <Text className="text-gray-700">Bass: {parts?.bass || "-"}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FAF7FA]">
      {/* Header */}
      <View className="flex-row items-center p-4 bg-[#B21A2B]">
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft color="white" size={28} />
        </TouchableOpacity>
        <Text className="text-white text-xl font-semibold ml-3">
          Saved Songs
        </Text>
      </View>

      {/* Song List */}
      {songs.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-gray-500 text-lg">No saved songs yet.</Text>
        </View>
      ) : (
        <FlatList
          data={songs}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderSong}
          contentContainerStyle={{ paddingVertical: 10 }}
        />
      )}
    </SafeAreaView>
  );
};

export default Saved;
