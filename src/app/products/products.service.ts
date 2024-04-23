// src/app/products/product.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    { id: '1', name: 'Aspirin', description: 'Pain reliever', price: 8.99, quantityInStock: 100, isControlled: false },
    { id: '2', name: 'Penicillin', description: 'Antibiotic', price: 15.50, quantityInStock: 80, isControlled: true }
  ];

  constructor() {}

  getAllProducts(): Observable<Product[]> {
    return of(this.products); // Simulating an API call
  }
}
