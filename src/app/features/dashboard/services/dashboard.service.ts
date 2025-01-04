import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = environment.URL_BASE_USERS;

  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/users`, { headers });
  }
}
