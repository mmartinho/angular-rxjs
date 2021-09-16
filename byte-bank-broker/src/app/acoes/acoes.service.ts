import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AcoesService {

  constructor(private httpClient: HttpClient) { }

  /**
   * @returns 
   */
  getAcoes(){
    return this.httpClient.get<any>('http://localhost:3000/acoes');
  }
}
