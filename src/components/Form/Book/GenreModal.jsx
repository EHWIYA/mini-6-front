import { useState } from "react";
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
];

function GenreModal({ selectedGenre, onSelectGenre, onClose }) {
  const [isCustomOpen, setIsCustomOpen] = useState(false);
  const [customGenre, setCustomGenre] = useState("");

  const handleCustomGenreAdd = () => {
    const trimmedGenre = customGenre.trim();

    if (!trimmedGenre) {
      return;
    }

    onSelectGenre(trimmedGenre);
    setCustomGenre("");
    setIsCustomOpen(false);
  };

  const handleCustomGenreKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleCustomGenreAdd();
    }
  };

  return (
    <div className="genre-modal-backdrop" onClick={onClose}>
      <div
        className="genre-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="genre-modal-header">
          <div>
            <h3>장르 선택</h3>
            <p>책의 분위기에 가장 가까운 장르를 골라주세요.</p>
          </div>

          <button
            type="button"
            className="genre-modal-close-button"
            onClick={onClose}
            aria-label="장르 선택 창 닫기"
          >
            ×
          </button>
        </div>

        <div className="genre-modal-content">
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

          <div className="genre-modal-custom-area">
            {!isCustomOpen && (
              <button
                type="button"
                className="genre-modal-custom-open-button"
                onClick={() => setIsCustomOpen(true)}
              >
                + 직접 장르 추가
              </button>
            )}

            {isCustomOpen && (
              <div className="genre-modal-custom-form">
                <input
                  className="genre-modal-custom-input"
                  value={customGenre}
                  onChange={(e) => setCustomGenre(e.target.value)}
                  onKeyDown={handleCustomGenreKeyDown}
                  placeholder="새 장르를 입력해주세요."
                  autoFocus
                />

                <button
                  type="button"
                  className="genre-modal-custom-add-button"
                  onClick={handleCustomGenreAdd}
                >
                  추가
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GenreModal;