import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; 

@Injectable({
  providedIn: 'root',
})
export class HolidayService {
  private baseUrl = `${environment.apiBaseUrl}/api/Holiday`; 

  constructor(private http: HttpClient) {}

  getAllHolidays(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  getHolidayById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  createHoliday(holiday: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, holiday);
  }

  updateHoliday(id: number, holiday: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, holiday);
  }
}
