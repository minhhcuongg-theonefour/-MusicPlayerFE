import { createSlice } from "@reduxjs/toolkit";

const song = createSlice({
  name: "song",
  initialState: {
    id: "",
    song: "",
    auto: true,
    name: "",
    singer: "",
    imgSrc: "",
    index: "",
    source: "",
    playlist_id: "",
    data_length: "",
  },
  reducers: {
    setCurrentSong: (state, action) => {
      state.song = action.payload.song;
      state.name = action.payload.name;
      state.imgSrc = action.payload.imgSrc;
      state.singer = action.payload.singer;
      state.id = action.payload.id;

      if (
        action.payload?.index ||
        action.payload?.source ||
        action.payload?.data_length ||
        action.payload?.playlist_id
      ) {
        state.index = action.payload.index;
        state.source = action.payload.source;
        state.data_length = action.payload.data_length;
        state.playlist_id = action.payload.playlist_id;
      }
    },
    setCurrentIndexSong: (state, action) => {
      state.index = action.payload.index;
    },
  },
});

export const { setCurrentSong, setCurrentIndexSong } = song.actions;

export const currentSongName = (state) => state.song?.name;
export const currentSingerName = (state) => state.song?.singer;
export const currentImg = (state) => state.song?.imgSrc;
export const currentSource = (state) => state.song?.source;
export const currentIndex = (state) => state.song?.index;
export const currentLength = (state) => state.song?.data_length;
export const currentPlaylistId = (state) => state.song?.playlist_id;
export const currentSongId = (state) => state.song?.id;

export default song.reducer;
