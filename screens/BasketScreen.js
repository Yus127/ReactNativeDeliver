import {View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView} from 'react-native'
import React, {useMemo, useState} from 'react'
import {useNavigation} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import {selectRestaurant} from "../features/restaurantSlice";
import { addItemToBasket, removeFromBasket, selectBasketItems, selectBasketTotal} from "../basketSlice";
import {MinusCircleIcon, PlusCircleIcon, XCircleIcon} from "react-native-heroicons/solid";
import {urlFor} from "../sanity";

export default function BasketScreen() {
    const navigation = useNavigation();
    const restaurants = useSelector(selectRestaurant);
    const items = useSelector(selectBasketItems);
    const [groupItemsInBasket, setGroupItemsInBasket] = useState([]);
    const dispatch = useDispatch();
    const basketTotal = useSelector(selectBasketTotal);

    useMemo(() => {
        //results, item
        const groupItems = items.reduce((results, item) => {
            (results[item.id] = results[item.id] || []).push(item);
            return results;
        }, {})
        setGroupItemsInBasket(groupItems);
    }, [items]);



    return (
        <SafeAreaView className="mt-5 flex-1 bg-white">
            <View className="flex-1 bg-gray-100">
                <View className="p-5 borde-b border-[#FFC429] bg-white shadow-xs">
                    <View>
                        <Text className="text-lg font-bold text-center">Basket</Text>
                        <Text className="text-center text-gray-400"> {restaurants.title}</Text>
                    </View>
                    <TouchableOpacity
                    onPress={navigation.goBack}
                    className="rounded-full bg-gray-100 absolute top-3 right-5">
                        <XCircleIcon color="#FFC429" height={50} width={50}/>
                    </TouchableOpacity>
                </View>
                <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">
                    <Image source={{
                        uri: "https://links.papareact.com/wru"
                    }}
                           className="h-7 w-7 bg-gray-300 p-4 rounded-full"/>
                    <Text className="flex-1">Deliver in 50-75 min</Text>
                    <TouchableOpacity>
                    <Text className="text-[#FFC429]"> Change</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView className="divide-y divide-gray-200">
                    {Object.entries(groupItemsInBasket).map(([key,items])=>(
                        <View
                            key={key}
                        className="flex-row items-center space-x-3 bg-white py-2 px-5">
                            <Text>{items.length}X</Text>
                            <Image
                                source={{uri: urlFor(items[0]?.image).url()}}
                            className="h-12 w-12 rounded-full"/>
                            <Text className="flex-1">{items[0]?.name}</Text>
                            <TouchableOpacity>
                                <MinusCircleIcon

                                    onPress={()=> dispatch(removeFromBasket({id:key}))}
                                    color= "#FFC429"
                                    size={40}/>

                            </TouchableOpacity>
                            <Text className="text-gray-600"> $ {items[0]?.price}</Text>
                            <TouchableOpacity>
                                <PlusCircleIcon

                                    onPress={()=> dispatch(addItemToBasket({id:key}))}
                                    color= "#FFC429"
                                    size={40}/>

                            </TouchableOpacity>
                        </View>
                    ))}

                </ScrollView>
                <View className="p-5 bg-white mt-5 space-y-4">
                    <View className="flex-row justify-between">
                        <Text className="text-gray-400">Subtotal</Text>
                        <Text className="text-gray-400">$ {basketTotal}</Text>
                    </View>

                    <View className="flex-row justify-between">
                        <Text className="text-gray-400">Delivery Fee</Text>
                        <Text className="text-gray-400">$ 75</Text>
                </View>
                    <View className="flex-row justify-between">
                        <Text className="text-black">Order Total</Text>
                        <Text className="font-extrabold">$ {basketTotal +75}</Text>
                </View>
                    <TouchableOpacity disabled={items.length == 0}
                        onPress={()=> navigation.navigate("PreparingOrderScreen")}
                        className="rounded-lg bg-[#FFC429] px-4">
                        <Text className="text-center text-white text-lg font-bold"> Place Order</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </SafeAreaView>
    )
}