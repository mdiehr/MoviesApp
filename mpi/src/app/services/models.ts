// API Spec from https://github.com/<removed>/movies-api/tree/main

export interface AuthResponse {
  token: string;
}

export interface HealthcheckResponse {
  contentful: boolean;
}

export interface MovieItem {
  id: string;
  title: string;
  posterUrl?: string;
  rating?: string;
}

export interface MoviesResponse {
  data: MovieItem[];
  totalPages: number;
}

export interface MovieIdDetail {
  id: string;
}

export interface GenreItem {
  id: string;
  title: string;
  movies?: MovieIdDetail[];
}

export interface GenresResponse {
  data: GenreItem[];
  totalPages: number;
}

export interface MovieExtendedDetail {
  id: string;
  title: string;
  posterUrl?: string;
  rating?: string;
  summary: string;
  duration: string;
  directors: string[];
  mainActors: string[];
  datePublished: string;
  ratingValue: number;
  bestRating: number;
  worstRating: number;
  writers: string[];
  genres: GenreItem[];
}
