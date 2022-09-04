import { ScrollView, Text, View } from 'react-native'
import React, { Component } from 'react'
import CategoryCards from './CategoryCards'
import { useState, useEffect } from 'react'
import { urlFor } from '../sanity';
import SanityClient from '../sanity'
import { useNavigation } from '@react-navigation/native';

export default function Categories() {
  const [categories, setCategories] = useState([]);


    useEffect(()=>{
    SanityClient.fetch(
        `*[_type == 'categories'] `

    ).then((data) => {
      setCategories(data);
    });
}, [])

  
    return (
      <ScrollView
      contentContainerStyle={{paddingHorizontal:15, paddingTop:10,}}
      horizontal
      showsHorizontalScrollIndicator={false}>
        {/*CategoryCard */}

          {categories?.map((categories)=> (
            <CategoryCards 
            key={categories.id}
            imgUrl={urlFor(categories.image).width(200).url()}

            title={categories.name}
            />
          ))}

      </ScrollView>

    )
  
}
//rnf