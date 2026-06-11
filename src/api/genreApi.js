const API_BASE_URL = "http://localhost:8080";
const GENRE_BASE_URL = `${API_BASE_URL}/genres`;

export class GenreApiError extends Error {
  constructor(message, { status, code, payload } = {}) {
    super(message);
    this.name = "GenreApiError";
    this.status = status;
    this.code = code;
    this.payload = payload;
  }
}

const parseErrorPayload = async (response) => {
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return await response.json();
  }

  const text = await response.text();
  return text ? { message: text } : {};
};

const getErrorCode = (payload) => {
  return payload?.code || payload?.errorCode || payload?.error || "";
};

const getErrorMessage = (payload, fallback) => {
  return payload?.message || payload?.errorMessage || payload?.error || fallback;
};

const requestJson = async (url, options = {}, fallbackMessage) => {
  const response = await fetch(url, options);

  if (!response.ok) {
    const payload = await parseErrorPayload(response);

    throw new GenreApiError(getErrorMessage(payload, fallbackMessage), {
      status: response.status,
      code: getErrorCode(payload),
      payload,
    });
  }

  if (response.status === 204) {
    return null;
  }

  return await response.json();
};

export const getGenres = async () => {
  return await requestJson(GENRE_BASE_URL, {}, "장르 목록 조회 실패");
};

export const createGenre = async (name) => {
  return await requestJson(
    GENRE_BASE_URL,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name.trim() }),
    },
    "장르 추가 실패"
  );
};

export const getBooksByGenre = async (genreId) => {
  return await requestJson(
    `${GENRE_BASE_URL}/${genreId}/books`,
    {},
    "장르별 도서 조회 실패"
  );
};

export const isGenreAlreadyExistsError = (error) => {
  const payloadText = JSON.stringify(error?.payload || {});

  return (
    error?.status === 409 ||
    error?.code === "GENRE_ALREADY_EXISTS" ||
    payloadText.includes("GENRE_ALREADY_EXISTS")
  );
};

export const GenreList = getGenres;
export const GenreCreate = createGenre;
export const GenreBooks = getBooksByGenre;
