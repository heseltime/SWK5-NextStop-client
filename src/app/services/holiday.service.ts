import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AuthService } from '@auth0/auth0-angular';

@Injectable({
  providedIn: 'root',
})
export class HolidayService {
  private baseUrl = `${environment.apiBaseUrl}/api/Holiday`;

  constructor(private http: HttpClient, private auth: AuthService) {}

  getAllHolidays(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl).pipe(
      tap((data) => console.log('Fetched holidays:', data))
    );
  }

  getHolidayById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`).pipe(
      tap((data) => console.log(`Fetched holiday by ID (${id}):`, data))
    );
  }

  createHoliday(holiday: any): Observable<any> {
    return from(this.auth.getAccessTokenSilently()).pipe(
      tap((accessToken) => console.log('Access Token:', accessToken)), // Log the token
      switchMap((accessToken) => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${accessToken}`,
        });
        return this.http.post<any>(this.baseUrl, holiday, { headers });
      }),
      tap((data) => console.log('Created holiday:', data)) // Log the response
    );
  }

  updateHoliday(id: number, holiday: any): Observable<any> {
    return from(this.auth.getAccessTokenSilently()).pipe(
      switchMap((accessToken) => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${accessToken}`,
        });
        return this.http.put<any>(`${this.baseUrl}/${id}`, holiday, { headers });
      }),
      tap((data) => console.log(`Updated holiday ID (${id}):`, data))
    );
  }
}
