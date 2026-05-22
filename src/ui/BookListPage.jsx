// 도서 목록 페이지
import { useEffect, useState } from "react";
import { BookList } from "../api/bookApi";

function BookListPage({ onGoRegister, onGoDetail }) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const data = await BookList();
      setBooks(data);
    };

    fetchBooks();
  }, []);
  
  return (
    <div>
      {/* 공통 헤더 */}
      <header>
        <p>Logo</p>
        <nav>
          <span>도서 목록</span>
          <button type="button" onClick={onGoRegister}>
            도서 등록
          </button>
        </nav>
      </header>

      <main>
        {/* 도서 카드 목록 영역 */}
        <section>
          <p>도서 카드 목록 영역 (3열 그리드)</p>

          {books.map((book) => (
            <button
              key={book.id}
              type="button"
              onClick={() => onGoDetail(book.id)}
            >
              {book.title}
            </button>
          ))}
        </section>
      </main>
    </div>
  );
}

export default BookListPage;