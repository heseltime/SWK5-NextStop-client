import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AuthService } from '@auth0/auth0-angular';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  private baseUrl = `${environment.apiBaseUrl}/api/Schedule`;

  constructor(private http: HttpClient, private auth: AuthService) {}

  /**
   * Fetches the next connections (schedules) for a given stop ID.
   * 
   * @param stopId The ID of the stop
   * @param dateTime (Optional) The date and time for filtering (defaults to now)
   * @param count (Optional) The number of connections to fetch (defaults to 1)
   * @returns An Observable of the connection data
   */
  getNextConnections(stopId: number, dateTime?: string, count: number = 1): Observable<any> {
    let params = new HttpParams().set('stopId', stopId.toString()).set('count', count.toString());
    if (dateTime) {
      params = params.set('dateTime', dateTime);
    }

    return this.http.get<any>(`${this.baseUrl}/nextConnections`, { params });
  }

  getAllSchedules(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  getScheduleById(scheduleId: number): Observable<any> {
    const url = `${this.baseUrl}/${scheduleId}`;
    return this.http.get<any>(url);
  }

  updateSchedule(scheduleId: number, schedule: any): Observable<any> {
    return this.auth.getAccessTokenSilently().pipe(
      switchMap((accessToken) => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        });
        return this.http.put<any>(`${this.baseUrl}/${scheduleId}`, schedule, { headers });
      })
    );
  }

  createSchedule(schedule: any): Observable<any> {
    return this.auth.getAccessTokenSilently().pipe(
      switchMap((accessToken) => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        });
        console.log(schedule);
        return this.http.post<any>(this.baseUrl, schedule, { headers });
      })
    );
  }
}
