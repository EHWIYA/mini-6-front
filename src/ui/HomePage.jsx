import { useEffect, useMemo, useState } from "react";
import { BookList } from "../api/bookApi";
import Header from "../components/Header";
import HomeCarousel from "./home/HomeCarousel";
import { getTopViewedBooks } from "./home/homeUtils";
import "./HomePage.css";

function HomePage({
  onGoList,
  onGoRegister,
  onGoDetail,
  isDarkMode,
  onToggleTheme,
}) {
  const [books, setBooks] = useState([]);
  const [isLoadingBooks, setIsLoadingBooks] = useState(false);

  useEffect(() => {
    let ignore = false;

    const fetchBooks = async () => {
      setIsLoadingBooks(true);
      const data = await BookList();

      if (!ignore) {
        setBooks(Array.isArray(data) ? data : []);
        setIsLoadingBooks(false);
      }
    };

    fetchBooks();

    return () => {
      ignore = true;
    };
  }, []);

  const recommendedBooks = useMemo(() => getTopViewedBooks(books), [books]);

  return (
    <div className="homePage">
      <Header isMain isDarkMode={isDarkMode} onToggleTheme={onToggleTheme} />

      <main className="homePage-main">
        <HomeCarousel
          recommendedBooks={recommendedBooks}
          isLoadingBooks={isLoadingBooks}
          onGoList={onGoList}
          onGoRegister={onGoRegister}
          onGoDetail={onGoDetail}
        />
      </main>
    </div>
  );
}

export default HomePage;
