import { icons } from "@/constants/icons";
import React from "react";
import { Image, StyleSheet, TextInput, View } from "react-native";

interface Props {
  placeholder: string;
  onPress?: () => void;
}
const SearchBar = ({ placeholder, onPress }: Props) => {
  return (
    <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-2">
      <Image
        source={icons.search}
        className="size-5"
        resizeMode="contain"
        tintColor="#ab8bff"
      />
      <TextInput
        placeholder={placeholder}
        onPress={onPress}
        value=""
        onChangeText={() => {}}
        placeholderTextColor="#ab8bff"
        className="ml-3 flex-1 text-white"
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({});
