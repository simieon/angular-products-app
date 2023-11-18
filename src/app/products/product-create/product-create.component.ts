import { Component } from '@angular/core';
import {ProductsService} from "../products.service";
import {NgForm} from "@angular/forms";
import {Product} from "../product.model";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.css',
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0,
        transform: 'translateY(-20px)'
      })),
      transition('void <=> *', animate(300)),
    ]),
  ],
})
export class ProductCreateComponent {
  showForm: boolean = false
  constructor(public productService: ProductsService) {
  }

  onAddProduct(form: NgForm){
    if(form.invalid){
      return
    }

    const product: Product = {
      id: Math.floor(Math.random() * 10000),
      ...form.value
    }

    this.productService.addProduct(product)
    form.resetForm()
  }

  toggleForm(){
    this.showForm = !this.showForm
  }
}
