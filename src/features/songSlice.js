import { createSlice } from "@reduxjs/toolkit";

const song = createSlice({
  name: "song",
  initialState: {
    song: "",
    auto: true,
    name: "",
    singer: "",
    imgSrc: "",
  },
  reducers: {
    setCurrentSong: (state, action) => {
      state.song = action.payload.song;
      state.name = action.payload.name;
      state.imgSrc = action.payload.imgSrc;
      state.singer = action.payload.singer;
    },
  },
});

export const { setCurrentSong } = song.actions;

export const currentSongName = (state) => state.song.name;
export const currentSingerName = (state) => state.song.singer;
export const currentImg = (state) => state.song.imgSrc;

export default song.reducer;
