import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VerificationService {
  private apiUrl = 'http://localhost:5000/api/verification-cases';

  constructor(private http: HttpClient) {}

  getCases(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createCase(caseData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, caseData);
  }

  getCaseById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  updateCaseStatus(id: string, status: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, { status });
  }

  getAnalytics(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/analytics`);
  }
}
