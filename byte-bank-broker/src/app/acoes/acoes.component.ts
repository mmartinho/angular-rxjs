import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Acoes } from './modelo/acoes';
import {AcoesService } from './acoes.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-acoes',
  templateUrl: './acoes.component.html',
  styleUrls: ['./acoes.component.css'],
})
export class AcoesComponent /*implements OnInit, OnDestroy*/ {
  acoesInput = new FormControl();
  /*
  Controle da subscrição na próprio componente:

  acoes: Acoes;
  private subscription: Subscription;
  */

  /**
   * Para permitir  uso do "pipe sync" no template, e deixar o 
   * framework gerenciar a vida do observável
   */
  acoes$ = this.acoesService.getAcoes();

  constructor(private acoesService: AcoesService) {}

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
