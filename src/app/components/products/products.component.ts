import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api-service';
import {DEFAULT_PAGINATION, PaginationConfig, Product, ProductsResponse} from '../../model/product.model';
import {BehaviorSubject, map, Observable, startWith, switchMap} from 'rxjs';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {AsyncPipe} from '@angular/common';
import {ProductCardComponent} from '../product-card/product-card.component';
import {BasketService} from '../../services/basket.service';

@Component({
  selector: 'app-products',
  imports: [
    MatPaginator,
    AsyncPipe,
    ProductCardComponent,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit{

  paginationSubject$ = new BehaviorSubject<PaginationConfig>({ ...DEFAULT_PAGINATION });
  pagination$ = this.paginationSubject$.asObservable();
  totalProducts = 0;
  products$: Observable<Product[]> = new Observable<Product[]>();
  basketProductCount$: Observable<number> = new Observable<number>();

  constructor(
    private apiService: ApiService,
    private basketService: BasketService,
  ) {

  }

  ngOnInit(): void {
    this.products$ = this.pagination$.pipe(
      switchMap(({ pageSize, pageIndex }) => {
        const skip = pageSize * pageIndex;
        return this.apiService.getProducts(pageSize, skip);
      }),
      map((response:ProductsResponse) => {
        this.totalProducts = response.total;
        return response.products;
      })
    );

    this.basketProductCount$ = this.basketService.getCartProductIds().pipe(
      map(ids => ids.length)
    );
  }

  onPageChange(event: PageEvent): void {
    this.paginationSubject$.next({
      ...this.paginationSubject$.value,
      pageSize: event.pageSize,
      pageIndex: event.pageIndex,
    });
  }

}
