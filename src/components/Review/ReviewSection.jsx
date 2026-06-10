import { useCallback, useEffect, useState } from "react";
import {
  createReview,
  getBookRating,
  getReviewsByBookId,
  likeReview,
} from "../../api/reviewApi";
import { formatRating } from "../../utils/reviewFormat";
import ReviewCard from "./ReviewCard";
import ReviewForm from "./ReviewForm";
import "./ReviewSection.css";

/**
 * ReviewSection — 도서 상세 하단 리뷰 영역
 *
 * @param {number|string} bookId - 리뷰를 조회·등록할 대상 도서 ID
 */
function ReviewSection({ bookId }) {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const loadReviews = useCallback(async () => {
    if (!bookId) {
      setReviews([]);
      setAverageRating(0);
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const [reviewList, rating] = await Promise.all([
        getReviewsByBookId(bookId),
        getBookRating(bookId),
      ]);

      setReviews(reviewList);
      setAverageRating(rating);
    } catch (error) {
      console.error(error);
      setErrorMessage("리뷰를 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  }, [bookId]);

  useEffect(() => {
    loadReviews();
  }, [loadReviews]);

  const handleCreateReview = async (formData) => {
    await createReview(bookId, formData);
    await loadReviews();
  };

  const handleLikeReview = async (reviewId) => {
    const updatedReview = await likeReview(reviewId);

    setReviews((prev) =>
      prev.map((review) =>
        review.reviewId === updatedReview.reviewId ? updatedReview : review,
      ),
    );
  };

  const reviewCount = reviews.length;

  return (
    <section className="reviewSection" aria-labelledby="review-section-title">
      <div className="reviewSection-header">
        <h2 id="review-section-title" className="reviewSection-title">
          리뷰
        </h2>
        <span className="badge reviewSection-count">{reviewCount}</span>
        {reviewCount > 0 && (
          <span className="reviewSection-rating" aria-label="평균 별점">
            평균 {formatRating(averageRating)}
          </span>
        )}
      </div>

      <div className="reviewSection-body">
        <ReviewForm onSubmit={handleCreateReview} />

        {loading && (
          <p className="reviewSection-message">리뷰를 불러오는 중입니다.</p>
        )}

        {!loading && errorMessage && (
          <p className="reviewSection-message reviewSection-message--error">
            {errorMessage}
          </p>
        )}

        {!loading && !errorMessage && reviewCount > 0 ? (
          <ul className="reviewSection-list">
            {reviews.map((review) => (
              <li key={review.reviewId} className="reviewSection-listItem">
                <ReviewCard review={review} onLike={handleLikeReview} />
              </li>
            ))}
          </ul>
        ) : (
          !loading &&
          !errorMessage && (
            <p className="reviewSection-empty">아직 등록된 리뷰가 없습니다.</p>
          )
        )}
      </div>
    </section>
  );
}

export default ReviewSection;
