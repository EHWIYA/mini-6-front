import "./GenreModal.css";

const GENRES = [
  "소설",
  "에세이",
  "자기계발",
  "판타지",
  "로맨스",
  "미스터리",
  "스릴러",
  "공포",
  "인문",
  "사회",
  "역사",
  "과학",
  "기술",
  "경제/경영",
  "철학",
  "예술",
  "시",
  "여행",
  "요리",
  "건강",
  "교육",
  "청소년",
  "아동",
  "기타",
];

function GenreModal({ selectedGenre, onSelectGenre, onClose }) {
  return (
    <div className="genre-modal-backdrop" onClick={onClose}>
      <div
        className="genre-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="genre-modal-title"
      >
        <div className="genre-modal-header">
          <h3 id="genre-modal-title">장르 선택</h3>

          <button
            type="button"
            className="genre-modal-close-button"
            onClick={onClose}
            aria-label="장르 선택 창 닫기"
          >
            ×
          </button>
        </div>

        <p className="genre-modal-description">
          도서에 어울리는 장르를 선택해주세요.
        </p>

        <div className="genre-modal-list">
          {GENRES.map((genre) => (
            <button
              key={genre}
              type="button"
              className={`genre-modal-item ${
                selectedGenre === genre ? "selected" : ""
              }`}
              onClick={() => onSelectGenre(genre)}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GenreModal;