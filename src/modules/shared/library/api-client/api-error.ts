export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly payload?: unknown,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

const TECHNICAL_PATTERNS = [
  /network request failed/i,
  /failed to fetch/i,
  /network error/i,
  /timeout/i,
  /^http\s*\d+/i,
  /ECONNREFUSED/i,
  /ENOTFOUND/i,
];

function isTechnicalMessage(message: string): boolean {
  return TECHNICAL_PATTERNS.some((pattern) => pattern.test(message));
}

export function getErrorMessage(error: unknown, fallback = 'Algo deu errado. Tente novamente.'): string {
  if (error instanceof ApiError) {
    if (error.status === 0) {
      return error.message || 'Não foi possível conectar. Verifique sua internet e tente novamente.';
    }

    const payload = error.payload as { message?: string; errors?: Record<string, string[]> } | undefined;
    if (payload?.errors) {
      const first = Object.values(payload.errors)[0];
      if (first?.[0]) return first[0];
    }
    if (payload?.message && !isTechnicalMessage(payload.message)) {
      return payload.message;
    }
    if (error.message && !isTechnicalMessage(error.message)) {
      return error.message;
    }
    return fallback;
  }

  if (error instanceof Error && error.message && !isTechnicalMessage(error.message)) {
    return error.message;
  }

  return fallback;
}
