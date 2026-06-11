import { useState } from "react";
import SubButton from "../comButton/SubButton";
import { formatDate, formatRating } from "../../utils/reviewFormat";
import AdminComment from "./AdminComment";
import "./ReviewCard.css";

/**
 * ReviewCard — 리뷰 1건 표시 + 피드백(관리자 답변)
 *
 * @param {object} review
 * @param {(reviewId: number) => Promise<void>} onLike
 */
function ReviewCard({ review, onLike }) {
  const { reviewId, rating, content, createdAt, likeCount } = review;
  const [isLiking, setIsLiking] = useState(false);
  const [likeError, setLikeError] = useState("");

  const handleLike = async () => {
    setIsLiking(true);
    setLikeError("");

    try {
      await onLike(reviewId);
    } catch (error) {
      console.error(error);
      setLikeError(error.message || "좋아요 처리에 실패했습니다.");
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <article className="reviewCard">
      <div className="reviewCard-header">
        <span className="reviewCard-rating" aria-label={`별점 ${rating}점`}>
          {formatRating(rating)}
        </span>
        <time className="reviewCard-date" dateTime={createdAt}>
          {formatDate(createdAt)}
        </time>
      </div>

      <p className="reviewCard-content">{content}</p>

      <div className="reviewCard-footer">
        <SubButton type="button" onClick={handleLike} disabled={isLiking}>
          {isLiking ? "처리 중..." : `좋아요 ${likeCount}`}
        </SubButton>
        {likeError && (
          <p className="validation-error reviewCard-likeError">{likeError}</p>
        )}
      </div>

      <AdminComment reviewId={reviewId} />
    </article>
  );
}

export default ReviewCard;
