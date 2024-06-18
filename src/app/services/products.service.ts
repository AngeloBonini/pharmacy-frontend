import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Product } from '../models/product.model';
import { ImageService } from './image.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    { id: '1', name: 'Aspirin', price: 8.99, description: 'Pain reliever', imageUrl: '' },
    { id: '2', name: 'Penicillin', price: 15.50, description: 'Antibiotic', imageUrl: '' },
    { id: '3', name: 'Ibuprofen', price: 12.75, description: 'Anti-inflammatory painkiller', imageUrl: '' },
    { id: '4', name: 'Paracetamol', price: 5.99, description: 'Fever reducer', imageUrl: '' },
    { id: '5', name: 'Insulin', price: 45.00, description: 'Diabetes management', imageUrl: '' },
    { id: '6', name: 'Loratadine', price: 7.00, description: 'Allergy relief', imageUrl: '' },
    { id: '7', name: 'Amoxicillin', price: 10.00, description: 'Broad spectrum antibiotic', imageUrl: '' },
    { id: '8', name: 'Metformin', price: 17.00, description: 'Diabetes medication', imageUrl: '' },
    { id: '9', name: 'Ventolin', price: 25.00, description: 'Asthma inhaler', imageUrl: '' },
    { id: '10', name: 'Omeprazole', price: 13.00, description: 'Acid reflux treatment', imageUrl: '' },
    { id: '11', name: 'Warfarin', price: 20.00, description: 'Blood thinner', imageUrl: '' },
    { id: '12', name: 'Zolpidem', price: 18.00, description: 'Sleep aid', imageUrl: '' },
  ];

  constructor(private imageService: ImageService) { }

  getProducts(): Observable<Product[]> {
    return of(this.products).pipe(
      switchMap(products => {
        const imageRequests = products.map(product => {
          if (!product.imageUrl) {
            return this.imageService.getImage(product.name).pipe(
              map(imageUrl => {
                product.imageUrl = imageUrl;
                return product;
              })
            );
          } else {
            return of(product);
          }
        });
        return imageRequests.length ? forkJoin(imageRequests) : of(products);
      })
    );
  }
}
