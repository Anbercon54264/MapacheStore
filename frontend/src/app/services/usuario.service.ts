import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { global } from './GLOBAL';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  public url;
  public usuario;

  constructor(private http: HttpClient) {
    this.url = global.url;
    this.usuario = new Usuario('', '', '', 0, '', '', '', false);
  }
  login(usuario: Usuario, getToken = true): Observable<any> {
    //variable que almacena los datos del usuario
    let json = usuario;
    //validamos si llga el token
    if (!getToken) {
    } else {
      usuario.getToken = true;
    }
    //header request
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    //enviamos y recibismo la peticion
    console.log(this.url);
    return this.http.post(this.url + 'login', json, { headers: headers });
  }
  //metodo para obtener el token
  getToken() {}
  //metodo par la identidad del usuario
  getIdentity() {}
}
