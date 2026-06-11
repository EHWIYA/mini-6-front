import { useState } from "react";
import GenreModal from "./GenreModal";
import "./GenreSelector.css";

const getGenreName = (genre) => {
  if (typeof genre === "string") {
    return genre;
  }

  return genre?.name || "";
};

function GenreSelector({
  selectedGenre,
  onSelectGenre,
  allowCustomGenre = true,
  className = "",
  modalTitle,
  modalDescription,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const selectedGenreName = getGenreName(selectedGenre);
  const buttonClassName = [
    "genre-select-button",
    selectedGenreName ? "selected" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const handleSelectGenre = (genre) => {
    onSelectGenre(genre);
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        type="button"
        className={buttonClassName}
        onClick={() => setIsModalOpen(true)}
      >
        <span>{selectedGenreName || "장르 선택"}</span>
        <span className="genre-select-arrow">▾</span>
      </button>

      {isModalOpen && (
        <GenreModal
          selectedGenre={selectedGenre}
          onSelectGenre={handleSelectGenre}
          onClose={() => setIsModalOpen(false)}
          allowCustomGenre={allowCustomGenre}
          title={modalTitle}
          description={modalDescription}
        />
      )}
    </>
  );
}

export default GenreSelector;
