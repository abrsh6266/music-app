import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Music } from "../../utils";

interface MusicState {
  musics: Music[];
  loading: boolean;
  error: string | null;
}

const initialState: MusicState = {
  musics: [],
  loading: false,
  error: null,
};

const musicSlice = createSlice({
  name: "music",
  initialState,
  reducers: {
    // Fetching musics
    fetchMusicsRequest(state, action: PayloadAction<{ search?: string }>) {
      console.log(action.payload);
      state.loading = true;
      state.error = null;
    },
    fetchMusicsSuccess(state, action: PayloadAction<Music[]>) {
      state.loading = false;
      state.musics = action.payload;
    },
    fetchMusicsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // Creating music
    createMusicRequest(state, action) {
      console.log(action.payload);
      state.loading = true;
      state.error = null;
    },
    createMusicSuccess(state, action: PayloadAction<Music>) {
      state.loading = false;
      state.error = null;
      state.musics.push(action.payload); // Add the newly created music to the list
    },
    createMusicFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // Updating music
    updateMusicRequest(
      state,
      action: PayloadAction<{ id: string; data: Partial<Music> }>
    ) {
      console.log(action.payload);

      state.loading = true;
      state.error = null;
    },
    updateMusicSuccess(state, action: PayloadAction<Music>) {
      state.loading = false;
      state.error = null;
      const index = state.musics.findIndex(
        (music) => music.id === action.payload.id
      );
      if (index !== -1) {
        state.musics[index] = action.payload; // Update the existing music
      }
    },
    updateMusicFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    // Deleting music
    deleteMusicRequest(state, action: PayloadAction<string>) {
      console.log(action.payload);
      state.loading = true;
      state.error = null;
    },
    deleteMusicSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = null;
      state.musics = state.musics.filter(
        (music) => music.id !== action.payload
      ); // Remove the deleted music from the list
    },
    deleteMusicFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchMusicsRequest,
  fetchMusicsSuccess,
  fetchMusicsFailure,
  createMusicRequest,
  createMusicSuccess,
  createMusicFailure,
  updateMusicRequest,
  updateMusicSuccess,
  updateMusicFailure,
  deleteMusicRequest,
  deleteMusicSuccess,
  deleteMusicFailure,
} = musicSlice.actions;

export default musicSlice.reducer;
