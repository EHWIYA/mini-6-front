import "./BookImageStyle.css";

function BookImage({ src, alt = "도서 표지" }) {
  return (
    <div className="book-image-box">
      {src ? (
        // 생성된 이미지
        <img className="book-image" src={src} alt={alt} />
      ) : (
        // 기본 이미지 
        <div className="book-image-placeholder">No Image</div>
      )}
    </div>
  );
}

export default BookImage;