import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  private baseUrl = `${environment.apiBaseUrl}/api/Schedule/nextConnections`;

  constructor(private http: HttpClient) {}

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

    return this.http.get<any>(this.baseUrl, { params });
  }
}
