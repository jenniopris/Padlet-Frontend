import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import jwt_decode from "jwt-decode";
import {User} from "./user";
interface Token {
  exp: number;
  user: {
    id: string;
  };
}
@Injectable()
export class AuthenticationService {
  private api: string =
    "http://padlet.s2010456021.student.kwmhgb.at/api/auth";
  constructor(private http: HttpClient) {}
  login(email: string, password: string) {
    return this.http.post(`${this.api}/login`, {
      email: email,
      password: password
    });
  }

  register(user: User) {
    return this.http.post(`${this.api}/register`, user);
  }

  public getCurrentUserId() {
    return Number.parseInt(<string>sessionStorage.getItem("userId"));
  }
  public setSessionStorage(token: string) {
    const decodedToken = jwt_decode(token) as Token;
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("userId", decodedToken.user.id);
  }
  logout() {
    this.http.post(`${this.api}/logout`, {});
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userId");
  }
  public isLoggedIn() {
    if (sessionStorage.getItem("token")) {
      let token: string = <string>sessionStorage.getItem("token");
      const decodedToken = jwt_decode(token) as Token;
      let expirationDate: Date = new Date(0);
      expirationDate.setUTCSeconds(decodedToken.exp);
      if (expirationDate < new Date()) {
        sessionStorage.removeItem("token");
        return false;
      } return true;
    } else {
      return false;
    }
  }
  isLoggedOut() {
    return !this.isLoggedIn();
  }
}
