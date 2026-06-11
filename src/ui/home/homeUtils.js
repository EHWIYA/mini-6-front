export const RECOMMENDED_BOOK_LIMIT = 1;

export const getBookViews = (book) => Number(book?.views || 0);

export const getTopViewedBooks = (
  books,
  limit = RECOMMENDED_BOOK_LIMIT,
) => {
  if (!Array.isArray(books)) {
    return [];
  }

  return [...books]
    .sort((a, b) => getBookViews(b) - getBookViews(a))
    .slice(0, limit);
};
