import { Component } from '@angular/core';
import {ProductsService} from "../products.service";
import {NgForm} from "@angular/forms";
import {Product} from "../product.model";

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.css'
})
export class ProductCreateComponent {
  showForm = false
  constructor(public productService: ProductsService) {
  }

  onAddProduct(form: NgForm){
    if(form.invalid){
      return
    }

    const product: Product = {
      id: Math.floor(Math.random() * 10000),
      typeProduct: form.value.typeProduct,
      vendor: form.value.vendor,
      model: form.value.model,
      price: form.value.price,
      imgUrl: form.value.imgUrl,
      count: form.value.count,
      vendorEmail: form.value.vendorEmail,
      description: form.value.description
    }

    this.productService.addProduct(product)
    form.resetForm()
  }

  toggleForm(){
    this.showForm = !this.showForm
  }
}
