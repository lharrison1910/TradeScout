import { BaseApi } from "./BaseApi";

class UserApiClient extends BaseApi {
  private readonly auth = "auth";
  private static instance: UserApiClient;

  constructor() {
    super();
    this.login.bind(this);
  }

  static getInstance(): UserApiClient {
    if (!UserApiClient.instance) {
      UserApiClient.instance = new UserApiClient();
    }
    return UserApiClient.instance;
  }

  async login(payload: { email: string; password: string }) {
    const body = JSON.stringify(payload);
    return await this.post(this.auth, body);
  }

  async logout() {
    return await this.get(this.auth);
  }

  async googleLogin() {
    return await this.get(`${this.auth}/google`);
  }
}

export const userApiClient = UserApiClient.getInstance();
