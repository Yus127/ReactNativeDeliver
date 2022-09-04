import { Text, TouchableOpacity, View, Image } from 'react-native'
import React, { Component } from 'react'
import {useNavigation} from "@react-navigation/native";

export default function CategoryCards({imgUrl, title}) {
    const navigation = useNavigation();

    return (
      <TouchableOpacity className='relative  mr-2'
                        onPress={()=>{
                            navigation.navigate('CategoryScreen', {
                                title,    }   )
                        }}
      >
        <Image source={{
            uri:imgUrl
        }}
        className='h-20 w-20 rounded'
        />
        <Text className="absolute bottom-1 left-1 text-white font-bold">{title}</Text>
      </TouchableOpacity>
    )
  
}