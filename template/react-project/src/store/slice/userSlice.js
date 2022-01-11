import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userName: "",
    userRole: "",
    userId: "",
    authority: [],
  },
  reducers: {
    setUserInfo(state, actions) {
      const { userName, userRole, id: userId } = actions.payload;
      state.userName = userName;
      state.userRole = userRole;
      state.userId = userId;
      switch (userRole) {
        case 0:
          state.authority = ["cats", "cats.catsList", "testPage"];
          break;
        case 1:
          state.authority = [];
          break;
        default:
          state.authority = [];
          break;
      }
    },
  },
});

export const { setUserInfo } = userSlice.actions;

export default userSlice.reducer;
