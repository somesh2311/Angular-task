import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ProductsResponse} from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://dummyjson.com';
  constructor(private http: HttpClient) {

  }

  getProducts(limit: number, skip: number) {
    return this.http.get<ProductsResponse>(`${this.apiUrl}/products?limit=${limit}&skip=${skip}`);
  }

}
