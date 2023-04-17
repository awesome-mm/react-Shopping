import "./App.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import React, { useState, useEffect, createContext } from "react";
import data from "./data";
// import img from "./bg.png";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  Outlet,
  json,
} from "react-router-dom"; // eslint-disable-line no-unused-vars
import Datail from "./routes/Datail";
import axios from "axios";
import Cart from "./routes/Cart";
import TableComponent from "./routes/Table";
import DocumentMode from "./routes/Table2";
import Form from "react-bootstrap/Form";

export let Context1 = React.createContext();

function App() {
  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify([]));
  }, []);

  // 로컹 스토리지에 저장하기
  let obj = { name: "kim" };
  localStorage.setItem("data", JSON.stringify(obj));
  let 꺼낸거 = localStorage.getItem("data");
  console.log(JSON.parse(꺼낸거).name);

  let [moreData, setMoreData] = useState(2);
  let [shoes, setShoes] = useState(data);
  let [재고, 재고변경] = useState([10, 11, 12]);
  let [loading, setLoding] = useState(false);
  let [key, setKey] = useState("home");
  let [sort, setSort] = useState(0);

  let navigate = useNavigate();

  useEffect(() => {
    let copy = [...shoes];
    copy.sort((a, b) => {
      return a - b;
    });
    setSort(copy);
  }, [sort]);

  // 확장자만 추출하기
  // let [num, setNum] = useState("Loas.jpeg");

  // const change = num => {
  //   return setNum(num.split(".").pop());
  // };

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>coping</Navbar.Brand>
          <Nav className="me-auto">
            {/* 일반적인 router의 Link태그를 이용한 a태그로 페이지 바인딩하기 */}
            {/* <Link to="/">홈</Link>
            <Link to="/detail">상세페이지</Link> */}

            <Nav.Link
              onClick={() => {
                navigate("/");
                // navigate(-1); 이전 페이지로 이동!
              }}>
              Home
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/detail/0");
              }}>
              Detail
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/cart");
              }}>
              cart
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/table");
              }}>
              table
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/table2");
              }}>
              table2
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* 확장자만 추출하기 */}
      {/* <h1>{num}</h1>
      <button
        onClick={() => {
          change(num);
        }}>
        확장자만 제거
      </button> */}

      {/* router에서 보여줄 것들을 Routes에 담는다
        Route는 path에 링크주소가 들어가고 element에 보여줄 컴포넌트를 작성한다.
        element속성안에 컴포넌트를 넣어 사용할수도 있다
       */}
      <Routes>
        <Route
          path="/"
          element={
            // Fragment는 <Fragment> <Fragment/>로 하나의 태그로 감쌀 떄 사용한다 Fragment는 div가 된다
            // Fragment 축약문 <></>
            // Fragment에 키 값을 설정할 수 있다 축약해서 사용하면 안된다
            <>
              <div className="main-bg"></div>
              <div style={{ width: "50%", margin: "0 auto", display: "block" }}>
                <Form.Select
                  className="mt-5 mb-5"
                  aria-label="Default select example">
                  <option value="1" onClick={() => {}}>
                    등록순
                  </option>
                  <option value="2" onClick={() => {}}>
                    이름순
                  </option>
                  <option value="3" onClick={() => {}}>
                    가격순
                  </option>
                </Form.Select>
              </div>
              <div className="container">
                <div className="row">
                  {shoes.map((ele, index) => {
                    return (
                      <Card
                        key={index}
                        shoes={shoes[index]}
                        index={index}></Card>
                    );
                  })}
                </div>
              </div>
              {loading === true ? <Loading></Loading> : null}

              {!(moreData === 4) ? (
                <button
                  className="btn btn-success"
                  onClick={() => {
                    setLoding(true);
                    axios
                      .get(
                        "https://codingapple1.github.io/shop/data" +
                          moreData +
                          ".json"
                      )
                      .then(결과 => {
                        console.log(결과.data);
                        let copy = [...shoes, ...결과.data];
                        setShoes(copy);
                        // 로딩중 UI 숨기기
                        setLoding(false);
                        setMoreData(moreData + 1);
                      })
                      .catch(() => {
                        setLoding(false);

                        console.log("실패함");
                      });

                    //바꿀 데이터 입력
                    axios.post("/url", { name: "kim" });
                    // 여러개의 데이터를 한번에 주고 받을때, then()을 뒤에 붙이면 두개의 요청이 성공했을떄 실행할 수 있음
                    // Promise.all([axios.get("url"), axios.get("url")]).then();

                    // "{"name" : "kim"}" json은 문자만 주고 받는데 axios가 변환을 알아서 array로 자동 변환 해줌
                    // 그래서 fecth를 사용할 때는 변환 과정이 필요함
                    // fetch('url').then(결과 => 결과.json).then(data =>{})
                  }}>
                  상품 더보기
                </button>
              ) : null}
            </>
          }></Route>

        {/* Nested Routes
        Route태그안에 Route를 넣고 /about/member , /about/location을 표현할 수 있다
        **<Outlet></Outlet>이라는 태그안에 부모요소와 같이 보여줄 자식요소의 태그상의 위치를 정해야한다
        **자식컴포넌트만 보이는 것이 아니며 부모와 자식 태그구성 모두 같이 보이게 된다
        여러 페이지가 유사할때 사용하도록 하자
        */}
        <Route path="/about" element={<About></About>}>
          <Route path="member" element={<div>멤버임</div>}></Route>
          <Route path="location" element={<div>지도임</div>}></Route>
        </Route>
        <Route path="/event" element={<EvnetPage></EvnetPage>}>
          <Route
            path="one"
            element={<div>첫주문시 양배추즙 서비스</div>}></Route>
          <Route path="two" element={<div>생일기념 쿠폰받기</div>}></Route>
        </Route>

        <Route
          path="/detail/:id"
          element={
            <Context1.Provider value={{ 재고, shoes }}>
              <Datail shoes={shoes}></Datail>
            </Context1.Provider>
          }></Route>

        <Route path="/cart" element={<Cart></Cart>}></Route>

        <Route
          path="/table"
          element={<TableComponent></TableComponent>}></Route>

        <Route path="/table2" element={<DocumentMode></DocumentMode>}></Route>

        <Route path="*" element={<div>없는 페이지임</div>}></Route>
      </Routes>

      {/* <TapComponent tap={tap}></TapComponent> */}

      {
        //       {/*  퍼블릭 경로에 있는 걸 가지고 온다면  ./ ../를 사용하지 않고 /만으로 가능하다*/}
        // {/* <img src="/logo192.png" width="100%" alt="" /> */}
        // {/* 하지만 router를 사용해서 폴더 안에 구조를 갖는다면 /이미지를 해도 나오지않는다  */}
        // <img
        //   src={process.env.PUBLIC_URL + "/logo512.png"}
        //   width="100%"
        //   alt=""
        // />
      }
    </div>
  );
}
// props를 { tap } 으로 *부모 컴포넌트에서 props를 tap={tap} 처럼 tap이라는 지정해 둔 이름을 이용해서 생략이 가능하다
// function TapComponent({ tap }) {
//   if (tap == 0) {
//     return <div>내용0</div>;
//   }
//   if (tap == 1) {
//     return <div>내용1</div>;
//   }
//   if (tap == 2) {
//     return <div>내용2</div>;
//   }
// }
function Loading() {
  return (
    <div>
      <p>데이터를 불러오고 있습니다...</p>
    </div>
  );
}

function About() {
  return (
    <div>
      <h4>회사정보임</h4>
      <Outlet></Outlet>
    </div>
  );
}

function EvnetPage() {
  return (
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </div>
  );
}

function Card(props) {
  return (
    <div className="col-md-4">
      <Link to={"detail/" + props.index}>
        <img
          src={
            "https://codingapple1.github.io/shop/shoes" +
            (props.index + 1) +
            ".jpg"
          }
          width="100%"
          alt=""
        />
      </Link>
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.content}</p>
      <p>{props.shoes.price}</p>
    </div>
  );
}

export default App;

/*
Context API 사용법
부모컴포넌트에서 Context API의 이름을 사용해서 부모컴포넌트에서 보내고 싶은 변수들을
Context1.Provider value안에 State 값을 넣어준다
export로 변수로 저장된 Context1를 내보내 주어야한다


import React, {createContext } from "react";

export let Context1 = React.createContext();

<Context1.Provider value={{ 재고, shoes }}>
  <Datail shoes={shoes}></Datail>
</Context1.Provider>

어떤 자식 컴포넌트에서든 계층상관없이 부모의 state가 있고 value값으로 넘겨준다면
import를 하고 등록한다음 사용이 가능하다

import { Context1 } from "./../App.js";

  function 전역상태관리(){

  let { 재고 } = useContext(Context1);

  return (
    <div>
    {재고}
    </div>
  ) 
}
// Context API 특징 
// Context API props를 부모에서 자식으로 상속이 많이 되어있을때 데이터를 넘겨주는 것을 편하게 해준다
// 단점 state 변경시 쓸데없는 컴포넌트까지 전부 재렌더링이 되고 ,
// useContext()를 쓰고 있는 컴포넌트는 나중에 다른 파일에서 재사용할 때 Context를 import 하는게 귀찮아 질 수 있음
// 그래서 이것 보다는 redux 같은 외부 라이브러리를 많이 사용한다

*/
