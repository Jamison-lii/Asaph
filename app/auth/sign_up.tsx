import {
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const storeUserData = async (
    name: string,
    email: string,
    password: string
  ) => {
    try {
      const userData = {
        name,
        email: email.trim().toLowerCase(),
        password,
      };
      const jsonValue = JSON.stringify(userData);
      await AsyncStorage.setItem("@user_data", jsonValue);
      console.log("User data saved successfully!");
    } catch (e) {
      console.error("Failed to save data to local storage", e);
    }
  };

  const handleSignUp = async () => {
    try {
      setError("");

      if (!name || !email || !pass || !confirmPass) {
        throw new Error("All fields are required");
      }
      if (pass !== confirmPass) throw new Error("Passwords do not match");
      if (pass.length < 6) throw new Error("Password must be at least 6 characters long");
      if (name.length < 3)
        throw new Error("Name must be at least 3 characters long");
      if (!/^[a-zA-Z\s]+$/.test(name))
        throw new Error("Name can only contain letters and spaces");
      if (
        !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
      ) {
        throw new Error("Please enter a valid email address");
      }

      // Save user
      await storeUserData(name, email, pass);

      Alert.alert("Success", "You have signed up successfully!");
      router.push("/auth/sign_in");
    } catch (err: any) {
      setError(err.message);
      console.error(err);
    }
  };

  return (
    <SafeAreaView className="flex-1 justify-center pl-4 gap-4 bg-[#FAF7FA]">
      <Text className="text-[#1C0D0F] text-center font-semibold text-[25px]">
        𝐀𝐬𝐚𝐩𝐡
      </Text>

      {error ? (
        <Text className="text-red-500 text-center font-semibold">{error}</Text>
      ) : null}

      <TextInput
        className="h-14 w-[330px] rounded-lg bg-[#F5F0F2] pl-2"
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
      />

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

      <TextInput
        className="h-14 w-[330px] rounded-lg bg-[#F5F0F2] pl-2"
        placeholder="Confirm Password"
        value={confirmPass}
        onChangeText={setConfirmPass}
        secureTextEntry
      />

      <TouchableOpacity onPress={handleSignUp}>
        <View className="bg-[#B21A2B] h-12 w-[325px] rounded-full justify-center">
          <Text className="text-white text-lg font-semibold text-center">
            Sign Up
          </Text>
        </View>
      </TouchableOpacity>

      <Text className="text-[#686868] text-center font-semibold">
        Already have an account?{" "}
        <Text
          className="underline"
          onPress={() => {
            router.push("/auth/sign_in");
          }}
        >
          Log in
        </Text>
      </Text>
    </SafeAreaView>
  );
};

export default SignUp;
