export const API_BASE = "https://enduring-spirit-ce192413cd.strapiapp.com/api";

export type StrapiUser = {
  id: number;
  documentId?: string;
  username: string;
  email: string;
  provider?: string;
  confirmed?: boolean;
  blocked?: boolean;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
};

export type RegisterBody = {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: string; // ISO date YYYY-MM-DD
  phoneCountry?: string;
  phone?: string;
  country?: string;
  investmentAmount?: number; // decimal, not string
  investmentInterest?: string;
  termsAccepted?: boolean;
};
export type RegisterSuccess = { jwt: string; user: StrapiUser };
export type RegisterError = {
  data: null;
  error: {
    status: number;
    name: string;
    message: string;
    details?: { errors?: Array<{ path: string[]; message: string }> };
  };
};

export type LoginBody = { identifier: string; password: string };
export type LoginSuccess = { jwt: string; user: StrapiUser };
export type LoginError = RegisterError;

async function parseJson<T>(res: Response): Promise<T> {
  const text = await res.text();
  if (!text) return {} as T;
  try {
    return JSON.parse(text) as T;
  } catch {
    return {} as T;
  }
}

export async function register(
  body: RegisterBody
): Promise<{ ok: true; data: RegisterSuccess } | { ok: false; error: RegisterError }> {
  const res = await fetch(`${API_BASE}/auth/local/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await parseJson<RegisterSuccess | RegisterError>(res);
  if (res.ok && "jwt" in data && "user" in data) {
    return { ok: true, data: data as RegisterSuccess };
  }
  return { ok: false, error: data as RegisterError };
}

/** Login: email + password. This backend does not use a separate "login OTP" flow. */
export async function login(
  body: LoginBody
): Promise<{ ok: true; data: LoginSuccess } | { ok: false; error: LoginError }> {
  const res = await fetch(`${API_BASE}/auth/local`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await parseJson<LoginSuccess | LoginError>(res);
  if (res.ok && data && typeof data === "object" && "jwt" in data && "user" in data) {
    return { ok: true, data: data as LoginSuccess };
  }
  const err = data && typeof data === "object" && "error" in data
    ? (data as LoginError)
    : { data: null, error: { status: res.status, name: "Error", message: "Login failed." } };
  return { ok: false, error: err };
}

export async function getMe(
  jwt: string
): Promise<{ ok: true; user: StrapiUser } | { ok: false }> {
  const res = await fetch(`${API_BASE}/users/me`, {
    headers: { Authorization: `Bearer ${jwt}` },
  });
  if (!res.ok) return { ok: false };
  const user = await parseJson<StrapiUser>(res);
  return { ok: true, user };
}

/** Send verification email (Strapi). Call after signup so user receives OTP/link. */
export async function sendEmailConfirmation(
  email: string
): Promise<{ ok: true } | { ok: false; message?: string }> {
  const res = await fetch(`${API_BASE}/auth/send-email-confirmation`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  const data = await parseJson<{ sent?: boolean; email?: string }>(res);
  if (res.ok && (data.sent === true || data.email)) return { ok: true };
  return { ok: false, message: "Failed to send verification email." };
}

/** Verify OTP/code. If your backend has this endpoint (e.g. POST /api/auth/verify-otp), it will be used; otherwise we fall back to pending signup session. */
export type VerifyOtpSuccess = { jwt: string; user: StrapiUser };
export async function verifyOtp(
  email: string,
  code: string
): Promise<
  | { ok: true; data: VerifyOtpSuccess }
  | { ok: false; status: number; message?: string }
> {
  const res = await fetch(`${API_BASE}/auth/verify-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, code }),
  });
  const data = await parseJson<VerifyOtpSuccess & { error?: { message?: string } }>(res);
  if (res.ok && data && "jwt" in data && "user" in data) {
    return { ok: true, data: data as VerifyOtpSuccess };
  }
  const msg = data?.error?.message ?? "Verification failed.";
  return { ok: false, status: res.status, message: msg };
}

/** Auth token storage key (same as AuthContext). Use with getStoredAuth(). */
export const AUTH_STORAGE_KEY = "nuraya_auth";

export function getStoredAuth(): { user: { email: string }; jwt: string } | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as { user?: { email?: string }; jwt?: string };
    if (!data?.user?.email || !data?.jwt) return null;
    return { user: data.user as { email: string }, jwt: data.jwt };
  } catch {
    return null;
  }
}

/** Headers for authenticated API calls (Bearer token). */
export function getAuthHeaders(): Record<string, string> {
  const auth = getStoredAuth();
  if (!auth) return { "Content-Type": "application/json" };
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${auth.jwt}`,
  };
}

const PENDING_VERIFY_KEY = "nuraya_pending_verify";

export function setPendingVerify(email: string, jwt: string, user: StrapiUser): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(
    PENDING_VERIFY_KEY,
    JSON.stringify({ email, jwt, user })
  );
}

export function getPendingVerify(): { email: string; jwt: string; user: StrapiUser } | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(PENDING_VERIFY_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as { email: string; jwt: string; user: StrapiUser };
  } catch {
    return null;
  }
}

export function clearPendingVerify(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(PENDING_VERIFY_KEY);
}

// --- Projects API (open, no auth) ---

export type ApiProjectListItem = {
  slug: string;
  name: string;
  fullName: string;
  location: string;
  price: string;
  tagline: string;
  cardImage?: string | null | ApiStrapiImage;
  comingSoon: boolean;
};

/** Strapi media object: can have url and formats.medium.url */
export type ApiStrapiImage = {
  url?: string;
  formats?: {
    medium?: { url?: string };
    small?: { url?: string };
    thumbnail?: { url?: string };
  };
};

/** Raw visual from API: image is Strapi media object */
export type ApiProjectVisualRaw = {
  title?: string;
  description?: string;
  image?: ApiStrapiImage | string;
};

export type ApiProjectVisual = {
  title?: string;
  description?: string;
  image?: string;
};

export type ApiProjectSingle = ApiProjectListItem & {
  heroImage: string | null;
  heroSubtitleLeft: string;
  heroSubtitleRight: string;
  heroBottomLine1: string;
  heroBottomLine2: string;
  numbers?: unknown[];
  benefits?: unknown[];
  visuals: ApiProjectVisualRaw[];
  resources?: unknown[];
  terms?: unknown[];
  investCtaImage?: string | null;
  youtubeUrl?: string | null;
};

/** Resolve visual image URL: prefer medium format for ProjectVisuals, then full url */
export function getVisualImageUrl(img: ApiProjectVisualRaw["image"]): string {
  if (!img) return "";
  if (typeof img === "string") return img;
  const medium = img.formats?.medium?.url;
  if (medium) return medium;
  return img.url ?? "";
}

/** Resolve card/hero image URL from API (string or Strapi media object). */
export function getCardImageUrl(
  img: string | null | ApiStrapiImage | undefined
): string {
  if (!img) return "";
  if (typeof img === "string") return img;
  return img.url ?? img.formats?.medium?.url ?? "";
}

export async function getProjects(): Promise<
  { ok: true; data: ApiProjectListItem[] } | { ok: false }
> {
  const res = await fetch(`${API_BASE}/projects`, { cache: "no-store" });
  const json = await parseJson<{ data?: ApiProjectListItem[] }>(res);
  if (!res.ok || !Array.isArray(json?.data)) return { ok: false };
  return { ok: true, data: json.data };
}

export async function getProjectBySlugApi(slug: string): Promise<
  { ok: true; data: ApiProjectSingle } | { ok: false; status: number }
> {
  const res = await fetch(`${API_BASE}/projects/${encodeURIComponent(slug)}`, {
    cache: "no-store",
  });
  const json = await parseJson<{ data?: ApiProjectSingle }>(res);
  if (!res.ok || !json?.data) return { ok: false, status: res.status };
  return { ok: true, data: json.data };
}

export type YoutubeLinkItem = {
  id?: number;
  url?: string;
  title?: string;
  videoId?: string;
  thumbnail?: string;
  description?: string;
  category?: string;
  featured?: boolean;
  order?: number;
};

export async function getYoutubeLinkBySlug(slug: string): Promise<{ url: string } | null> {
  const res = await fetch(`${API_BASE}/youtube-links/${encodeURIComponent(slug)}`, {
    cache: "no-store",
  });
  const json = await parseJson<{ data?: YoutubeLinkItem | YoutubeLinkItem[] }>(res);
  if (!res.ok || !json?.data) return null;
  const data = json.data;
  const item = Array.isArray(data) ? data[0] : data;
  const url = item?.url?.trim();
  return url ? { url } : null;
}
