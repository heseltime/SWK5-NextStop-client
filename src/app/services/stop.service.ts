import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AuthService } from '@auth0/auth0-angular';

@Injectable({
  providedIn: 'root',
})
export class StopService {
  private baseUrl = `${environment.apiBaseUrl}/api/Stop`;

  constructor(private http: HttpClient, private auth: AuthService) {}

  /**
   * Fetches the stop details based on the stop ID.
   *
   * @param stopId The ID of the stop
   * @returns An Observable of the stop data
   */
  getStopById(stopId: number): Observable<any> {
    const url = `${this.baseUrl}/${stopId}`;
    return this.http.get<any>(url);
  }

  /**
   * Fetches the list of all stops.
   *
   * @returns An Observable of the list of stops
   */
  getAllStops(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  createStop(stop: any): Observable<any> {
    return from(this.auth.getAccessTokenSilently()).pipe(
      tap((accessToken) => console.log('Access Token:', accessToken)), // Log the token
      switchMap((accessToken) => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${accessToken}`,
        });
        return this.http.post<any>(this.baseUrl, stop, { headers });
      }),
      tap((data) => console.log('Created stop:', data)) // Log the response
    );
  }

  updateStop(id: number, stop: any): Observable<any> {
    return from(this.auth.getAccessTokenSilently()).pipe(
      switchMap((accessToken) => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${accessToken}`,
        });
        return this.http.put<any>(`${this.baseUrl}/${id}`, stop, { headers });
      }),
      tap((data) => console.log(`Updated holiday ID (${id}):`, data))
    );
  }
}
