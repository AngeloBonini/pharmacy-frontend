import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private accessKey = 'zCY5HQw_zPhxZubhUmDB3VolJtpstDpUn3oqG_1Qdjw';

  constructor(private http: HttpClient) {}

  getImage(query: string): Observable<string> {
    return this.searchUnsplash(query).pipe(
      switchMap(response => {
        if (response && response.results && response.results.length > 0) {
          return of(response.results[0].urls.small);
        } else {
          return this.searchFallbackImages();
        }
      }),
      catchError(() => of('https://via.placeholder.com/150?text=No+Image'))
    );
  }

  private searchUnsplash(query: string): Observable<any> {
    const url = `https://api.unsplash.com/search/photos?query=${query}&client_id=${this.accessKey}`;
    const headers = new HttpHeaders({
      'Authorization': `Client-ID ${this.accessKey}`
    });

    return this.http.get<any>(url, { headers }).pipe(
      catchError(() => of({ results: [] }))
    );
  }

  private searchFallbackImages(): Observable<string> {
    const fallbackQueries = [ 'pharmacy'];
    const searchRequests = fallbackQueries.map(query => this.searchUnsplash(query));

    return searchRequests.reduce((previous, current) => {
      return previous.pipe(
        switchMap(response => {
          if (response && response.results && response.results.length > 0) {
            return of(response.results[0].urls.small);
          } else {
            return current;
          }
        })
      );
    }, of({ results: [] })).pipe(
      map(response => response && response.results && response.results.length > 0 ? response.results[0].urls.small : 'https://via.placeholder.com/150?text=No+Image')
    );
  }
}
