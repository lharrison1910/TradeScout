import type { LoginPayload } from "../types/loginPayload";
import { BaseApi } from "./BaseApi";

class UserApiClient extends BaseApi {
  private readonly auth = "auth";
  private readonly user = "user";
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

  async login(payload: LoginPayload) {
    const body = JSON.stringify(payload);
    return await this.post(`${this.auth}/login`, body);
  }

  async logout() {
    return await this.get(this.auth);
  }

  async googleLogin() {
    return await this.get(`${this.auth}/google`);
  }

  async getUser() {
    return await this.get(`${this.user}`);
  }

  async updateUser(payload) {
    const body = JSON.stringify(payload);
    return await this.put(`${this.user}`, body);
  }

}

export const userApiClient = UserApiClient.getInstance();
