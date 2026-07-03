export class BaseApi {
  constructor(private readonly url = "http://localhost:3000/api") {}

  async get(url: string) {
    const res = await fetch(`${this.url}/${url}`, {
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    return res.json();
  }

  async post(url: string, body: string | FormData) {
    const baseFetchOptions = {
      method: "POST",
      body,
      credentials: "include",
    };
    let fetchOptions;

    if (typeof body === "string") {
      fetchOptions = {
        ...baseFetchOptions,
        headers: { "Content-Type": "application/json" },
      };
    }

    const res = await fetch(`${this.url}/${url}`, fetchOptions);

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    return res.json();
  }

  async put(url: string, body: string) {
    const res = await fetch(`${this.url}/${url}`, {
      method: "PUT",
      headers: {},
      body: body,
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    return res.json();
  }

  async delete(url: string) {
    const res = await fetch(`${this.url}/${url}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    return res.json();
  }
}
