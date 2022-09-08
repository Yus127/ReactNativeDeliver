import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native'
import React, {useEffect, useState} from 'react'
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { useLayoutEffect } from 'react';
import {urlFor} from "../sanity";
import {
  ArrowLeftIcon,
  ChevronRightIcon,
  LocationMarkerIcon,
  QuestionMarkCircleIcon,
  StarIcon
} from "react-native-heroicons/solid";
import dish from "../sanity/schemas/dish";
import Dish from "../sanity/schemas/dish";
import DishRow from "../components/DishRow";
import BasketIcon from "../components/BasketIcon";
import {useDispatch} from "react-redux";
import {setRestaurant} from "../features/restaurantSlice";


export default function RestaurantScreen() {
  const navigation = useNavigation();
  const dispatch= useDispatch();

  const{
    params: {
      id,
        imgUrl,
        title, 
        rating, 
        genre, 
        address, 
        short_description, 
        dish,
        long, 
        lat,  
    }
  } = useRoute();
  useEffect(() => {
    dispatch(setRestaurant({
      id,
      imgUrl,
      title,
      rating,
      genre,
      address,
      short_description,
      dish,
      long,
      lat,
    })
    );
  },[])
//dispatch
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown:false,
    })
  }, [])

  {/*quitar el header*/}
  return (
      <>
      <BasketIcon/>
    <ScrollView>
      <View className="relative">
        <Image
        source={{uri: urlFor(imgUrl).url(),
        }}
        className="w-full h-56 bg-gray-300 p-4"
        />
        <TouchableOpacity
            onPress={navigation.goBack}
            className="absolute top-14 left-5 p-2 bg-opacity-100 rounded-full">
          <ArrowLeftIcon size={20} color="#FFC429"/>
        </TouchableOpacity>
      </View>
      <View className="bg-white">
        <View className="px-4 pt-4">
          <Text className="text-3x1 font-bold">{title}</Text>
          <View className="flex-row space-x-2 my-1">
            <View className="flex-row items-center space-x-1">
              <StarIcon color="#FFC429" opacity={0.5} size={22}/>
              <Text className="text-xs text-amber-400 ">
                <Text className="text-amber-400"> {rating}</Text> {genre}
              </Text>
            </View>
              <View className="overflow-hidden truncate flex-row items-center space-x-1">
                <LocationMarkerIcon color="#FBB52D" opacity={0.5} size={22}/>
                <Text className="overflow-hidden truncate text-xs text-gray-500">{address}</Text>
              </View>

          </View>
          <Text className="text-gray-500 mt-2 pb-4">{short_description}</Text>
        </View>
        <TouchableOpacity 
    onPress={()=> navigation.navigate("Allergy")}
    className=" flex-row items-center space-x-2 p-4 border-y border-gray-300">
          <QuestionMarkCircleIcon color="#FBB52D" opacity={0.5} size={22}/>
          <Text className="pl-2 flex-1 text-md font-bold">Have food allergy?</Text>
          <ChevronRightIcon color="#FFC429"/>
        </TouchableOpacity>
      </View>
      <View className="pb-36">
        <Text className="px-4 pt-6 mb-3 font-bold text-xl">Menu</Text>
        { /* DishRow */}
        { dish.map(dish => (
            <DishRow
                key={dish._id}
                id={dish._id}
                name={dish.name}
                image={dish.image}
                price={dish.price}
                description={dish.short_description}
            />
        ))}
      </View>
    </ScrollView>
      </>
  )
}