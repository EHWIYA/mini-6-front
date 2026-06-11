import { useEffect, useState } from "react";
import Input from "../common/Input";
import MainButton from "../comButton/MainButton";
import SubButton from "../comButton/SubButton";
import { createFeedback, getFeedbackByReviewId } from "../../api/feedbackApi";
import { ADMIN_DISPLAY_NAME, verifyAdminPassword } from "../../constants/admin";
import { formatDate } from "../../utils/reviewFormat";
import "./AdminComment.css";

/**
 * AdminComment — 리뷰 피드백(관리자 답변, 리뷰당 1개)
 *
 * @param {number} reviewId
 */
function AdminComment({ reviewId }) {
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [password, setPassword] = useState("");
  const [content, setContent] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let ignore = false;

    const loadFeedback = async () => {
      setLoading(true);
      setLoadError("");

      try {
        const data = await getFeedbackByReviewId(reviewId);
        if (!ignore) {
          setFeedback(data);
        }
      } catch (error) {
        console.error(error);
        if (!ignore) {
          setLoadError(error.message || "피드백을 불러오지 못했습니다.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    loadFeedback();

    return () => {
      ignore = true;
    };
  }, [reviewId]);

  const handleClose = () => {
    setIsOpen(false);
    setIsAuthenticated(false);
    setPassword("");
    setContent("");
    setErrorMessage("");
  };

  const handleAuth = (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!password.trim()) {
      setErrorMessage("비밀번호를 입력해주세요.");
      return;
    }

    if (!verifyAdminPassword(password)) {
      setErrorMessage("관리자 비밀번호가 올바르지 않습니다.");
      return;
    }

    setIsAuthenticated(true);
    setPassword("");
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!content.trim()) {
      setErrorMessage("답변 내용을 입력해주세요.");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await createFeedback(reviewId, content.trim());
      setFeedback(result);
      handleClose();
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message || "답변 등록에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <p className="adminComment adminComment--loading">피드백 확인 중...</p>;
  }

  if (loadError) {
    return <p className="validation-error adminComment-message">{loadError}</p>;
  }

  if (feedback) {
    return (
      <div className="adminComment adminComment--display">
        <div className="adminComment-header">
          <span className="adminComment-label">{ADMIN_DISPLAY_NAME} 답변</span>
          <time className="adminComment-date" dateTime={feedback.createdAt}>
            {formatDate(feedback.createdAt)}
          </time>
        </div>
        <p className="adminComment-content">{feedback.content}</p>
      </div>
    );
  }

  return (
    <div className="adminComment adminComment--form">
      {!isOpen ? (
        <div className="adminComment-toggleWrap">
          <SubButton onClick={() => setIsOpen(true)}>관리자 답변 작성</SubButton>
        </div>
      ) : !isAuthenticated ? (
        <form className="adminComment-form" onSubmit={handleAuth}>
          <p className="adminComment-formTitle">관리자 인증</p>
          <p className="adminComment-formDesc">
            답변을 작성하려면 관리자 비밀번호를 입력해주세요.
          </p>

          <Input
            label="관리자 비밀번호:"
            type="password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrorMessage("");
            }}
            placeholder="비밀번호를 입력해주세요."
          />

          {errorMessage && (
            <p className="validation-error adminComment-message">{errorMessage}</p>
          )}

          <div className="adminComment-actions">
            <SubButton type="button" onClick={handleClose}>
              취소
            </SubButton>
            <MainButton type="submit">확인</MainButton>
          </div>
        </form>
      ) : (
        <form className="adminComment-form" onSubmit={handleSubmit}>
          <p className="adminComment-formTitle">{ADMIN_DISPLAY_NAME} 답변 작성</p>

          <Input
            label="답변 내용:"
            name="content"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              setErrorMessage("");
            }}
            placeholder="리뷰에 대한 관리자 답변을 입력해주세요."
            variant="large"
          />

          {errorMessage && (
            <p className="validation-error adminComment-message">{errorMessage}</p>
          )}

          <div className="adminComment-actions">
            <SubButton type="button" onClick={handleClose} disabled={isSubmitting}>
              취소
            </SubButton>
            <MainButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? "등록 중..." : "답변 등록"}
            </MainButton>
          </div>
        </form>
      )}
    </div>
  );
}

export default AdminComment;
