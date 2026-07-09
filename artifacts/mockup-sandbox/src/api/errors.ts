/**
 * Two error envelopes are accepted:
 *  - Legacy:   { error: { code, message, messageAr?, details? }, requestId? }
 *  - asab v1:  { success: false, message, errors: { code?, ...fieldErrors } }
 * `isErrorBody` below detects either; `ApiError` normalizes both.
 */
export interface ApiErrorBody {
  error?: {
    code: string;
    message: string;
    messageAr?: string;
    details?: Record<string, unknown>;
  };
  success?: false;
  message?: string;
  errors?: { code?: string } & Record<string, unknown>;
  requestId?: string;
}

/** True when the response body looks like either supported error envelope. */
export function isErrorBody(body: unknown): body is ApiErrorBody {
  if (!body || typeof body !== "object") return false;
  return "error" in body || "errors" in body || (body as { success?: unknown }).success === false;
}

export class ApiError extends Error {
  code: string;
  messageAr: string;
  details?: Record<string, unknown>;
  requestId?: string;
  status: number;

  constructor(body: ApiErrorBody, status: number) {
    // Legacy envelope wins when present; otherwise read the asab v1 shape.
    const legacy = body.error;
    const message = legacy?.message ?? body.message ?? "حدث خطأ غير متوقع";
    super(message);
    this.code = legacy?.code ?? body.errors?.code ?? "UNKNOWN";
    // asab v1 has no localized field — its `message` is already Arabic.
    this.messageAr = legacy?.messageAr || message;
    this.details = legacy?.details ?? body.errors;
    this.requestId = body.requestId;
    this.status = status;
  }
}

export function isApiError(e: unknown): e is ApiError {
  return e instanceof ApiError;
}

export function getErrorMessage(e: unknown, lang: "ar" | "en" = "ar"): string {
  if (isApiError(e)) return lang === "ar" ? e.messageAr : e.message;
  if (e instanceof Error) return e.message;
  return lang === "ar" ? "حدث خطأ غير متوقع" : "An unexpected error occurred";
}
