let inMemoryToken: string | null = null;
let isRefreshing = false;
let activeRefreshPromise: Promise<{ accessToken: string }> | null = null;

interface QueuedRequest {
  resolve: (token: string) => void;
  reject: (err: any) => void;
}
let refreshSubscribers: QueuedRequest[] = [];

export const setAccessToken = (token: string | null) => {
  inMemoryToken = token;
};

const subscribeTokenRefresh = (
  resolve: (token: string) => void,
  reject: (err: any) => void,
) => {
  refreshSubscribers.push({ resolve, reject });
};

const onTokenRefreshed = (token: string) => {
  refreshSubscribers.forEach((sub) => sub.resolve(token));
  refreshSubscribers = [];
};

const onRefreshFailed = (error: any) => {
  refreshSubscribers.forEach((sub) => sub.reject(error));
  refreshSubscribers = [];
};

export const executeSilentRefresh = async (
  baseUrl: string,
): Promise<string> => {
  if (activeRefreshPromise) {
    console.log("👥 Refresh already in progress. Merging duplicate calls...");
    const result = await activeRefreshPromise;
    return result.accessToken;
  }

  console.log("🔄 Starting fresh silent refresh network request...");

  activeRefreshPromise = fetch(`${baseUrl}/auth/refresh`, {
    method: "POST",
    credentials: "include",
  }).then(async (res) => {
    if (!res.ok) throw new Error("Refresh failed");
    return res.json();
  });

  try {
    const data = await activeRefreshPromise;
    inMemoryToken = data.accessToken;
    setAccessToken(data.accessToken);
    return data.accessToken;
  } finally {
    activeRefreshPromise = null;
  }
};

export class BaseApi {
  constructor(readonly url = "http://localhost:3000/api") {}

  private async request(path: string, options: RequestInit = {}): Promise<any> {
    const url = `${this.url}/${path}`;
    options.credentials = "include";

    const headers = {
      ...options.headers,
    } as Record<string, string>;

    if (inMemoryToken) {
      headers["Authorization"] = `Bearer ${inMemoryToken}`;
    }
    options.headers = headers;

    console.log(`📡 Sending request to: ${path}`);
    const res = await fetch(url, options);

    if (res.status === 401) {
      if (path.includes("/refresh")) {
        throw new Error("Session expired");
      }

      if (!isRefreshing) {
        isRefreshing = true;
        console.log("🔄 Access Token expired. Attempting silent refresh...");

        try {
          // 🚀 FIXED: Hardcoded 'auth' so child classes like BusinessApiClient don't break this url
          const refreshRes = await fetch(`${this.url}/auth/refresh`, {
            method: "POST",
            credentials: "include",
          });

          if (!refreshRes.ok) throw new Error("Refresh expired");

          const data = await refreshRes.json();
          inMemoryToken = data.accessToken;
          isRefreshing = false;

          console.log("✅ Refresh successful! Flushing queued requests.");
          onTokenRefreshed(data.accessToken);
        } catch (err) {
          isRefreshing = false;
          inMemoryToken = null;

          console.log("❌ Refresh failed. Rejecting queued requests.");
          onRefreshFailed(err);

          window.location.href = "/login";
          throw err;
        }
      }

      return new Promise((resolve, reject) => {
        subscribeTokenRefresh(
          async (newToken) => {
            try {
              headers["Authorization"] = `Bearer ${newToken}`;
              const retryRes = await fetch(url, { ...options, headers });
              if (!retryRes.ok) throw new Error(retryRes.statusText);
              resolve(await retryRes.json());
            } catch (retryErr) {
              reject(retryErr);
            }
          },
          (error) => {
            reject(error);
          },
        );
      });
    }

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    return res.json();
  }

  async get(url: string) {
    return this.request(url, { method: "GET" });
  }

  async post(url: string, body: string | FormData) {
    const headers: Record<string, string> = {};
    if (typeof body === "string") {
      headers["Content-Type"] = "application/json";
    }

    return this.request(url, {
      method: "POST",
      body,
      headers,
    });
  }

  async put(url: string, body: string) {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    return this.request(url, {
      method: "PUT",
      body,
      headers,
    });
  }

  async delete(url: string) {
    return this.request(url);
  }
}
