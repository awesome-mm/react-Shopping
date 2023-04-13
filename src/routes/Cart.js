import { useState } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { changeName, increase } from "./../store/userSlice";
import { addCount } from "./../store";
function Cart() {
  // redux store를 가지고오는 함수
  let state = useSelector(state => {
    return state;
    // return state.stock;
    // return state.user;
  });

  let dispatch = useDispatch();

  // 사이즈가 커지면 좋은방식이다 하지만 귀찮다
  // dispatch는 메세지를 보내다라는 뜻이고 실제 실행은 store.js에서 실행해서 state를 변경한다

  // console.log(a);
  // console.log(a.user);
  // console.log(a.stock);s
  // console.log(a.userCart);

  // let [cart] = useState(state.userCart);

  return (
    <div>
      {state.user.name}의 장바구니 나이 : {state.user.age}
      <button
        onClick={() => {
          dispatch(increase(10));
          dispatch(changeName());
        }}>
        나이증가
      </button>
      {/* {state.userCart} */}
      <Table>
        <thead>
          <tr>
            <th>Number</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
          </tr>
        </thead>
        <tbody>
          {state.userCart.map((userCartRow, i) => {
            return (
              <tr>
                <td>{userCartRow.id}</td>
                <td>{userCartRow.name}</td>
                <td>{userCartRow.count}</td>
                <td>
                  <button
                    onClick={() => {
                      dispatch(addCount(state.userCart[i].id));
                    }}>
                    수량증가
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default Cart;