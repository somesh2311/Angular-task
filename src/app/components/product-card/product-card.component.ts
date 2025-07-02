import {Component, Input, input} from '@angular/core';
import {Product} from '../../model/product.model';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-product-card.component',
  imports: [MatCardModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {

@Input({required: true}) product!: Product;

  constructor() { }
}
