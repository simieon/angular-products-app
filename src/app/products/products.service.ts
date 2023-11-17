import {Product} from "./product.model";
import {Subject} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class ProductsService{
  private products: Product[] = []
  private productUpdated = new Subject<Product[]>()

  getProducts(){
    return [...this.products]
  }

  getProductUpdateListener(){
    return this.productUpdated.asObservable()
  }

  addProduct(product: Product){
    this.products.push(product)
    this.productUpdated.next([...this.products])
  }

  deleteProduct(product: Product){
    const index = this.products.indexOf(product)
    if (index !== -1) {
      this.products.splice(index, 1)
      this.productUpdated.next([...this.products])
    }
  }
}
