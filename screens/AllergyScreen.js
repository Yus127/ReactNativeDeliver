import {View, Text, SafeAreaView, TextInput, TouchableOpacity, Image, ScrollView} from 'react-native'
import React from 'react'
import {useNavigation} from "@react-navigation/native";
import {ArrowLeftIcon, XCircleIcon} from "react-native-heroicons/solid";

export default function AllergyScreen() {
    const navigation = useNavigation();

    return (
    <SafeAreaView>

        <View className="relative">
            <Image
                source={require('../assets/foodAllergies.jpg')}
                className="w-full h-56  p-4"
            />

        </View>
        <TouchableOpacity
            onPress={navigation.goBack}
            className="rounded-full bg-gray-100 absolute top-12 right-4">
            <XCircleIcon color="#FFC429" height={40} width={40}/>
        </TouchableOpacity>

<ScrollView contentContainerStyle={{paddingBottom:100,}}>
        <View className="bg-white mt-4 mx-4">
        <View className="  pb-2 pt-6 mx-4">
            <Text className="text-sm">Tell us about any food allergies you have:  </Text>
        <Text className="text-gray-400 mt-2">We'll notify the restaurant   </Text>
        </View>

        <View className="flex-row items-center space-x-4 pb-2 pt-6 mx-4">

        <View className="flex-row space-x-2 flex-1 bg-amber-50 p-3 pb-40">

        <TextInput placeholder="Please write here"
                   keyboardType="default"/>

        </View>
        </View>
            <View className="mt-10">
            <TouchableOpacity

                className="rounded-lg bg-[#FFC429] px-4 m-3 py-1">
                <Text className="text-center text-white text-lg font-bold"> Submit</Text>
            </TouchableOpacity>
            </View>
        </View>
</ScrollView>
    </SafeAreaView>
  )
}