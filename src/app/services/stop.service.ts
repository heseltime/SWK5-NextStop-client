import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StopService {
  private baseUrl = `${environment.apiBaseUrl}/api/Stop`;

  constructor(private http: HttpClient) {}

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
}
