import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario, RegistroResponse } from '../models/usuario.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  private apiUrl = environment.URL_BASE_USERS;

  constructor(private http: HttpClient) {}

  registrarUsuario(datos: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/register`, datos);
  }
}
