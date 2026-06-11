import authorImage from "../../assets/author-yuharin.png";

export const HOME_SLIDES = [
  { id: "profile", label: "작가 프로필" },
  { id: "recommended", label: "추천 도서" },
  { id: "ai-cover", label: "AI 표지 생성" },
];

export const AUTHOR_PROFILE = {
  eyebrow: "Virtual Author",
  title: "상상 속 이야기를 수집하는 작가",
  description:
    "가상의 작가 유하린은 일상에서 스쳐 지나가는 감정과 장면을 모아, 하나의 책으로 엮어냅니다.",
  quote: "모든 이야기는 누군가의 작은 상상에서 시작됩니다.",
  tags: ["감성", "판타지", "성장", "기록"],
  name: "유하린",
  role: "감정을 기록하는 판타지 작가",
  image: {
    src: authorImage,
    alt: "가상의 작가 유하린 프로필",
  },
};

export const RECOMMENDED_BOOKS_COPY = {
  eyebrow: "Recommended Books",
  title: "오늘의 추천도서",
  description:
    "조회수를 기준으로 독자들이 가장 많이 찾은 작품을 소개합니다.",
};

export const AI_COVER_STUDIO = {
  eyebrow: "AI Cover Studio",
  title: "책의 내용을 읽고 표지를 그리는 AI",
  description:
    "여러분의 책도 AI 표지를 받아볼 수 있습니다. 제목, 저자, 도서 내용을 입력하고 AI 표지 만들기로 어울리는 표지 생성을 시작해 여러분의 책도 공유해주세요.",
  tags: ["AI 표지", "이미지 생성", "도서 등록", "창작 지원"],
};
