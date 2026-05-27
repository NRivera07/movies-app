import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { movieApi } from "../../../config/api/movies";

interface MovieDetails {
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  genres: { id: number; name: string }[];
}

export default function MovieDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);

        const response = await movieApi.get(`/movie/${id}`);
        setMovie(response.data);
        setError(null);
      } catch (err) {
        console.error("Error al traer detalles de la película:", err);
        setError("No se pudieron cargar los detalles de la película.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#E50914" />
      </View>
    );
  }

  if (error || !movie) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>
          {error || "Película no encontrada"}
        </Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Regresar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const backdropUrl = `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`;
  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <ScrollView style={styles.container} bounces={false}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: backdropUrl || posterUrl }}
          style={styles.backdrop}
        />

        <TouchableOpacity
          style={styles.floatingBackButton}
          onPress={() => router.back()}
        >
          <Text style={styles.chevron}>←</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.headerRow}>
          <Image source={{ uri: posterUrl }} style={styles.miniPoster} />

          <View style={styles.titleContainer}>
            <Text style={styles.title}>{movie.title}</Text>
            <Text style={styles.releaseDate}>
              {" "}
              Año: {movie.release_date.split("-")[0]}
            </Text>
            <View style={styles.ratingBadge}>
              <Text style={styles.ratingText}>
                ⭐ {movie.vote_average.toFixed(1)}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.genresContainer}>
          {movie.genres.map((genre) => (
            <View key={genre.id} style={styles.genreBadge}>
              <Text style={styles.genreText}>{genre.name}</Text>
            </View>
          ))}
        </View>

        <Divider />

        <Text style={styles.sectionTitle}>Sinopsis</Text>
        <Text style={styles.overview}>
          {movie.overview || "No hay sinopsis disponible en español."}
        </Text>
      </View>
    </ScrollView>
  );
}

const Divider = () => <View style={styles.divider} />;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: 250,
  },
  backdrop: {
    width: "100%",
    height: "100%",
    opacity: 0.7,
  },
  floatingBackButton: {
    position: "absolute",
    top: 50,
    left: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  chevron: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  contentContainer: {
    padding: 20,
    marginTop: -40,
    backgroundColor: "#121212",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 20,
  },
  miniPoster: {
    width: 100,
    height: 150,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#121212",
    backgroundColor: "#222",
  },
  titleContainer: {
    flex: 1,
    marginLeft: 15,
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  releaseDate: {
    fontSize: 14,
    color: "#aaa",
    marginTop: 4,
  },
  ratingBadge: {
    backgroundColor: "#222",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: "flex-start",
    marginTop: 8,
  },
  ratingText: {
    color: "#FFD700",
    fontWeight: "bold",
    fontSize: 14,
  },
  genresContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 15,
  },
  genreBadge: {
    backgroundColor: "#2A2A2A",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  genreText: {
    color: "#fff",
    fontSize: 12,
  },
  divider: {
    height: 1,
    backgroundColor: "#2A2A2A",
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  overview: {
    fontSize: 15,
    color: "#ccc",
    lineHeight: 22,
  },
  errorText: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: "#E50914",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  backButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
