import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  token: "",
};

const usuarioSlice = createSlice({
  name: "usuario",
  initialState,
  reducers: {
    setUsuario: (state, action) => {
      state.token = action.payload.token;
    },
  },
});

export const { setUsuario } = usuarioSlice.actions;
export default usuarioSlice.reducer;
