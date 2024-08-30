import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Music } from '../../utils';

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
  name: 'music',
  initialState,
  reducers: {
    // Fetching musics
    fetchMusicsRequest(state) {
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
    createMusicRequest(state) {
      state.loading = true;
      state.error = null;
    },
    createMusicSuccess(state, action: PayloadAction<Music>) {
      state.loading = false;
      state.musics.push(action.payload); // Add the newly created music to the list
    },
    createMusicFailure(state, action: PayloadAction<string>) {
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
} = musicSlice.actions;

export default musicSlice.reducer;
