import { useState } from "react";
import Input from "../common/Input";
import MainButton from "../comButton/MainButton";
import "./ReviewForm.css";

const INITIAL_FORM = {
  rating: 0,
  content: "",
};

/**
 * ReviewForm — 리뷰 작성 폼
 *
 * @param {{ onSubmit: (formData: { rating: number, content: string }) => Promise<void> }} props
 */
function ReviewForm({ onSubmit }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrorMessage("");
  };

  const handleRatingSelect = (rating) => {
    setForm((prev) => ({ ...prev, rating }));
    setErrorMessage("");
  };

  const validate = () => {
    if (form.rating < 1 || form.rating > 5) {
      return "별점을 선택해주세요.";
    }
    if (!form.content.trim()) {
      return "리뷰 내용을 입력해주세요.";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validate();
    if (error) {
      setErrorMessage(error);
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      await onSubmit({
        rating: form.rating,
        content: form.content.trim(),
      });

      setForm(INITIAL_FORM);
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message || "리뷰 등록에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="reviewForm" onSubmit={handleSubmit}>
      <h3 className="reviewForm-title">리뷰 작성</h3>

      <div className="reviewForm-rating">
        <p className="reviewForm-ratingLabel">별점:</p>
        <div className="reviewForm-stars" role="radiogroup" aria-label="별점 선택">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className={`reviewForm-star${star <= form.rating ? " reviewForm-star--active" : ""}`}
              onClick={() => handleRatingSelect(star)}
              aria-label={`${star}점`}
              aria-checked={form.rating === star}
              disabled={isSubmitting}
            >
              {star <= form.rating ? "★" : "☆"}
            </button>
          ))}
        </div>
      </div>

      <Input
        label="리뷰 내용:"
        name="content"
        value={form.content}
        onChange={handleChange}
        placeholder="이 도서에 대한 리뷰를 작성해주세요."
        variant="large"
      />

      {errorMessage && (
        <p className="validation-error reviewForm-message">{errorMessage}</p>
      )}

      <div className="reviewForm-actions">
        <MainButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? "등록 중..." : "리뷰 등록"}
        </MainButton>
      </div>
    </form>
  );
}

export default ReviewForm;
