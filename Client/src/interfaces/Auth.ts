import { JwtPayload, jwtDecode } from "jwt-decode";

class AuthService {
  getProfile() {
    const token = this.getToken();
    return jwtDecode(token);
  }

    loggedIn() {
    const token = this.getToken();
    return token && !this.isTokenExpired(token);
    }

    isTokenExpired(token: string) {
    const decoded = jwtDecode<JwtPayload>(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp ? decoded.exp < currentTime : false;
    }

    getToken(): string {
        const loggedUser = localStorage.getItem("loggedUser");
        return loggedUser ? loggedUser : "";
    }

    login(token: string) {
        localStorage.setItem("loggedUser", token);
    }

    logout() {
        localStorage.removeItem("loggedUser");
        window.location.assign("/");
    }
}

export default new AuthService();