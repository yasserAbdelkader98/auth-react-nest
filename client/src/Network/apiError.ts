import axios from 'axios';

export default function getApiErrorMessage(
  error: unknown,
  fallbackMessage: string
): string {
  if (!axios.isAxiosError(error)) {
    return fallbackMessage;
  }

  const data: unknown = error.response?.data;
  if (
    typeof data === 'object' &&
    data !== null &&
    'message' in data &&
    typeof data.message === 'string'
  ) {
    return data.message;
  }

  return fallbackMessage;
}
