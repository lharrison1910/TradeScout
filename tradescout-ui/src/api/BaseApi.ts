let isRefreshing = false;
let activeRefreshPromise: Promise<void> | null = null;

interface QueuedRequest {
  resolve: (res: Response) => void;
  reject: (err: any) => void;
}
let refreshSubscribers: QueuedRequest[] = [];

const subscribeTokenRefresh = (
  resolve: (res: Response) => void,
  reject: (err: any) => void,
) => {
  refreshSubscribers.push({ resolve, reject });
};

const onTokenRefreshed = () => {
  // We no longer need to pass a token! Just tell the queued requests to retry.
  refreshSubscribers.forEach((sub) => sub.resolve(new Response()));
  refreshSubscribers = [];
};

const onRefreshFailed = (error: any) => {
  refreshSubscribers.forEach((sub) => sub.reject(error));
  refreshSubscribers = [];
};

// 🚀 If you call this on app mount, it no longer needs to return a string.
// The browser just silently gets the new cookie and saves it.
export const executeSilentRefresh = async (baseUrl: string): Promise<void> => {
  if (activeRefreshPromise) {
    console.log("👥 Refresh already in progress. Merging duplicate calls...");
    return activeRefreshPromise;
  }

  console.log("🔄 Starting fresh silent refresh network request...");

  activeRefreshPromise = fetch(`${baseUrl}/auth/refresh`, {
    method: "POST",
    credentials: "include", // This tells the browser to send the refresh cookie
  }).then((res) => {
    if (!res.ok) throw new Error("Refresh failed");
  });

  try {
    await activeRefreshPromise;
  } finally {
    activeRefreshPromise = null;
  }
};

export class BaseApi {
  constructor(readonly url = "http://localhost:3000/api") {}

  private async request(
    path: string,
    options: RequestInit = {},
  ): Promise<Response> {
    const url = `${this.url}/${path}`;

    options.credentials = "include";

    const headers = { ...options.headers } as Record<string, string>;
    options.headers = headers;

    console.log(`📡 Sending request to: ${path}`);
    const res = await fetch(url, options);

    if (res.status === 401) {
      if (path.includes("/refresh") || path.includes("/login")) {
        throw new Error("Session expired");
      }

      if (!isRefreshing) {
        isRefreshing = true;
        console.log("🔄 Cookie expired. Attempting silent refresh...");

        try {
          const refreshRes = await fetch(`${this.url}/auth/refresh`, {
            method: "POST",
            credentials: "include",
          });

          if (!refreshRes.ok) throw new Error("Refresh expired");

          isRefreshing = false;
          console.log("✅ Refresh successful! Flushing queued requests.");
          onTokenRefreshed();
        } catch (err) {
          isRefreshing = false;
          console.log("❌ Refresh failed. Rejecting queued requests.");
          onRefreshFailed(err);
          window.location.href = "/login";
          throw err;
        }
      }

      return new Promise((resolve, reject) => {
        subscribeTokenRefresh(
          async () => {
            try {
              // Retry the request. The browser automatically uses the NEW cookie!
              const retryRes = await fetch(url, options);
              if (!retryRes.ok) throw new Error(retryRes.statusText);

              // 🚀 FIXED BUG: Resolve the raw Response object, so your get/post methods don't crash
              resolve(retryRes);
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

    return res;
  }

  async get(url: string) {
    const res = await this.request(url, { method: "GET" });
    return await res.json();
  }

  async post(url: string, body: string | FormData) {
    const headers: Record<string, string> = {};
    if (typeof body === "string") {
      headers["Content-Type"] = "application/json";
    }
    const res = await this.request(url, {
      method: "POST",
      body,
      headers,
    });
    return await res.json();
  }

  async put(url: string, body: string) {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    const res = await this.request(url, {
      method: "PUT",
      body,
      headers,
    });
    return await res.json();
  }

  async delete(url: string) {
    const res = await this.request(url, { method: "DELETE" });
    return await res.json();
  }

  async blob(url: string, body?: string) {
    const headers: Record<string, string> = {};
    if (typeof body === "string") {
      headers["Content-Type"] = "application/json";
    }
    const res = await this.request(url, {
      method: body ? "POST" : "GET",
      body,
      headers,
    });
    return await res.blob();
  }
}
