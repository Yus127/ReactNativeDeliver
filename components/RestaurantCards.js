import { View, Text, Touchable, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { LocationMarkerIcon, StarIcon } from 'react-native-heroicons/solid'

import { urlFor } from '../sanity'
import { useNavigation } from '@react-navigation/native'

export default function RestaurantCards({
    id, imgUrl, title, rating, genre, address, short_description, dish, long, lat, }
) {
    const navigation = useNavigation();
  return (
    <TouchableOpacity 
    onPress={()=>{
        navigation.navigate('Restaurant', {
            id,
        imgUrl,
        title, 
        rating, 
        genre, 
        address, 
        short_description, 
        dish,
        long, 
        lat,     }   )
    }}
    
    className="bg-white mr-3 shadow w-72">
        <Image
        source={{
            uri: urlFor(imgUrl).url(),
        }}
        className='h-36 w-72 rounded-sm'/>
        <View className="px-3 pb-4 ">
            <Text className="font-bold text-lg pt-2">{title}</Text>  
            <View className="flex-row items-center space-x-1"> 
            <StarIcon color="#FFC429" opacity={0.5} size={22}/>
            <Text className="text-xs text-amber-400">
                <Text className="text-amber-400">{rating} · </Text> {genre}
            </Text>
            </View>
            <View className="flex-row items-center space-x-1">
                <LocationMarkerIcon color="#FFC429" opacity={0.4} size={22}/>
                <Text className="overflow-hidden truncate text-xs text-gray-500">Nearby · {address}</Text>
            </View>
        </View> 

</TouchableOpacity>
    
  )
}