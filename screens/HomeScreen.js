import {View, Text, Image, SafeAreaView, TextInput, ScrollView} from 'react-native'
import React, {useLayoutEffect, useEffect, useState} from 'react'
import {useNavigation} from "@react-navigation/native";
import {UserIcon, ChevronDownIcon, SearchIcon, AdjustmentsIcon} from "react-native-heroicons/solid";
import Categories from '../components/Categories';
import CategoryCards from '../components/CategoryCards';
import FeaturedRow from '../components/FeaturedRow';
//import { padding } from '@mui/system';
import SanityClient from '../sanity';

export default function HomeScreen() {
    const navigation = useNavigation();
    const [featuredCategories, setFeaturedCategories] = useState([]);

    // useNavigation es un hook
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []) // los corchetes son el segundo parametro del hoo llamados dependencias

    useEffect(()=>{
        SanityClient.fetch(

            `*[_type == 'featured'] {
                ...,
                restaurant[]->{
                  ...,
                  dish[]->
                }
              }`

        ).then((data) => {
            setFeaturedCategories(data)
        });
    }, [])
    return (
        <SafeAreaView className="bg-white pt-5">
            <View>

                <View className="flex-row pb-3 items-center mx-4 space-x-2">
                    {/*Header*/}
                    <Image source={{
                        uri: 'http://links.papareact.com/wru'
                    }}
                           className='h-7 w-7 bg-gray-300 p-4 rounded-full'
                    />
                    {/*todo lo de adentro se hace usable */}
                    <View className='flex-1'>

                        <Text className='font-bold text-gray-400 text-xs'>
                            Deliver Now</Text>
                        <Text className='font-bold text-xl'>
                            Current location
                            <ChevronDownIcon size={20} color='#FFC429'/>
                        </Text>
                    </View>
                    <UserIcon
                        onPress={()=>{navigation.navigate("Profile")}}
                        size={35} color='#FFC429'/>

                </View>
                {/*Search*/}
                <View className="flex-row items-center space-x-2 pb-2 mx-4">
                    <View className="flex-row space-x-2 flex-1 bg-amber-50 p-3">
                        {/*dejas espacio de 2 en el eje de las x p= padding*/}
                        <SearchIcon size={35} color={"#FBB52D"}/>
                        <TextInput placeholder="Restaurants and cuisines"
                                   keyboardType="default"/>
                    </View>
                    <AdjustmentsIcon color='#FFC429'/>
                </View>
            </View>
            {/*body */}
            <ScrollView className="bg-gray-100 flex-1" contentContainerStyle={{
                paddingBottom:100,
            }}>

                {/*categories*/}
                <Categories/>
                
                {/*feature rows*/}
                {/*featured */}
                {featuredCategories?.map(category => (
                      <FeaturedRow 
                      key={category._id}
                      id= {category._id}
                      title={category.name} 
                      description={category.short_description}  />
                ))}


            </ScrollView>

        </SafeAreaView>

    )
}