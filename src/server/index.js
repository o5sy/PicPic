import Express from "express";
import path from "path";
import api from "./api";
import dbConfig from "./lib/db.config";

const app = Express();
const PORT = process.env.PORT ? process.env.PORT : 3000;
let rootPath, webRootPath;

// DB 연결
dbConfig();

// Routing 설정
app.use("/api", api);

// 웹 루트 경로 지정
rootPath = path.join(__dirname, "../", "../");
webRootPath = path.join(rootPath, "/src/app");
app.use("/js", Express.static(webRootPath + "/js"));
app.use("/css", Express.static(webRootPath + "/css"));
app.use("/res", Express.static(rootPath + "/res"));
app.use("/dist", Express.static(rootPath + "/dist"));

// url에 해당하는 html 파일 응답
// 홈
app.get("/", (req, res) => {
  res.sendFile(path.join(webRootPath, "/index.html")); // C:\Users\ayul5\workspace\Study\Pixabay\src\app\index.html
});

// 검색 결과 페이지
app.get("/search/:query", (req, res) => {
  res.sendFile(path.join(webRootPath, "/search.html"));
});

app.listen(PORT, () => {
  console.log(`${PORT}번 port에 http server를 띄웠습니다.`);
});
