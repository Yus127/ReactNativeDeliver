import {View, Text, TouchableOpacity, Image} from 'react-native'
import React, {useState} from 'react'
import { urlFor } from "../sanity";
import {MinusCircleIcon, PlusCircleIcon} from "react-native-heroicons/solid";
import {useDispatch, useSelector} from "react-redux";
import {addToBasket, removeFromBasket, selectBasketItems, selectBasketItemsWithId} from "../basketSlice";

export default function DishRow( {id, name, description, price,image} ) {
    const [isPressed, setIsPressed] = useState(false);
    const dispatch = useDispatch();
    const items = useSelector((state) =>selectBasketItemsWithId(state,id));

    const addItemToBasket = () => {
        dispatch(addToBasket({id, name, description, price, image}));
    }
    const removeItemFromBasket= () => {
        if(!items.length>0){
            return;
        }
        dispatch(removeFromBasket({id}));
    }
  return (
      <>
    <TouchableOpacity
        onPress={()=> setIsPressed(!isPressed)}
        className="bg-amber-50 border p-4 border-gray-200">
        <View className="flex-row">
        <View className="flex-1 pr-2">
            <Text className="text-lg mb-1">{name}</Text>
            <Text className="text-gray-400">{description}</Text>
            <Text className="text-gray-400 mt-2">$ {price}</Text>
        </View>
        <View>
            <Image source={{
                uri: urlFor(image).url()
            }}
                   style={{
                       borderWidth:1,
                       borderColor: "#F3F3F3"
                   }}
            className="h-20 w-20 bg-gray-300 p-4"/>
        </View>
        </View>
</TouchableOpacity>
          {isPressed && (
              <View className="bg-amber-50 px-4">
                  <View className="flex-row items-center space-x-2 pb-3">
                      <TouchableOpacity>
                          <MinusCircleIcon
                              onPress={removeItemFromBasket}
                              color={items.length > 0 ? "#FFC429" : "gray"}
                              //color="#FFC429"
                          size={40}/>

                      </TouchableOpacity>
                      <Text>{items.length}</Text>
                      <TouchableOpacity>
                          <PlusCircleIcon
                              onPress={addItemToBasket}
                              color= "#FFC429"
                              size={40}/>
                      </TouchableOpacity>
                  </View>
              </View>
          )}
      </>
  )
}