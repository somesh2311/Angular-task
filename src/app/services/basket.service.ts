import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  private readonly storageKey = 'cartItem';
  private cartProductsIdsSubject$ = new BehaviorSubject<number[]>(this.loadFromLocalStorage());

  constructor() {}

  getCartProductIds(): Observable<number[]> {
    return this.cartProductsIdsSubject$.asObservable();
  }

  addToCart(productId: number): void {
    const updatedIds = [...this.cartProductsIdsSubject$.value, productId];
    this.updateCart(updatedIds);
  }

  removeFromCart(productId: number): void {
    const updatedIds = this.cartProductsIdsSubject$.value.filter(id => id !== productId);
    this.updateCart(updatedIds);
  }

  private updateCart(productIds: number[]): void {
    this.cartProductsIdsSubject$.next(productIds);
    this.saveToLocalStorage(productIds);
  }

  private loadFromLocalStorage(): number[] {
    const data = localStorage.getItem(this.storageKey);
    try {
      return data ? JSON.parse(data) : [];
    } catch {
      console.warn('Invalid localStorage data for cartItem');
      return [];
    }
  }

  private saveToLocalStorage(productIds: number[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(productIds));
  }
}
