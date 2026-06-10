/** ISO 날짜를 화면 표시용으로 포맷 */
export const formatDate = (isoString) => {
  return new Date(isoString).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

/** rating 숫자를 ★/☆ + 소수 표시 문자열로 변환 */
export const formatRating = (rating) => {
  const value = Number(rating) || 0;
  const rounded = Math.min(5, Math.max(0, Math.round(value)));
  const filled = "★".repeat(rounded);
  const empty = "☆".repeat(5 - rounded);

  return `${filled}${empty} ${value.toFixed(1)}`;
};
