// 도서 상세 / 등록 페이지
import { useEffect, useState } from "react";
import {
  BookDetail,
  BookCreate,
  BookDelete,
  BookUpdate
} from "../api/bookApi";

function BookDetailPage({ mode, bookId, onGoList }) {
  // 등록 모드일 때 삭제·수정 버튼 비활성 
  const isCreate = mode === "create";

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    if (isCreate) return;

    const fetchBook = async () => {
      const book = await BookDetail(bookId);

      if (!book) return;

      setTitle(book.title);
      setContent(book.content);
      setAuthor(book.author);
    };

    fetchBook();
  }, [isCreate, bookId]);

  const handleCreate = async () => {
    await BookCreate({
      title,
      content,
      author,
      coverImageUrl: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    onGoList();
  };

  const handleUpdate = async () => {
    await BookUpdate(bookId, {
      title,
      content,
      author,
      updatedAt: new Date().toISOString(),
    });

    onGoList();
  };

  const handleDelete = async () => {
    await BookDelete(bookId);
    onGoList();
  };

  return (
    <div>
      {/* 공통 헤더 */}
      <header>
        <p>Logo</p>
        <nav>
          <button type="button" onClick={onGoList}>
            도서 목록
          </button>
          <span>도서 등록</span>
        </nav>
      </header>

      <main>
        {/* 좌측: 도서 정보 */}
        <section>
          <h2>{isCreate ? "새로운 도서를 등록하세요" : "도서 상세"}</h2>
          {/* view/edit 시 어떤 도서인지 표시  */}
          {!isCreate && <p>bookId: {bookId}</p>}

          <label>
            도서 제목
            <input
              type="text"
              placeholder="제목"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label>
            작가
            <textarea
              placeholder="작가"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </label>

          <label>
            도서 내용
            <textarea
              placeholder="내용"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </label>

          {/* CRUD 버튼 */}
          {isCreate ? (
            <button type="button" onClick={handleCreate}>
              등록하기
            </button>
          ) : (
            <>
              <button type="button" onClick={handleDelete}>
                삭제
              </button>
              <button type="button" onClick={handleUpdate}>
                수정하기
              </button>
            </>
          )}
          
        </section>

        {/* 우측: AI 표지 생성 패널 */}
        <section>
          <h3>AI 표지 생성 영역</h3>
          <label>
            API Key
            <input type="password" placeholder="API Key" />
          </label>
          <p>생성 옵션 (라디오)</p>
          <button type="button">생성</button>
          <p>이미지 미리보기</p>
          <p>로딩 / 실패 UI 영역</p>
        </section>
      </main>
    </div>
  );
}

export default BookDetailPage;
