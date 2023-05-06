import { createSlice } from "@reduxjs/toolkit";

const song = createSlice({
  name: "song",
  initialState: {
    song: "",
    auto: true,
    name: "",
    imgSrc: "",
  },
  reducers: {
    setCurrentSong: (state, action) => {
      state.song = action.payload.song;
      state.name = action.payload.name;
      state.imgSrc = action.payload.imgSrc;
    },
  },
});

export const { setCurrentSong } = song.actions;

export default song.reducer;
