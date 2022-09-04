import {View, Text, TouchableOpacity, SafeAreaView, ScrollView} from 'react-native'
import React, {useEffect, useState} from 'react'
import {useNavigation, useRoute} from "@react-navigation/native";
import {ArrowLeftIcon} from "react-native-heroicons/solid";
import RestaurantCards from "../components/RestaurantCards";
import SanityClient from '../sanity'


export default function CategoryScreen() {
    const navigation = useNavigation();
    const [restaurantes, setRestaurantes] = useState([]);
    useEffect(()=>{
        SanityClient.fetch(
            `*[_type == 'restaurant'] {
            ...,
            dish[]->,
            type->{name}
          }`
        ).then((data) => {
            setRestaurantes(data);
        });
    }, [])

    const{
        params: {
            title,
        }
    } = useRoute();

    return (

        <SafeAreaView className="mt-5 flex-1 bg-amber-50">
        <View className="relative">
        <View className="p-2 borde-b border-[#FFC429] bg-amber-50 shadow-xs">


            <View className="flex-box">

                <Text className="text-lg font-bold text-center">Category</Text>
                <Text className="text-center text-gray-400"> {title}</Text>
            </View>
            <TouchableOpacity
                onPress={navigation.goBack}
                className="absolute top-2 left-3 p-2 bg-opacity-100 rounded-full">
                <ArrowLeftIcon size={20} color="#FFC429"/>
            </TouchableOpacity>
        </View>

            <ScrollView

                className="pt-4 bg-gray-100 flex-1"
                contentContainerStyle={{
                    paddingBottom: 450,
                }}>
                <View className="h-56 grid grid-cols-1 items-center content-start"
                >

                {/*restaurant cards*/}

                {restaurantes?.map((restaurant) =>(
                    restaurant.type?.name == title ?
                    <View className="py-6">

                    <RestaurantCards
                        key={restaurant._id}
                        id={restaurant._id}
                        imgUrl= {restaurant.image}
                        title={restaurant.name}
                        rating={restaurant.rating}
                        genre={restaurant.type?.name}
                        address={restaurant.address}
                        short_description={restaurant.short_description}
                        dish={restaurant.dish}
                        long={restaurant.long}
                        lat={restaurant.lat}
                    />
                    </View>
                    :null

                ))}
                </View>
            </ScrollView>




        </View>
        </SafeAreaView>
  )
}