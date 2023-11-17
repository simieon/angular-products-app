import {Component, OnDestroy, OnInit} from '@angular/core';
import {Product} from "../product.model";
import {Subscription} from "rxjs";
import {ProductsService} from "../products.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit, OnDestroy{
  products: Product[] = []
  private productSub!: Subscription

  constructor(public productsService: ProductsService) {
  }
  ngOnInit(): void {
    this.products = this.productsService.getProducts()
    this.productSub = this.productsService.getProductUpdateListener()
      .subscribe((products: Product[]) => {
        this.products = products
      })
  }
  ngOnDestroy(): void {
    this.productSub.unsubscribe()
  }
}
