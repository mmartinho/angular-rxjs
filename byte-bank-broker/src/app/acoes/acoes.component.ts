import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Acoes } from './modelo/acoes';
import {AcoesService } from './acoes.service';
import { merge, Subscription } from 'rxjs';
import { debounce, debounceTime, distinctUntilChanged, filter, switchMap, tap } from 'rxjs/operators';

/** 300ms */
const ESPERA_DIGITACAO = 300; 

@Component({
  selector: 'app-acoes',
  templateUrl: './acoes.component.html',
  styleUrls: ['./acoes.component.css'],
})
export class AcoesComponent /*implements OnInit, OnDestroy*/ {
  acoesInput = new FormControl();
  
  /** 
   * Observable que retorna todas as acoes 
   */
  todasAcoes$ = this.acoesService.getAcoes().pipe(
    tap(()=>{console.log('Fluxo de todas acoes');})
  );

  /** 
   * Observable que retorna as acoes filtradas 
   * pelo evento do input 
   */
  filtroPeloInput$ = this.acoesInput.valueChanges.pipe(
    /** Faz o observable esperar um tempo */
    debounceTime(ESPERA_DIGITACAO),
    /** Condiciona o observable de acordo com critério  */
    filter(
      (valorDigitado) => { 
        return valorDigitado.length >= 3 || !valorDigitado.length
      }
    ),
    /** Condiciona o observable a uma mudança de valor */
    distinctUntilChanged(),
    /** Remapeia o fluxo do observable */
    switchMap(
      (valorDigitado) => { 
        return this.acoesService.getAcoes(valorDigitado);
      }
    )
  );

  /** 
   * Aglutina os dois observables 
   */
  acoes$ = merge(this.todasAcoes$,this.filtroPeloInput$);

  constructor(private acoesService: AcoesService) {}  

  /*
   Para permitir  uso do "pipe sync" no template, e deixar o 
   framework gerenciar a vida do observável:
   
   acoes$ = this.acoesService.getAcoes();
  */

  /*
  Controle da subscrição na próprio componente:

  acoes: Acoes;
  private subscription: Subscription;
  */

  /*
  Controle da subscrição usando ciclo de vida do componente:
  
  ngOnInit(): void {
    this.subscription = this.acoesService.getAcoes().subscribe((acoes) => {
      this.acoes = acoes; // alterado: api.payload  
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  */
}
