import { createSlice } from "@reduxjs/toolkit";

interface user {
  userName: string;
  userRole: string;
  userId: string;
  authority: string[];
}

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userName: "",
    userRole: "",
    userId: "",
    authority: [],
  } as user,
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
export type { user };

export const { setUserInfo } = userSlice.actions;

export default userSlice.reducer;
