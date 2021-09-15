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
console.log(rootPath, webRootPath);

// 리소스 경로 지정
app.use("/js", Express.static(webRootPath + "/js"));

// url에 해당하는 html 파일 응답
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../app/index.html")); // C:\Users\ayul5\workspace\Study\Pixabay\src\app\index.html
});

app.listen(PORT, () => {
  console.log(`${PORT}번 port에 http server를 띄웠습니다.`);
});
