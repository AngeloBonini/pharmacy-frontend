import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Supplier } from '../models/supplier.model';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  private apiUrl = 'http://localhost:3000/pessoa/fornecedores';

  constructor(private http: HttpClient) {}

  getSuppliers(): Observable<Supplier[]> {
    console.log(this.http.get<Supplier[]>(this.apiUrl))
    return this.http.get<Supplier[]>(this.apiUrl);
  }
}
