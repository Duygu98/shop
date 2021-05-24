import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Product } from '../product/product';
import { Observable,throwError } from 'rxjs';
import { tap,catchError } from 'rxjs/operators';
import { isBuffer } from 'util';
@Injectable()

export class ProductService {

  constructor( private http:HttpClient) { }
  pathProduct="http://localhost:3000/products"


  getProducts(categoryId):Observable<Product[]>{
    let newpath=this.pathProduct;
    if(categoryId){
      newpath=newpath + "?categoryId=" +categoryId
    }
    return this.http.get<Product[]>(newpath).pipe(
      tap(data=>console.log(JSON.stringify(data))),
      catchError(this.handlError)
    );
  }
  // ürün ekleme işini bu kısımda yapıyoruz.
  appProduct(product:Product):Observable<Product>{
  
    const httpOptions={
      headers:new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization':'Token'
      }) 
         
    }
        return this.http.post<Product>(this.pathProduct,product,httpOptions).pipe(
          tap(data=>console.log(JSON.stringify(data))),
          catchError(this.handlError)
        );
  }
  handlError(err:HttpErrorResponse){
    let errorMessage=''
    if(err.error instanceof ErrorEvent){
      errorMessage='Bir Hata Oluştu....' + err.error.message
    }
    else{
      errorMessage='Sistemsel Bir Hata.'
    }
    return throwError(errorMessage);
  }


}
