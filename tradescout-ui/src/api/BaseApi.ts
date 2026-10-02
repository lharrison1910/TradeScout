const baseUrl = import.meta.env.VITE_API_URL;
export class BaseApi {
  constructor(readonly url = `${baseUrl}/api`) {}

  private async refreshAccessToken(): Promise<string> {
    try {
      const refreshRes = await fetch(`${this.url}/auth/refresh`, {
        method: "POST",
        credentials: "include",
      });

      if (!refreshRes.ok) throw new Error("Refresh expired");

      const data = await refreshRes.json();
      sessionStorage.setItem("accessToken", data.accessToken);

      return data.accessToken;
    } catch (err) {
      sessionStorage.removeItem("accessToken");
      window.location.href = "/login";
      throw err;
    }
  }

  private isPublicRoute(path: string): boolean {
    const publicKeywords = ["login", "register", "refresh"];
    return publicKeywords.some((keyword) =>
      path.toLowerCase().includes(keyword),
    );
  }

  private async request(
    path: string,
    options: RequestInit = {},
  ): Promise<Response> {
    let accessToken = sessionStorage.getItem("accessToken");
    const fullUrl = `${this.url}/${path}`;

    options.credentials = "include";

    const isPublic = this.isPublicRoute(path);

    if (!accessToken && !isPublic) {
      accessToken = await this.refreshAccessToken();
    }

    const headers = {
      ...options.headers,
    } as Record<string, string>;

    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`;
    }
    options.headers = headers;

    let res = await fetch(fullUrl, options);

    // Retry once with a refreshed token if a protected route returns 401
    if (res.status === 401 && !isPublic) {
      accessToken = await this.refreshAccessToken();

      headers["Authorization"] = `Bearer ${accessToken}`;
      options.headers = headers;

      res = await fetch(fullUrl, options);
    }

    if (!res.ok) {
      // Extract the actual error message from the NestJS response body
      const errorData = await res.json().catch(() => null);
      const message = errorData?.message || res.statusText || "Request failed";
      throw new Error(Array.isArray(message) ? message.join(", ") : message);
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

  async blob(url: string) {
    const headers: Record<string, string> = {};
    // if (typeof body === "string") {
    //   headers["Content-Type"] = "application/json";
    // }
    const res = await this.request(url, {
      method: "GET",
      headers,
    });

    return await res.blob();
  }
}
