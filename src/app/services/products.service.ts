import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, forkJoin } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/produto';
  private unsplashApiUrl = 'https://api.unsplash.com/search/photos';
  private unsplashAccessKey = 'zCY5HQw_zPhxZubhUmDB3VolJtpstDpUn3oqG_1Qdjw';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl).pipe(
      switchMap((products) => {
        const productRequests = products.map((product) => {
          return this.getDefaultImage().pipe(
            map((imageUrl) => {
              product.imageUrl = imageUrl;
              return product;
            })
          );
        });
        return forkJoin(productRequests);
      })
    );
  }

  createProduct(product: Product): Observable<any> {
    return this.http.post(this.apiUrl, product);
  }

  private getDefaultImage(): Observable<string> {
    const params = new HttpParams()
      .set('query', 'pills')
      .set('client_id', this.unsplashAccessKey)
      .set('per_page', '100');
    return this.http.get<any>(this.unsplashApiUrl, { params }).pipe(
      map((response) => {
        if (response.results && response.results.length > 0) {
          const randomIndex = Math.floor(
            Math.random() * response.results.length
          );
          return response.results[randomIndex].urls.regular;
        } else {
          return 'https://via.placeholder.com/1600x900?text=No+Image';
        }
      }),
      catchError(() => of('https://via.placeholder.com/1600x900?text=No+Image'))
    );
  }
}
