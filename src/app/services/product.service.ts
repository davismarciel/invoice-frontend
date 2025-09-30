import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product, ProductRequest } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly baseUrl = 'http://localhost:8081/api/v1';

  constructor(private http: HttpClient) { }

  createProduct(product: ProductRequest): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}/products`, product);
  }

  listProducts(): Observable<Product[]> {
    return this.http.get<{products: Product[]}>(`${this.baseUrl}/products`).pipe(
      map(response => response.products || [])
    );
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/products/${id}`);
  }

  updateProduct(id: number, product: ProductRequest): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/products/${id}`, product);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/products/${id}`);
  }
}
