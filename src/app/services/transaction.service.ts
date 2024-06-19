import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Transaction } from '../models/transaction.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = 'http://localhost:3000/transacao';
  private productApiUrl = 'http://localhost:3000/produto';

  constructor(private http: HttpClient) {}

  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.apiUrl).pipe(
      switchMap(transactions => {
        return this.http.get<Product[]>(this.productApiUrl).pipe(
          map(products => {
            return transactions.map(transaction => {
              const product = products.find(p => p.id === transaction.produtoId);
              return {
                ...transaction,
                produtoNome: product ? product.nome : 'Unknown'
              };
            });
          })
        );
      })
    );
  }
}
