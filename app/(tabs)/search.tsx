import { View, Text, Image, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react';
import { images } from '@/constants/images';
import useFetch from '@/sevices/useFetch';
import MovieCard from '@/components/MovieCard';
import { fetchMovies } from '@/sevices/api';
import { icons } from '@/constants/icons';
import SearchBar from '@/components/SearchBar';
import { updateSearchCount } from '@/sevices/appwrite';

const Search = () => {
 const [searchQuery, setSearchQuery] = useState('');

  const {
		data: movies,
		loading,
		error,
    refetch: loadMovies,
    reset,
	} = useFetch(() => fetchMovies({ query: searchQuery }), false);

  useEffect(() => {
    const timeoutId = setTimeout (async () => {
      if(searchQuery.trim()) {
        await loadMovies();
      } else {
        reset()
      }
    }, 500);

    return () =>clearTimeout(timeoutId);
  }, [searchQuery]);

  useEffect(() => {
    if(movies?.length > 0 && movies?.[0]) {
    updateSearchCount(searchQuery, movies[0]);
    }
  }, [movies]);


  return (
    <View>
      <Image source={images.bg} className='flex-1 absolute w-full z-0' resizeMode='cover' />
      <FlatList data={movies} renderItem={({ item }) => <MovieCard {...item} />} keyExtractor={(item) => item.id.toString()} className='px-5' numColumns={3}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View className='flex-row justify-center mt-20 w-full items-center'>
              <Image source={icons.logo} className='w-12 h-10' />
            </View>
            <View className='my-5'>
              <SearchBar placeholder='Search now Olodo' value={searchQuery} onChangeText={(text: string) =>setSearchQuery(text)} />
            </View>

            {loading && (
              <ActivityIndicator size='large' color="#0000ff" className='my-3' />
            )}

            {error && (
              <Text className='px-5 my-3 text-red-500'>Error: {error.message}</Text>
            )}

            {!loading && !error && searchQuery.trim() && movies?.length > 0 && (
              <Text className='text-xl text-white font-bold'>
                Search Results for{''}
                <Text className='text-accent'>{searchQuery}</Text>
              </Text>
            )}

          </>
        }

        ListEmptyComponent={
          !loading && !error ? (
            <View className='mt-10 px-5'>
              <Text className='text-center text-gray-600'>{searchQuery.trim() ? "No movies found" : "Search with sense"}</Text>
            </View>
          ) : null
        }
        />
    </View>
  )
}

export default Search