export function getApiError(error, fallback) {
  return error.response?.data?.message || error.response?.data?.title || fallback;
}
