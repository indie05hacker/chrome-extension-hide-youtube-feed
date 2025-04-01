const QUOTES = [
  "오늘이라는 날은 두 번 다시 오지 않는다는 것을 잊지 말라. - 단테",
  "고통이 남기고 간 뒤를 보라. 고난이 지나면 반드시 기쁨이 스며든다. - 괴테",
  "시간은 말로써 나타낼 수 없을 만큼 멋진 만물의 소재이다. - 아널드 버넷",
  "해야 할 것을 하라. 모든 것은 타인의 행복을 위해서, 동시에 특히 나의 행복을 위해서이다. - 톨스토이",
  "미래를 신뢰하지 마라, 죽은 과거는 묻어버려라, 그리고 살아있는 현재에 행동하라. - 롱펠로",
  "만약 우리가 할 수 있는 일을 모두 한다면 우리들은 우리 자신에 깜짝 놀랄 것이다. - 에디슨",
  "내가 헛되이 보낸 오늘 하루는 어제 죽어간 이들이 그토록 바라던 하루이다.",
  "변명 중에서도 가장 어리석고 못난 변명은 '시간이 없어서'라는 변명이다.",
  "시간 엄수는 군주의 예절이다. - 루이 18세",
  "성공하기 위해서는 당신의 열정을 따르라. - 베토벤",
  "인생은 자전거를 타는 것과 같다. 균형을 잡으려면 움직여야 한다. - 아인슈타인",
  "당신이 할 수 있다고 믿든, 할 수 없다고 믿든, 믿는 대로 될 것이다. - 헨리 포드",
  "모든 성취의 시작점은 갈망이다. - 나폴레온 힐",
  "불가능한 것을 해보는 것이 가능한 것을 아는 유일한 방법이다. - 파블로 피카소",
  "당신의 인생을 사랑하라. 당신의 삶을 즐기라. 후회 없이 살아라. - 오드리 헵번",
  "실패는 성공의 어머니이다. - 토마스 에디슨",
  "오늘 할 수 있는 일을 내일로 미루지 마라. - 벤자민 프랭클린",
  "꿈을 이루고자 하는 용기만 있다면 모든 꿈을 이룰 수 있다. - 월트 디즈니",
];

const getRandomQuote = () => QUOTES[Math.floor(Math.random() * QUOTES.length)];

const insertQuote = (limit) => {
  if (limit < 1) {
    return;
  }

  const browseElement = document.querySelector("ytd-browse");

  if (browseElement) {
    browseElement.innerHTML = `<h1 id='indie-hacker-quote'>${getRandomQuote()}</h1>`;
  } else {
    setTimeout(() => {
      insertQuote(--limit);
    }, 500);
  }
};

const callback = async (URL) => {
  const rootElement = document.documentElement;

  if (URL === "https://www.youtube.com/") {
    rootElement.setAttribute("data-yt-page", "home");

    insertQuote(3);
  } else if (URL.includes("youtube.com/watch")) {
    rootElement.setAttribute("data-yt-page", "watch");
  } else {
    rootElement.setAttribute("data-yt-page", "other");
  }
};

chrome.runtime.onMessage.addListener((request) => {
  callback(request.url);
});

callback(window.location.href);
