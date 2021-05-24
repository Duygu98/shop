import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Category } from '../category/category';
import { Observable,throwError } from 'rxjs';
import { tap,catchError } from 'rxjs/operators';

@Injectable()

export class CategoryService {

  constructor( private http:HttpClient) { }
  pathCategories="http://localhost:3000/categories"

  getcCategories():Observable<Category[]>{
    return this.http.get<Category[]>(this.pathCategories).pipe(
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