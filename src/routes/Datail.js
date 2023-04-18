/* eslint eqeqeq: 0 */
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import React, { useContext, useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";

import { Context1 } from "./../App.js";

import { addItem } from "./../store";
import { useDispatch } from "react-redux";

function Datail(props) {
  let dispath = useDispatch();

  let { 재고 } = useContext(Context1);

  let { id } = useParams();
  let [tap, setTap] = useState(0);

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

  useEffect(() => {
    // 1.누가 detail 페이지 접속하면
    // 2. 상품 번호를 가지고 와서
    // 3. localStorage에 보관한다

    console.log(찾은상품);
    let 최근본상품 = localStorage.getItem("watched");
    최근본상품 = JSON.parse(최근본상품);
    최근본상품.push(찾은상품.id);
    localStorage.setItem("watched", JSON.stringify(최근본상품));

    localStorage.removeItem("data");
  }, [찾은상품]);

  // class 방식 라이프사이킁
  // class Detail2 extends React.Component {
  //   componenttDidMount() {}
  //   componenttDidUpdate() {}
  //   componenttDidUnMount() {}
  // }

  let [count, setCount] = useState(0);
  let [sale, setSale] = useState(true);
  let [text, setText] = useState("");
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

  // useEffect(() => {
  //   for (var i = 0; i < 1000; i++) {
  //     console.log(`i`);
  //   }
  // });

  // 서버 데이터 요청했을시 2초 소요
  useEffect(() => {
    let zzz = setTimeout(() => {
      setSale(false);
    }, 2000);
    return () => {
      clearTimeout(zzz);
    };
  }, [sale]);

  // useEffect(() => {
  //   if (isNaN(text) == false) {
  //     alert("문자만 입력하셈");
  //   }
  // }, [text]);

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
        <YellowBtn bg="blue">스타일드 컴포넌트 버튼</YellowBtn>
        <YellowBtn bg="orange">스타일드 컴포넌트 버튼</YellowBtn>
      </Box>
      <div>{재고}</div>
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
          <button
            className="btn btn-danger"
            onClick={() => {
              dispath(addItem({ id: 1, name: "Red Knit", count: 1 }));
            }}>
            주문하기
          </button>
        </div>
      </div>
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row>
          <Col>
            <Nav variant="pills">
              <Nav.Item>
                <Nav.Link
                  eventKey="first"
                  onClick={() => {
                    setTap(0);
                  }}>
                  Tab 1
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="second"
                  onClick={() => {
                    setTap(1);
                  }}>
                  Tab 2
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="three"
                  onClick={() => {
                    setTap(2);
                  }}>
                  Tab 3
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
        </Row>
      </Tab.Container>
      <TapComponent2 tap={tap} shoes={props.shoes}></TapComponent2>
    </div>
  );
}
// array를 활용한 센스잇는 tap 만들기

function TapComponent2({ tap, shoes }) {
  let [fade, setFade] = useState("");
  let { 재고 } = useContext(Context1);

  // 리액트의 automatic batching 기능은 state가 근처에있을때 최종적으로 한번만 변경해줌
  // state변경 할 떄 마다 변경해주는 것이 아니라, 변경 후 마지막에 재랜더링을 해준다
  // setFade(""); 처음실행되고 setFade("end"); 실행되지만 최종적인 1번만 동작한다
  useEffect(() => {
    setTimeout(() => {
      setFade("end");
    }, 100);

    return () => {
      setFade("");
    };
  }, [tap]);

  return (
    <div className={`start ` + fade}>
      {[<div>{shoes[0].title}</div>, <div>{재고}</div>, <div>내용2</div>][tap]}
    </div>
  );
}

export default Datail;
