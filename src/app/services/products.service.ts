// src/app/products/product.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from '../products/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products: Product[] = [
    { id: '1', name: 'Aspirin', description: 'Pain reliever', price: 8.99, quantityInStock: 100, isControlled: false },
    { id: '2', name: 'Penicillin', description: 'Antibiotic', price: 15.50, quantityInStock: 80, isControlled: true },
    { id: '3', name: 'Ibuprofen', description: 'Anti-inflammatory painkiller', price: 12.75, quantityInStock: 150, isControlled: false },
    { id: '4', name: 'Paracetamol', description: 'Fever reducer', price: 5.99, quantityInStock: 200, isControlled: false },
    { id: '5', name: 'Insulin', description: 'Diabetes management', price: 45.00, quantityInStock: 50, isControlled: true },
    { id: '6', name: 'Loratadine', description: 'Allergy relief', price: 7.00, quantityInStock: 90, isControlled: false },
    { id: '7', name: 'Amoxicillin', description: 'Broad spectrum antibiotic', price: 10.00, quantityInStock: 70, isControlled: false },
    { id: '8', name: 'Metformin', description: 'Diabetes medication', price: 17.00, quantityInStock: 60, isControlled: false },
    { id: '9', name: 'Ventolin', description: 'Asthma inhaler', price: 28.50, quantityInStock: 85, isControlled: true },
    { id: '10', name: 'Omeprazole', description: 'Acid reflux medication', price: 22.99, quantityInStock: 120, isControlled: false },
    { id: '11', name: 'Warfarin', description: 'Blood thinner', price: 33.50, quantityInStock: 40, isControlled: true },
    { id: '12', name: 'Zolpidem', description: 'Sleep aid', price: 25.00, quantityInStock: 95, isControlled: true },
    { id: '13', name: 'Lisinopril', description: 'Blood pressure medication', price: 18.75, quantityInStock: 110, isControlled: false },
    { id: '14', name: 'Prednisone', description: 'Steroid', price: 6.45, quantityInStock: 150, isControlled: false },
    { id: '15', name: 'Diphenhydramine', description: 'Antihistamine', price: 5.25, quantityInStock: 200, isControlled: false },
    { id: '16', name: 'Hydrochlorothiazide', description: 'Diuretic', price: 8.40, quantityInStock: 90, isControlled: false },
    { id: '17', name: 'Gabapentin', description: 'Neuropathic pain agent', price: 19.50, quantityInStock: 75, isControlled: false },
    { id: '18', name: 'Azithromycin', description: 'Antibiotic', price: 13.90, quantityInStock: 80, isControlled: false },
    { id: '19', name: 'Albuterol', description: 'Bronchodilator', price: 34.99, quantityInStock: 120, isControlled: true },
    { id: '20', name: 'Esomeprazole', description: 'Stomach acid reducer', price: 29.95, quantityInStock: 100, isControlled: false },
    { id: '21', name: 'Fentanyl', description: 'Potent pain medication', price: 60.00, quantityInStock: 40, isControlled: true },
    { id: '22', name: 'Aripiprazole', description: 'Antipsychotic', price: 75.00, quantityInStock: 30, isControlled: false },
    { id: '23', name: 'Sildenafil', description: 'Treats ED', price: 10.20, quantityInStock: 150, isControlled: false },
    { id: '24', name: 'Simvastatin', description: 'Cholesterol-lowering', price: 15.34, quantityInStock: 50, isControlled: true}
  ]
private unsplashUrl = 'https://source.unsplash.com/random/300x200';

  constructor( private http: HttpClient) {
  }

  getAllProducts(): Observable<Product[]> {
    return of(this.products); // Simulating an API call
  }
  getRandomImage(): Observable<Blob> {
    // Unsplash Source doesn't require API key for simple, random images
    // For specific images or higher usage, consider signing up for an API key at Unsplash
    const imageUrl = 'https://source.unsplash.com/random/300x200';
    return this.http.get(this.unsplashUrl, { responseType: 'blob' });
  }
}
