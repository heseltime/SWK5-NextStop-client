import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AuthService } from '@auth0/auth0-angular';

@Injectable({
  providedIn: 'root',
})
export class RouteService {
  private baseUrl = `${environment.apiBaseUrl}/api/Route`;

  constructor(private http: HttpClient, private auth: AuthService) {}

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

  getAllRoutes(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  updateRoute(routeId: number, route: any): Observable<any> {
    return from(this.auth.getAccessTokenSilently()).pipe(
      tap((accessToken) => console.log('Access Token:', accessToken)),
      switchMap((accessToken) => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        });
        console.log('Request URL:', `${this.baseUrl}/${routeId}`);
        console.log('Payload:', route);
        return this.http.put<any>(`${this.baseUrl}/${routeId}`, route, { headers });
      }),
      tap((data) => console.log(`Updated Route ID (${routeId}):`, data))
    );
  }

  createRoute(route: any): Observable<any> {
    return from(this.auth.getAccessTokenSilently()).pipe(
      tap((accessToken) => console.log('Access Token:', accessToken)), 
      switchMap((accessToken) => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${accessToken}`,
        });
        //console.log(route);
        return this.http.post<any>(this.baseUrl, route, { headers });
      }),
      tap((data) => console.log('Created route:', route)) 
    );
  }
  
}
