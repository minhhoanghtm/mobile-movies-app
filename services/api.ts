export const TMDB_CONFIG = {
  BASE_URL: process.env.EXPO_PUBLIC_MOVIE_API_BASE_URL || "https://api.tmdb.org/3",
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
  },
};

const assertTMDBToken = () => {
  if (!TMDB_CONFIG.API_KEY) {
    throw new Error(
      "Missing EXPO_PUBLIC_MOVIE_API_KEY. Restart Expo after updating .env.",
    );
  }
};

const tmdbFetch = async (endpoint: string) => {
  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: TMDB_CONFIG.headers,
    });

    if (!response.ok) {
      const body = await response.text();
      throw new Error(
        `TMDB request failed (${response.status}): ${body || response.statusText}`,
      );
    }

    return response.json();
  } catch (error) {
    if (error instanceof TypeError) {
      const domain = TMDB_CONFIG.BASE_URL.replace(/^https?:\/\//, "").split("/")[0];
      throw new Error(
        `Network request failed while calling TMDB. Check device internet access or whether ${domain} is reachable from this network.`,
      );
    }

    throw error;
  }
};

export const fetchMovies = async ({ query }: { query: string }) => {
  assertTMDBToken();

  const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

  const data = await tmdbFetch(endpoint);
  return data.results;
};

export const fetchMovieDetails = async (
  movieId: string,
): Promise<MovieDetails> => {
  assertTMDBToken();
  return tmdbFetch(`${TMDB_CONFIG.BASE_URL}/movie/${movieId}`);
};
