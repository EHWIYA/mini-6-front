import BookImage from "./BookImage";
import "./BookCardStyle.css";

function BookCard({ book, onClick, onLike }) {
  const handleLikeClick = (e) => {
    e.stopPropagation();
    onLike?.(book.id);
  };

  return (
    <article className="book-card" onClick={() => onClick?.(book.id)}>
      <BookImage src={book.coverImageUrl} alt={book.title} />

      <div className="book-card-content">
        <h3 className="book-card-title">{book.title}</h3>
        <p className="book-card-desc">{book.content}</p>
        <div className="bookCard-stats">
          <p className="bookCard-views">👁️‍🗨️ {book.views || 0}</p>
          <button
            type="button"
            className="bookCard-likeButton"
            onClick={handleLikeClick}
            aria-label={`${book.title} like`}
          >
            좋아요 {book.likes || 0}
          </button>
        </div>
      </div>
    </article>
  );
}

export default BookCard;
