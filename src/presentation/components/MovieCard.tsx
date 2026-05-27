import { Movie } from "@/src/core/entities/movies-interface";
import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const router = useRouter();
  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  const handlePress = () => {
    router.push(`/movie/${movie.id}`);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handlePress}
      style={styles.card}
    >
      <Image
        source={{ uri: imageUrl }}
        style={styles.poster}
        resizeMode="cover"
      />
      <Text style={styles.title}>{movie.title}</Text>
      <Text style={styles.subtitle}>{movie.overview}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  poster: {
    width: "100%",
    height: 350,
  },
  title: {
    padding: 12,
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    padding: 12,
    fontSize: 14,
    color: "#666",
  },
});
