import { createSlice } from "@reduxjs/toolkit";

const musicSlice = createSlice({
  name: "music",
  initialState: {
    data: null,
  },
  reducers: {
    setMusicData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const {setMusicData} = musicSlice.actions;
export const selectMusicData = (state) => state.music.data;

export default musicSlice.reducer;
