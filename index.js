import Express from "express";

const app = Express();
const PORT = process.env.PORT ?? 3000;

app.get("/", (req, res) => {
  res.send("index page");
});

app.get("/hi", (req, res) => {
  res.send("index page hi");
});

app.listen(PORT, () => {
  console.log(`${PORT}번 port에 http server를 띄웠습니다.`);
});
