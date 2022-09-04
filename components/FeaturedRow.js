import { View, Text, ScrollView } from 'react-native'
import React, {useEffect} from 'react'
import { ArrowRightIcon } from 'react-native-heroicons/solid'
import RestaurantCards from './RestaurantCards'
import SanityClient from '../sanity'
import { useState } from 'react'

export default function FeaturedRow({id, title, description}) {
  const [restaurant, setRestaurant] = useState([]);
  useEffect(()=>{
    SanityClient.fetch(

        `*[_type == 'featured' && _id == $id] {
            ...,
            restaurant[]->{
              ...,
              dish[]->,
              type->{
                name
              }
            },
          }[0]
          `, {id}

    ).then((data) => {
      setRestaurant(data?.restaurant)
    });
}, [])


  return (
    <View>
      <View className="mt-4 flex-row items-center justify-between px-4">
        <Text className="font-bold text-lg">{title}</Text>
        <ArrowRightIcon color="#FFC429"/>
      </View>
      <Text className='font-size-xs text-gray-500 px-4'>{description}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="pt-4"
        contentContainerStyle={{
            paddingHorizontal: 15,
        }}>
            {/*restaurant cards */}
            {restaurant?.map(restaurant =>(
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

            ))}
     
      </ScrollView>

    </View>
  )
}