const express = require("express");
const app = express();
app.listen(3000);

let youTuberA = {
  channelTitle: "유진캉",
  subscribers: "50만명",
  videoNum: "100개",
};
let youTuberB = {
  channelTitle: "앨리스 인 원더랜드",
  subscribers: "100만명",
  videoNum: "377개",
};
let youTuberC = {
  channelTitle: "인어공주",
  subscribers: "1000만명",
  videoNum: "1000개",
};

let db = new Map();
var id = 1;

db.set(id++, youTuberA);
db.set(id++, youTuberB);
db.set(id++, youTuberC);

//전체 조회
app.get("/youtubers", (req, res) => {
  res.json({
    message: "test",
  });
});

app.get("/youtubers/:id", function (req, res) {
  let { id } = req.params;
  id = parseInt(id);
  const youtuber = db.get(id);

  if (youtuber === undefined) {
    res.json({
      message: "유튜버 정보를 찾을 수 없습니다.",
    });
  } else {
    res.json(youtuber);
  }
});

app.use(express.json());
app.post("/youtubers", (req, res) => {
  db.set(id++, req.body);
  res.json({
    message: `${db.get(id - 1).channelTitle} 님, 가입해주셔서 감사합니다.`,
  });
});
