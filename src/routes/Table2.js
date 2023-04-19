import React, { useState } from "react";
import AddFolder from "./AddFolder";
// 진성님이 주신 코드임

const data = [
  {
    DocumentName: "Sample1",
    label: "1",
    children: [
      {
        DocumentName: "Sample 1-1",
        label: "1-1",
        children: [
          {
            name: "PNC Star OCR system.pdf",
            size: "2MB",
            date: "2020-04-07",
            label: "1-1-1",
          },
          {
            name: "PNC Star OCR system.pdf PNC Star OCR system.pdf PNC Star OCR system.pdf",
            size: "2MB",
            date: "2020-04-07",
            label: "1-1-2",
          },
        ],
      },
      {
        DocumentName: "Sample 1-2",
        label: "1-2",
      },
      {
        DocumentName: "Sample 1-3",
        label: "1-3",
      },
      {
        DocumentName: "Sampl2 1-4",
        label: "1-4",
        children: [
          {
            DocumentName: "Sample 1-4-1",
            label: "1-4-1",
          },
          {
            DocumentName: "Sample 1-4-2",
            label: "1-4-2",
          },
          {
            DocumentName: "Sample 1-4-3",
            label: "1-4-3",
            children: [
              {
                name: "PNC Star OCR system.pdf",
                size: "2MB",
                date: "2020-04-07",
                label: "1-4-3-1",
              },
              {
                name: "PNC Star OCR system.pdf",
                size: "2MB",
                date: "2020-04-07",
                label: "1-4-3-2",
              },
              {
                name: "PNC Star OCR system.pdf",
                size: "2MB",
                date: "2020-04-07",
                label: "1-4-3-3",
              },
              {
                name: "PNC Star OCR system.pdf",
                size: "2MB",
                date: "2020-04-07",
                label: "1-4-3-4",
              },
            ],
          },
        ],
      },
    ],
  },
];

export default function DocumentMode({ setViewMode }) {
  // 검색
  const [search, setSearch] = useState("");
  const searchBtn = () => {
    console.log("검색버튼");
  };

  // 백엔드에서 받아올 배열
  const [folders, setForders] = useState(data);

  // 아코디언 메뉴
  const arcodian = () => {};

  // 렌더트리 재귀함수
  const [treeData, setTreeData] = useState(data);

  const padding = 15;
  const renderTree = (treeData, count) => {
    let loopData;

    if (Array.isArray(treeData)) {
      loopData = treeData;
    }

    if (treeData.children && Array.isArray(treeData.children)) {
      loopData = treeData.children;
    }

    if (!loopData) {
      return;
    }

    return loopData.map((node, index) => (
      <>
        <tr className={"documentAreaBody " + index} key={node.DocumentName}>
          <td style={{ paddingLeft: count * padding + "px" }}>
            {node.DocumentName && (
              <>
                <button
                  onClick={() => arcodian()}
                  type="button"
                  className="file_arrow"></button>
                <span className="ellipsis">{node.DocumentName}</span>
              </>
            )}
          </td>
          <td>
            {node.DocumentName && (
              <button
                onClick={() => setAddFolder(true)}
                type="button"
                className="file_add"></button>
            )}
          </td>
          <td>
            <span className="ellipsis">{node.name ? node.name : ""}</span>
          </td>
          <td>{node.size ? node.size : ""}</td>
          <td>{node.date ? node.date : ""}</td>
          <td>
            <ul className="file_manage">
              {!node.name && (
                <li>
                  <button type="button" className="file_modify">
                    수정
                  </button>
                </li>
              )}
              <li>
                <button
                  type="button"
                  className="file_delete"
                  onClick={() => removeTreeNode(node.label)}>
                  삭제
                </button>
              </li>
            </ul>
          </td>
        </tr>
        {node.children && renderTree(node, count + 1)}
      </>
    ));
  };

  //노드 삭제
  const removeTreeNode = label => {
    const removeNode = node => {
      if (node.label == label) {
        return null;
      }
      if (node.children) {
        return {
          ...node,
          children: node.children.map(removeNode).filter(Boolean),
        };
      }
      return node;
    };
    setTreeData(treeData.map(removeNode).filter(Boolean));
  };
  //노드 삭제 끝

  // 폴더 추가
  const [addFolder, setAddFolder] = useState(false);

  return (
    <section className="Document">
      <h2>Document Uploades</h2>
      <div className="DocumentInner">
        <div className="documentHeader">
          <button
            onClick={() => setAddFolder(true)}
            type="button"
            className="plus">
            최상위 문서타입 추가
          </button>
          <div className="searchBox">
            <input
              type="text"
              placeholder="...search"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <button
              type="button"
              className="searchBoxBtn"
              onClick={searchBtn}></button>
          </div>
        </div>
        <table className="documentTable">
          <thead className="documentTableHead">
            <tr>
              <th>
                <h3>Document Type</h3>
              </th>
              <th>
                <h3>문서 추가</h3>
              </th>
              <th>
                <h3>File Name</h3>
              </th>
              <th>
                <h3>File Size</h3>
              </th>
              <th>
                <h3>등록 날짜</h3>
              </th>
              <th>
                <h3>문서 관리</h3>
              </th>
            </tr>
          </thead>
          <tbody className="documentTableBody">
            {treeData && renderTree(treeData, 1)}
          </tbody>
        </table>

        <div className="documentBtn">
          <button type="button" onClick={() => setViewMode("Analysis")}>
            분석
          </button>
        </div>
      </div>
      {addFolder && <AddFolder setAddFolder={setAddFolder} />}
    </section>
  );
}
