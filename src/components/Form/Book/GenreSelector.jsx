import { useState } from "react";
import GenreModal from "./GenreModal";
import "./GenreSelector.css";

function GenreSelector({ selectedGenre, onSelectGenre }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectGenre = (genre) => {
    onSelectGenre(genre);
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        type="button"
        className={`genre-select-button ${selectedGenre ? "selected" : ""}`}
        onClick={() => setIsModalOpen(true)}
      >
        <span>{selectedGenre || "장르 선택"}</span>
        <span className="genre-select-arrow">▾</span>
      </button>

      {isModalOpen && (
        <GenreModal
          selectedGenre={selectedGenre}
          onSelectGenre={handleSelectGenre}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}

export default GenreSelector;