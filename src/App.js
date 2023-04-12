import "./App.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useState } from "react";
import data from "./data";
// import img from "./bg.png";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom"; // eslint-disable-line no-unused-vars
import Datail from "./routes/Datail";

function App() {
  const [shoes] = useState(data);
  let navigate = useNavigate();

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
                navigate("/detail");
              }}>
              Detail
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

      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="main-bg"></div>
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
            </>
          }></Route>
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
          element={<Datail shoes={shoes}></Datail>}></Route>

        <Route path="*" element={<div>없는 페이지임</div>}></Route>
      </Routes>

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
      <img
        src={
          "https://codingapple1.github.io/shop/shoes" +
          (props.index + 1) +
          ".jpg"
        }
        width="100%"
        alt=""
      />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.content}</p>
      <p>{props.shoes.price}</p>
    </div>
  );
}

export default App;
