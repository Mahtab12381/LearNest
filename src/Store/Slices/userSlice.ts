import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  email: string;
  role: string;
  id: string;
}

const initialState: UserState = {
  email: "",
  role: "",
  id: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<{ email: string }>) => {
      state.email = action.payload.email;
    },
    deleteUser: (state) => {
      state.role = "logged out";
    },
    addRole: (state, action: PayloadAction<string>) => {
      state.role = action.payload;
    },
    addId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    }
  },
});

export const { addUser, deleteUser, addRole ,addId } = userSlice.actions;

export default userSlice.reducer;
