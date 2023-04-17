import { configureStore, createSlice } from "@reduxjs/toolkit";

import user, { increase } from "./store/userSlice.js";

// 코드가 길면 파일분할을 한다 , userSlice.js 확인

let userCart = createSlice({
  name: "userCart",
  initialState: [
    { id: 0, name: "White and Black", count: 2 },
    { id: 2, name: "Grey Yordan", count: 1 },
    // { id: 1, name: "Red Knit", count: 1 },
  ],
  reducers: {
    addCount(state, action) {
      // state[action.payload].count++;
      let 번호 = state.findIndex(a => {
        return a.id === action.payload;
      });
      state[번호].count++;
    },
    addItem(state, action) {
      state.push(action.payload);
    },
  },
});

export let { addCount, addItem } = userCart.actions;

let stock = createSlice({
  name: "stock",
  initialState: [10, 11, 12],
});

export default configureStore({
  reducer: {
    // 변수작명: user.reducer,
    user: user.reducer,
    stock: stock.reducer,
    userCart: userCart.reducer,
  },
});
