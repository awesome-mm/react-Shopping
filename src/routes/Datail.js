/* eslint eqeqeq: 0 */
import { useParams } from "react-router-dom";
import styled from "styled-components";
import React, { useEffect, useState } from "react";

// import { useParams } from "react-router-dom";

function Datail(props) {
  let { id } = useParams();
  // find 조건에 맞는 id 한개를 리턴하여 찾은상품에 넣어준다
  // 여러개일 경우 filter를 사용하자

  // styled-component
  let YellowBtn = styled.button`
    background: ${props => props.bg};
    color: ${props => (props.bg == "blue" ? "white" : "black")};
    padding: 10px;
  `;

  let Box = styled.div`
    background: Grey;
    padding: 10px;
  `;

  let 찾은상품 = props.shoes.find(function (x) {
    return x.id == id;
  });

  // class 방식 라이프사이킁
  // class Detail2 extends React.Component {
  //   componenttDidMount() {}
  //   componenttDidUpdate() {}
  //   componenttDidUnMount() {}
  // }

  let [count, setCount] = useState(0);

  // useEffect란 이름이 붙은 이유
  // 함수의 핵심기능과 상관없는 부가기능이다 side effect
  //
  // useEffect(() => {},); mount , 재랜더링마다 코드 실행
  // useEffect(() => {},[]); mount 1회만
  // useEffect(() => {},[sale]); update
  // clean up function , useEffect가 동작하기 전에 실행됨 (기존 타이머는 제거해주세요.) < unmount될때 실행됨
  // useEffect(() => {
  // return ()=>{}
  // },[sale]);

  const [sale, setSale] = useState(true);
  const [text, setText] = useState("");

  useEffect(() => {
    for (var i = 0; i < 1000; i++) {
      console.log(`i`);
    }
  });

  // 서버 데이터 요청했을시 2초 소요
  useEffect(() => {
    let zzz = setTimeout(() => {
      setSale(false);
    }, 2000);
    return () => {
      clearTimeout(zzz);
    };
  }, [sale]);

  useEffect(() => {
    if (isNaN(text) == false) {
      alert("문자만 입력하셈");
    }
  }, [text]);

  return (
    <div className="container">
      {count}
      <button
        onClick={() => {
          setCount(count + 1);
        }}>
        카운트
      </button>
      {sale == true ? (
        <div className="alert alert-warning">
          {" "}
          {sale} = 2초 이내 구매시 할인
        </div>
      ) : null}

      <Box>
        <YellowBtn bg="blue">버튼</YellowBtn>
        <YellowBtn bg="orange">버튼</YellowBtn>
      </Box>

      <div className="row">
        <div className="col-md-6">
          <img
            src={
              "https://codingapple1.github.io/shop/shoes" +
              (찾은상품.id + 1) +
              ".jpg"
            }
            alt=""
            width="100%"
          />
          <input
            type="text"
            id="text"
            onChange={e => {
              setText(e.target.value);
            }}></input>
        </div>
        <div className="col-md-6 mt-4">
          <h4 className="pt-5">{찾은상품.title}</h4>
          <p>{찾은상품.content}</p>
          <p>{찾은상품.price}</p>
          <button className="btn btn-danger">주문하기</button>
        </div>
      </div>
    </div>
  );
}
export default Datail;
