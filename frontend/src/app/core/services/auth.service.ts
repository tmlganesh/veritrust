import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<any>(null);
  public user$ = this.userSubject.asObservable();
  
  private tokenKey = 'vip_token';
  private apiUrl = 'http://localhost:5000/api/auth';

  constructor(private http: HttpClient) {
    this.checkToken();
  }

  private checkToken() {
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      this.http.get(`${this.apiUrl}/profile`).pipe(
        catchError(() => {
          this.logout();
          return of(null);
        })
      ).subscribe(user => {
        if (user) {
          this.userSubject.next(user);
        }
      });
    }
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((res: any) => {
        localStorage.setItem(this.tokenKey, res.token);
        this.userSubject.next({
          _id: res._id,
          name: res.name,
          email: res.email,
          role: res.role,
          department: res.department
        });
      })
    );
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData).pipe(
      tap((res: any) => {
        localStorage.setItem(this.tokenKey, res.token);
        this.userSubject.next({
          _id: res._id,
          name: res.name,
          email: res.email,
          role: res.role,
          department: res.department
        });
      })
    );
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.userSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }
}
