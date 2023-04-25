import { useDeferredValue, useState, useTransition } from "react";
import { Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "./../App.css";
// import "rc-tree/assets/index.css";
let a = new Array(10000).fill(0);

function TableComponent() {
  let [data, setData] = useState([
    {
      DocumentName: "Sample1",
      label: "RootNode",
      children: [
        {
          DocumentName: "Sample 1-1",
          label: "childNode 1",
          children: [
            {
              name: "PNC Star OCR system.pdf",
              size: "2MB",
              date: "2020-04-07",
              label: "GrandChildNode 1-1",
            },
            {
              name: "PNC Star OCR system.pdf PNC Star OCR system.pdf PNC Star OCR system.pdf",
              size: "2MB",
              date: "2020-04-07",
              label: "GrandChildNode 1-2",
            },
          ],
        },
        {
          DocumentName: "Sample 1-2",
          label: "childNode 2",
        },
        {
          DocumentName: "Sample 1-3",
          label: "childNode 3",
        },
        {
          DocumentName: "Sampl2 1-4",
          label: "childNode 4",
          children: [
            {
              DocumentName: "Sample 1-4-1",
              label: "GrandChildNode 4-1",
            },
            {
              DocumentName: "Sample 1-4-2",
              label: "GrandChildNode 4-2",
            },
            {
              DocumentName: "Sample 1-4-3",
              label: "GrandChildNode 4-3",
              children: [
                {
                  name: "PNC Star OCR system.pdf",
                  size: "2MB",
                  date: "2020-04-07",
                  label: "GrandGrandChildNode 4-3-1",
                },
                {
                  name: "PNC Star OCR system.pdf",
                  size: "2MB",
                  date: "2020-04-07",
                  label: "GrandGrandChildNode 4-3-2",
                },
                {
                  name: "PNC Star OCR system.pdf",
                  size: "2MB",
                  date: "2020-04-07",
                  label: "GrandGrandChildNode 4-3-3",
                },
                {
                  name: "PNC Star OCR system.pdf",
                  size: "2MB",
                  date: "2020-04-07",
                  label: "GrandGrandChildNode 4-3-4",
                },
              ],
            },
          ],
        },
      ],
    },
  ]);

  let [naname, setNaname] = useState("");
  let [isPending, 늦게처리] = useTransition();
  let nanameState = useDeferredValue(naname);

  return (
    <div className="tableContainer">
      <Table>
        <thead>
          <tr>
            <th>document Type</th>
            <th>문서 추가</th>
            <th>File Name</th>
            <th>File Size</th>
            <th>등록 날짜</th>
            <th>문서관리</th>
          </tr>
        </thead>
        <tbody>
          {data[0].children.map((ele, index) => {
            return (
              <tr key={index}>
                <td>▶ {data[0].children[index].DocumentName}</td>
                <td>📁+</td>
                <td>{data[0].children[0].children[0].name}</td>

                <td></td>
                <td></td>
                <td>
                  <Button
                    variant="success"
                    onClick={() => {}}
                    style={{ background: "#198754" }}>
                    수정
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => {
                      let copy = [...data];
                      console.log(copy);
                      copy[0].children[index].splce(index, 1);
                      setData(copy);
                    }}
                    style={{ background: "#dc3545" }}>
                    삭제
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <div>
        <input
          type="text"
          onChange={e => {
            늦게처리(() => {
              setNaname(e.target.value);
            });
          }}
        />
        {isPending
          ? "로딩중"
          : a.map((a, i) => {
              return <div key={i}>{nanameState}</div>;
            })}
      </div>
    </div>
  );
}

// function Children({ data, index }) {
//   if (data.children[index].children[0].name) {
//     return <td>{data.children[index].children[0].name}</td>;
//   }
// }

export default TableComponent;
