import decode from 'jwt-decode';

interface JwtPayload {
  exp: number,
}
class AuthService {
  getProfile(this: any): any {
    return decode(this.getToken());
  }

  loggedIn(this: any) {
    const token = this.getToken();
   
    return token && !this.isTokenExpired(token) ? true : false;
  }

  isTokenExpired(token: any) {
 
    const decoded = decode<JwtPayload>(token);
 
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem('id_token');
      return true;
    }
  
    return false;
  }

  getToken() {
    return localStorage.getItem('id_token');
  }

  login(idToken: string) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  logout() {
    localStorage.removeItem('id_token');    
    window.location.assign('/');
  }
}

export default new AuthService();
