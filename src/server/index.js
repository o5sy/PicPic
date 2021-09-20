import Express from "express";
import path from "path";
import api from "./api";
import dbConfig from "./lib/db.config";

const app = Express();
const PORT = process.env.PORT ? process.env.PORT : 3000;
let rootPath, webRootPath;
const fs = require("fs");

// DB 연결
dbConfig();

// Routing 설정
app.use("/api", api);

// 웹 루트 경로 지정
rootPath = path.join(__dirname, "../", "../"); // C:\Users\ayul5\workspace\Study\Pixabay
webRootPath = path.join(rootPath, "/src/app");
app.use("/js", Express.static(webRootPath + "/js"));
app.use("/css", Express.static(webRootPath + "/css"));
app.use("/res", Express.static(rootPath + "/res"));
app.use("/dist", Express.static(rootPath + "/dist"));

// url에 해당하는 html 파일 응답
// 메인 페이지
app.get("/", (req, res) => {
  const result = getImportHeader("index.html");
  res.send(result);
});

// 검색 결과 페이지
app.get("/search/:query", (req, res) => {
  const result = getImportHeader("search.html");
  res.send(result);
});

// 사진 상세보기 페이지
app.get("/photo/:id", (req, res) => {
  const result = getImportHeader("detail.html");
  res.send(result);
});
app.get("/photo", (req, res) => {
  // id 값 없을 경우 메인 페이지로 이동
  const result = getImportHeader("index.html");
  res.send(result);
});

app.listen(PORT, () => {
  console.log(`${PORT}번 port에 http server를 띄웠습니다.`);
});

function getImportHeader(htmlFileName) {
  if (
    (htmlFileName !== "string" && htmlFileName === "") ||
    htmlFileName === null
  )
    return;

  // htmlFileName에 .html없으면 붙이기
  if (!htmlFileName.includes(".html")) {
    htmlFileName.concat(".html");
  }

  const strFile = fs
    .readFileSync(path.join(webRootPath, `/${htmlFileName}`))
    .toString();

  // 헤더 파일
  const headerFile = fs
    .readFileSync(path.join(rootPath, "/src/server/static/header.html"))
    .toString();

  // '__HEADER__' 문자열을 header.html 파일로 교체
  return strFile.replace("__HEADER__", headerFile);
}
