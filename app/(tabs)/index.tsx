import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import {
	View,
	Image,
	ScrollView,
	ActivityIndicator,
	FlatList,
	Text,
} from "react-native";
import { useRouter } from "expo-router";
import useFetch from "@/sevices/useFetch";
import { fetchMovies } from "@/sevices/api";
import MovieCard from "@/components/MovieCard";
import { getTrendingMovies } from "@/sevices/appwrite";
import TrendingCard from "@/components/TrendingCard";

export default function Index() {
	const router = useRouter();

	const {
		data: trendingMovies,
		loading: trendingLoading,
		error: trendingError,
	} = useFetch(getTrendingMovies);

	const {
		data: movies,
		loading: moviesLoading,
		error: moviesError,
	} = useFetch(() => fetchMovies({ query: "" }));

	return (
		<View className="flex-1 bg-primary">
			<Image source={images.bg} className="absolute w-full z-0 " />
			<ScrollView
				className="flex-1 px-5"
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
			>
				<Image source={icons.logo} className="w-12 mb-5 mx-auto h-10 mt-20 " />

				{moviesLoading || trendingLoading ? (
					<ActivityIndicator
						className="mt-10 self-center"
						size="large"
						color="#0000ff"
					/>
				) : moviesError || trendingError ? (
					<Text>Error: {moviesError?.message || trendingError?.message}</Text>
				) : (
					<View className="flex-1 mt-5">
						<SearchBar
							onPress={() => router.push("/search")}
							placeholder="Search for film now guy"
						/>

						{trendingMovies && (
							<View className="mb-3 mt-5 font-bold text-white text-lg">
								Trending Movies
							</View>
						)}

						<>
							<FlatList
								horizontal
								showsHorizontalScrollIndicator={false}
								ItemSeparatorComponent={() => <View className="w-4" />}
								className="mb-4 mt-3"
								data={trendingMovies}
								renderItem={({ item, index }) => (
									<TrendingCard movie={item} index={index} />
								)}
								keyExtractor={(item) => item.movie_id.toString()}
							/>

							<Text className="text-lg font-bold mt-5 mb-3 text-white">
								Latest Movies
							</Text>

							<FlatList
								data={movies}
								renderItem={({ item }) => <MovieCard {...item} />}
								keyExtractor={(item) => item.id.toString()}
								numColumns={3}
								columnWrapperStyle={{
									justifyContent: "flex-start",
									gap: 20,
									paddingRight: 5,
									marginBottom: 10,
								}}
								className="mt-2 pb-32"
								scrollEnabled={false}
							/>
						</>
					</View>
				)}
			</ScrollView>
		</View>
	);
}
