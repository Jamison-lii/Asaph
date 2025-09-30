import { Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const userData = await AsyncStorage.getItem("@user_data");

      if (!userData) {
        alert("This user does not exist. Please sign up first.");
        return;
      }

      const user = JSON.parse(userData);

      if (!email || !pass) {
        alert("Please fill in all fields.");
        return;
      }

      if (
        user.email !== email.trim().toLowerCase() ||
        user.password !== pass
      ) {
        alert("Invalid credentials. Please try again.");
        return;
      }

      alert(`Welcome back, ${user.name}!`);
      router.push("/(tabs)");
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <SafeAreaView className="flex-1 pt-60 pl-4 gap-4 bg-[#FAF7FA]">
      <Text className="text-[#1C0D0F] text-center font-semibold text-[25px]">
        𝐀𝐬𝐚𝐩𝐡
      </Text>

      <TextInput
        className="h-14 w-[330px] rounded-lg bg-[#F5F0F2] pl-2"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        className="h-14 w-[330px] rounded-lg bg-[#F5F0F2] pl-2"
        placeholder="Password"
        value={pass}
        onChangeText={setPass}
        secureTextEntry
      />

      <TouchableOpacity onPress={handleLogin}>
        <View className="bg-[#B21A2B] h-12 w-[325px] rounded-full justify-center">
          <Text className="text-white text-lg font-semibold text-center">
            Login
          </Text>
        </View>
      </TouchableOpacity>

      <Text className="text-[#686868] text-center font-semibold">
        Don't have an account?{" "}
        <Text
          className="underline"
          onPress={() => {
            router.push("/auth/sign_up");
          }}
        >
          Sign-up
        </Text>
      </Text>
    </SafeAreaView>
  );
};

export default SignIn;
