import {View, Text, TouchableOpacity, Image, SafeAreaView} from 'react-native'
import React from 'react'
import {ArrowLeftIcon, UserIcon} from "react-native-heroicons/solid";
import {useNavigation} from "@react-navigation/native";

export default function ProfileScreen() {
    const navigation = useNavigation();
  return (
      <SafeAreaView className="mt-5 flex-1 bg-white">

      <View className="relative">

        <View className="bg-white">
            <View className="p-2 borde-b border-[#FFC429] bg-white shadow-xs">


            <View className="flex-box">

                <Text className="text-lg font-bold text-center bg-amber-50 p-6">Profile</Text>
            </View>
            <TouchableOpacity
                onPress={navigation.goBack}
                className="absolute top-2 left-3 p-2 bg-opacity-100 rounded-full">
                <ArrowLeftIcon size={22} color="#FFC429"/>
            </TouchableOpacity>
            </View>



            <View className="px-6 pt-4">
                <View className="flex items-center">

                <Image source={require('../assets/foto.png')}
                       className='h-20 w-20 bg-gray-300 p-20 rounded-full mt-6'
                />

                <Text className="mt-8"> <Text className="text-lg ">Name: </Text> Yusdivia Molina </Text>
                <Text className="mt-4"><Text className="text-lg">Address: </Text> Drexel, Missouri(MO), 64742 </Text>
                <Text className="mt-4"><Text className="text-lg">Phone number:</Text> 12345678</Text>
                <Text className="mt-4 mb-8"><Text className="text-lg">Email: </Text> A01653120@tec.mx</Text>
                    <View className="rounded-lg bg-[#FFC429] px-6">
                <Text className="text-center text-white text-lg font-bold">Edit</Text>
                    </View>
                </View>
            </View>
        </View>
    </View>
      </SafeAreaView>
  )
}