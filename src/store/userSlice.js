import { createSlice } from "@reduxjs/toolkit";

let user = createSlice({
  // name: "state이름",
  // initialState: "값",
  name: "user",
  initialState: { name: "kim", age: 20 },
  reducers: {
    //state 변경 함수 만드는 법
    //파라미터로 state들어가는 것은 user의 state 값이다
    // 문자만 있는 state변경할 떄
    // changeName(state) {
    // return "john kim" + state;
    // },
    // Object는 return 문을 안써도 됨
    // immer.js 가 자동으로 설치되면서 도움을 주는 것임
    changeName(state) {
      state.name = "park";
    },

    // increase(state) {
    //   state.age += 1;
    // },

    // payload는 화물 택배 운송이란 단어
    // 함수의 파라미터를 이용해서 같은함수로 다른 기능을 넣을 수 있음
    // Dispath = 메세지를 보낼때 , payload 화물을 실어보낸다는 뜻
    // actions이라고 파라미터를 저장하는 이유는 store에 state를 바꿀때 action이라고 한다
    increase(state, actions) {
      state.age += actions.payload;
    },
  },
});

// 함수를 빼는법
export let { changeName, increase } = user.actions;

export default user;
