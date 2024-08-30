export interface Music {
  id: string;
  title: string;
  artist: string;
  album: string;
  genre?: string;
  file: string;
}

export interface FetchMusicsResponse {
  musics: Music[];
}
