import Express from "express";
import api from "./api";
import dbConfig from "./lib/db.config";

const app = Express();
const PORT = process.env.PORT ? process.env.PORT : 3000;

// DB 연결
dbConfig();

// Routing 설정
app.use("/api", api);

// app.get("/", (req, res) => {
//   res.send("index page");
// });

// app.get("/hi", (req, res) => {
//   res.send("index page hi");
// });

app.listen(PORT, () => {
  console.log(`${PORT}번 port에 http server를 띄웠습니다.`);
});
