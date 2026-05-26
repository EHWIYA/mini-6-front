import { useEffect, useState } from "react";
import Header from "../components/Header";
import Input from "../components/common/Input";
import RadioButton from "../components/RadioButton";
import MainButton from "../components/comButton/MainButton";
import BookImage from "../components/bookCard/BookImage";
import "./BookDetailPage.css";

// 목록 하드코딩과 맞춘 예시 (추후 GET /books/:id)
const SAMPLE_BOOKS = {
  1: {
    title: "제목어쩌구",
    author: "예제 저자",
    content:
      "프론트엔드에서 도서 목록을 조회하고, 카드로 출력하며, 상세 페이지로 이동을 실습하기 위한 예제 데이터입니다.",
    coverImageUrl: "",
  },
  2: {
    title: "제목어쩌구",
    author: "예제 저자",
    content:
      "와 React Router를 활용하여 여러 페이지로 구성된 도서 관리 애플리케이션을 구현하는 예제입니다.",
    coverImageUrl: "",
  },
  3: {
    title: "제목어쩌구",
    author: "예제 저자",
    content:
      "에이블스쿨 기의 수강생이 이전의 과정에서 실습자료를 혼합한 상록수의 내용을 표지에 담고 있어요.",
    coverImageUrl: "",
  },
  4: {
    title: "셜록홈즈",
    author: "아서 코난 도일",
    content:
      "괴짜 탐정 셜록 홈즈와 왓슨 박사가 런던의 사건들을 논리적 추리로 해결하는 추리 소설입니다.",
    coverImageUrl: "",
  },
};

// 도서 등록·수정 페이지 — Input / RadioButton / MainButton 연결
function BookDetailPage({ mode, bookId, onGoList, onGoRegister }) {
  const isCreate = mode === "create";

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [selectedQuality, setSelectedQuality] = useState("high");
  const [apiKeyError, setApiKeyError] = useState("");
  const [coverPreview, setCoverPreview] = useState("");

  useEffect(() => {
    if (isCreate || !bookId) {
      return;
    }

    const book = SAMPLE_BOOKS[bookId];
    if (!book) {
      return;
    }

    setTitle(book.title);
    setAuthor(book.author);
    setContent(book.content);
    setCoverPreview(book.coverImageUrl || "");
  }, [isCreate, bookId]);

  const handleSubmit = () => {
    // 추후 POST /books 또는 PATCH /books/:id
  };

  const handleGenerateImage = () => {
    if (!apiKey.trim()) {
      setApiKeyError("유효하지 않은 API Key입니다!");
      return;
    }
    setApiKeyError("");
    // 추후 OpenAI 이미지 생성
  };

  return (
    <div className="bookDetailPage">
      <Header
        title="걷기가 서재"
        onGoList={onGoList}
        onGoCreate={onGoRegister}
      />

      <main className="bookDetailPage-main">
        {/* 좌측: 도서 정보 */}
        <section className="bookDetailPage-column">
          <h2 className="bookDetailPage-heading">
            {isCreate ? "새 도서를 등록해주세요 !" : "도서를 수정해주세요 !"}
          </h2>

          <Input
            label="책 제목:"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="여러분의 책 제목을 입력해주세요."
          />
          <Input
            label="저자:"
            name="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="여러분의 이름을 입력해주세요."
          />
          <Input
            label="내용:"
            name="content"
            variant="large"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="여러분의 책 내용을 입력해주세요."
          />

          <div className="bookDetailPage-actions">
            <MainButton type="button" onClick={handleSubmit}>
              {isCreate ? "도서 등록" : "도서 수정"}
            </MainButton>
          </div>
        </section>

        {/* 우측: AI 표지 생성 */}
        <section className="bookDetailPage-column">
          <h2 className="bookDetailPage-heading">AI 이미지 자동 생성</h2>

          <Input
            label="API Key:"
            name="apiKey"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="API Key를 입력해주세요."
          />

          {apiKeyError && (
            <p className="validation-error bookDetailPage-apiError">
              {apiKeyError}
            </p>
          )}

          <RadioButton
            selectedQuality={selectedQuality}
            onChange={setSelectedQuality}
          />

          <div className="bookDetailPage-preview">
            {coverPreview ? (
              <BookImage src={coverPreview} alt="표지 미리보기" />
            ) : (
              <p className="bookDetailPage-preview-text">
                여러분의 책 제목과 책 내용을 기반으로 생성됩니다 !
              </p>
            )}
          </div>

          <p className="bookDetailPage-preview-hint">
            미 생성 시 기본 이미지로 대체됩니다!
          </p>

          <div className="bookDetailPage-actions">
            <MainButton type="button" onClick={handleGenerateImage}>
              이미지 생성
            </MainButton>
          </div>
        </section>
      </main>
    </div>
  );
}

export default BookDetailPage;
