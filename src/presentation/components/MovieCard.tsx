import { Movie } from "@/src/core/entities/movies-interface";
import { Image, StyleSheet, Text, View } from "react-native";

export default function MovieCard({ movie }: { movie: Movie }) {
  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <View style={styles.card}>
      <Image
        source={{ uri: imageUrl }}
        style={styles.poster}
        resizeMode="cover"
      />
      <Text style={styles.title}>{movie.title}</Text>
      <Text style={styles.subtitle}>{movie.overview}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#fff",
    marginBottom: 12,
  },
  poster: {
    width: "100%",
    height: 300, // Recuerda que en React Native las imágenes externas necesitan ancho y alto obligatorios
  },
  title: {
    padding: 8,
    fontSize: 16,
    fontWeight: "bold",
  },
  subtitle: {
    padding: 8,
    fontSize: 14,
    color: "gray",
  },
});
