import {Product} from "./product.model";
import {Subject} from "rxjs";
import {Injectable, OnInit} from "@angular/core";

@Injectable({providedIn: 'root'})
export class ProductsService implements OnInit{
  private products: Product[] = []
  private productUpdated = new Subject<Product[]>()

  ngOnInit(): void {
    this.loadProductsFormLocalStorage()
  }

  private loadProductsFormLocalStorage(){
    const storedProducts = localStorage.getItem('products')
    if(storedProducts){
      this.products = JSON.parse(storedProducts)
    }
    this.productUpdated.next([...this.products])
  }

  getProducts(){
    this.loadProductsFormLocalStorage()
    return [...this.products]
  }

  getProductUpdateListener(){
    return this.productUpdated.asObservable()
  }

  addProduct(product: Product){
    this.products.unshift(product)
    localStorage.setItem('products', JSON.stringify(this.products))
    this.productUpdated.next([...this.products])
  }

  saveProductChanges(product: Product) {
    const index = this.products.findIndex(product => product === product)

    if (index !== -1) {
      this.products[index] = product
      localStorage.setItem('products', JSON.stringify(this.products))
      this.productUpdated.next([...this.products])
    }
  }

  deleteProduct(product: Product){
    const index = this.products.indexOf(product)
    if (index !== -1) {
      this.products.splice(index, 1)
      localStorage.setItem('products', JSON.stringify(this.products))
      this.productUpdated.next([...this.products])
    }
  }
}
