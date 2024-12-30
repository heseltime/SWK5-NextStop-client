import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RouteService {
  private baseUrl = `${environment.apiBaseUrl}/api/Route`;

  constructor(private http: HttpClient) {}

  /**
   * Fetches the route details based on the route ID.
   *
   * @param routeId The ID of the route
   * @returns An Observable of the route data
   */
  getRouteById(routeId: number): Observable<any> {
    const url = `${this.baseUrl}/${routeId}`;
    return this.http.get<any>(url);
  }
}
