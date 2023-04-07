import "./App.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useState } from "react";
import data from "./data";
// import img from "./bg.png";
import { Routes, Route, Link } from "react-router-dom";

function App() {
  const [shoes, setShoes] = useState(data);

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">coping</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Cart</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <div className="main-bg"></div>

      <div className="container">
        <div className="row">
          {shoes.map((ele, index) => {
            return <Shoes shoes={shoes} index={index}></Shoes>;
          })}
        </div>
      </div>
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

function Shoes(props) {
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
      <h4>{props.shoes[props.index].title}</h4>
      <p>{props.shoes[props.index].content}</p>
      <p>{props.shoes[props.index].price}</p>
    </div>
  );
}

export default App;
