import {Component, Input, OnInit} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {BasketService} from '../../services/basket.service';
import {map, Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-basket',
  imports: [
    MatButton,
    MatIcon,
    AsyncPipe,
  ],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss'
})
export class BasketComponent implements OnInit {
  @Input({required: true}) productId!: number;
  isProductInCart$!:Observable<boolean>;

  constructor(private basketService: BasketService) {
  }

  ngOnInit(): void {
    this.isProductInCart$  = this.basketService.getCartProductIds().pipe(
      map(productIds => productIds.includes(this.productId)),
    );
  }

  addToCart() {
    this.basketService.addToCart(this.productId)
  }

  removeFromCart() {
    this.basketService.removeFromCart(this.productId)
  }
}
