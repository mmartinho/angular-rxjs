import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, pluck, tap } from 'rxjs/operators';
import { Acao, AcoesAPI } from './modelo/acoes';

@Injectable({
  providedIn: 'root'
})
export class AcoesService {

  constructor(private httpClient: HttpClient) { }

  /**
   * @returns 
   */
  getAcoes(valor?: string) {
    /** Repassa parametro de busca, se existirem */
    const params = valor ? new HttpParams().append('valor',valor) : undefined; 
    /** Realiza a consulta na API (retorna um "observable") */
    return this.httpClient.get<AcoesAPI>('http://localhost:3000/acoes', {params: params})
      .pipe(
        // tap((valor)=>console.log(valor)),
        pluck('payload'),  // alterado: map((api)=>api.payload),
        map((acoes)=>{
          return acoes.sort((acaoA, acaoB)=>{ return this.ordenaPorCodigo(acaoA, acaoB)});
        })
      );
  }

  /**
   * @param acaoA 
   * @param acaoB 
   * @returns integer
   */
  private ordenaPorCodigo(acaoA : Acao, acaoB: Acao) {
    if(acaoA.codigo > acaoB.codigo) {
      return 1;
    }
    if(acaoA.codigo < acaoB.codigo) {
      return -1;
    }
    return 0;
  }
}
