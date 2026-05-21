import { movieEndpoints } from "@/src/core/apis/movies";
import { Movie } from "@/src/core/entities/movies-interface";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MovieCard from "../../components/MovieCard";

export default function HomeScreen() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMovies = async (page: number = 1) => {
    try {
      setLoading(true);

      const response = await movieEndpoints.getNowPlaying({
        page,
      });

      setMovies(response);
    } catch (error) {
      console.error("Error al traer películas con parámetros:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Películas Populares</Text>

      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.scrollContainer}
        renderItem={({ item }) => (
          <View style={styles.movieCard}>
            <MovieCard movie={item} />
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "white",
  },
  movieCard: {
    padding: 16,
    backgroundColor: "#f9f9f9",
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#eee",
  },
  movieTitle: {
    fontSize: 16,
  },
});
