import { createSlice } from "@reduxjs/toolkit";

const song = createSlice({
  name: "song",
  initialState: {
    song: "",
    auto: true,
    name: "",
    singer: "",
    imgSrc: "",
    index: "",
    source: "",
  },
  reducers: {
    setCurrentSong: (state, action) => {
      state.song = action.payload.song;
      state.name = action.payload.name;
      state.imgSrc = action.payload.imgSrc;
      state.singer = action.payload.singer;

      if (action.payload?.index || action.payload?.source) {
        state.index = action.payload.index;
        state.source = action.payload.source;
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

export default song.reducer;
