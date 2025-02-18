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

// 전체 조회
var youtubers = {};

app.get("/youtubers", (req, res) => {
  db.forEach((value, key) => {
    youtubers[key] = value;
  });
  res.json(youtubers);
});

// 개별 조회
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

// 등록
app.use(express.json());
app.post("/youtubers", (req, res) => {
  db.set(id++, req.body);
  res.json({
    message: `${db.get(id - 1).channelTitle} 님, 가입해주셔서 감사합니다.`,
  });
});

// 개별 삭제
app.delete("/youtubers/:id", (req, res) => {
  let { id } = req.params;
  id = parseInt(id);
  const youtuber = db.get(id);

  if (youtuber === undefined) {
    res.json({
      message: `${id}로 가입된 정보가 없습니다.`,
    });
  } else {
    db.delete(id);

    const channelTitle = youtuber.channelTitle;
    res.json({
      message: `${channelTitle} 님, 또 찾아주세요.`,
    });
  }
});

//전체 삭제
app.delete("/youtubers", (req, res) => {
  var msg = "";

  if (db.size >= 1) {
    db.clear();
    msg = "전체 유튜버가 삭제되었습니다.";
  } else if (db.size === 0) {
    msg = "삭제할 유튜버가 없습니다.";
  }

  res.json({
    message: msg,
  });
});

// 수정
app.put("/youtubers/:id", (req, res) => {
  let { id } = req.params;
  id = parseInt(id);

  var youtuber = db.get(id);
  var oldChannelTitle = youtuber.channelTitle;

  if (youtuber === undefined) {
    res.json({
      message: `${id}로 가입된 정보가 없습니다.`,
    });
  } else {
    var newChannelTitle = req.body.channelTitle;

    youtuber.channelTitle = newChannelTitle;
    db.set(id, youtuber);

    res.json({
      message: `${oldChannelTitle} 님, 채널명이 ${newChannelTitle}로 변경되었습니다.`,
    });
  }
});
