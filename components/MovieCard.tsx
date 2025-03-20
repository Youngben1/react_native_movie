import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { icons } from "@/constants/icons";

const MovieCard = ({
	id,
	poster_path,
	title,
	vote_average,
	release_date,
}: Movie) => {
	return (
		<View>
			<Link href={`/movies/${id}`} asChild>
				<TouchableOpacity className="w-[30%]">
					<Image
						source={{
							uri: poster_path
								? `https://image.tmdb.org/t/p/w500${poster_path}`
								: "https://placehold.co/600x400/1a1a1a/FFFFFF.png",
						}}
						className="w-full h-52 rounded-lg"
						resizeMode="cover"
					/>

                    <Text className="text-sm font-bold mt-2 text-white" numberOfLines={1}>{title}</Text>

                    <View className="flex-row gap-x-1 justify-start items-center">
                        <Image source={icons.star} className="size-4" />
                        <Text className="text-white text-xs font-bold uppercase">{Math.round(vote_average /2)}</Text>
                    </View>
                    <View className="flex-row items-center justify-between">
                        <Text className="mt-1 font-medium text-xs text-light-300">{release_date?.split('-')[0]}</Text>
                        <Text className="uppercase text-light-300 font-medium text-xs"></Text>
                    </View>
				</TouchableOpacity>
			</Link>
		</View>
	);
};

export default MovieCard;
