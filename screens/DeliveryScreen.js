import {View, Text, SafeAreaView, TouchableOpacity, Image, ProgressBarAndroid} from 'react-native'
import React, {useState} from 'react'
import {useNavigation} from "@react-navigation/native";
import {useSelector} from "react-redux";
import {selectRestaurant} from "../features/restaurantSlice";
import {XIcon} from "react-native-heroicons/solid";
import * as Progess from 'react-native-progress'
import MapView from "react-native-maps";
import {Marker} from "react-native-maps";


export default function DeliveryScreen() {
    const navigation = useNavigation();
    const restaurant = useSelector(selectRestaurant);


  return (
    <View className="bg-[#FFC429] flex-1">
      <SafeAreaView className="z-50">
          <View className="flex-row justify-between items-center p-5">
              <TouchableOpacity onPress={()=> navigation.navigate("Home")}>
                  <XIcon color="white" size={30}/>
              </TouchableOpacity>
              <Text className="font-light text-white text-lg">Order Help</Text>
          </View>
          <View className="bg-white mx-5 my-2 rounded-md p-6 z-50 shadow-md">
              <View className="flex-row justify-between">


              <View>
                  <Text className="text-lg text-gray-400">Estimated Arrival </Text>
                  <Text className="text-4xl font-bold">40-55 minutes</Text>

              </View>
              <Image source={{uri: "https://links.papareact.com/fls"}}
                     className="h-20 w-20"/>
              </View>
              <Progess.Bar size={30} color="#FFC429" indeterminate={true}/>
              <Text className="mt-3 text-gray-500">
                  Your Order at {restaurant.title} is being prepared.
              </Text>

          </View>


      </SafeAreaView>
        <MapView
            showsPointsOfInterest={true}
            showsUserLocation={true}

            initialRegion={{
                latitude: 19.304419414867038,
                longitude: -99.19007418666133,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005
            }}
            className='flex-1 mt-10 z-0'
            mapType='mutedStandard'>
            <Marker
                coordinate={{
                    latitude: 19.304419414867038,
                    longitude: -99.19007418666133
                }}
                title={restaurant.title}
                description={restaurant.description}
                identifier='origin'
                pinColor='#00CCBB'
            />
        </MapView>
        <View
            className=" bg-white p-4 flex-row items-center space-x-1">
            <Image source={require('../assets/food.jpg')}
                   className=" h-12 w-12 bg-gray-300 p-0.5 rounded-full"/>
            
            <Text className=" pl-4 text-black font-extrabold text-lg text-center">Your delivery man: </Text>
            <Text className="text-center">Juan Pérez </Text>
        </View>

    </View>

)
}