import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../model/product.model';
import {MatCardModule} from '@angular/material/card';
import {CurrencyPipe, NgOptimizedImage} from '@angular/common';
import {MatDivider} from '@angular/material/divider';
import {RatingComponent} from '../rating/rating.component';
import {BasketComponent} from '../basket/basket.component';

@Component({
  selector: 'app-product-card',
  imports: [MatCardModule, NgOptimizedImage, MatDivider, RatingComponent, CurrencyPipe, BasketComponent],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {

@Input({required: true}) product!: Product;

  getProductImage() {
    return this.product.thumbnail|| '';
  }

  geProductDiscountPrice() {
    const {price, discountPercentage} = this.product;
    return price - (price * discountPercentage / 100)
  }

}
