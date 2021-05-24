import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/category/category';
import { AlertifyService } from 'src/app/services/alertify.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { Product } from '../product';

@Component({
  selector: 'app-product-add-forms2',
  templateUrl: './product-add-forms2.component.html',
  styleUrls: ['./product-add-forms2.component.css'],
  providers:[CategoryService,ProductService]
})
export class ProductAddForms2Component implements OnInit {

  constructor(private formBuilder:FormBuilder,
     private categoryService:CategoryService,
     private productService:ProductService,
     private alertifyService:AlertifyService) { }
  productAddForms:FormGroup;
  product:Product= new Product();
  categories: Category[];
  createProductAddForm(){
    this.productAddForms=this.formBuilder.group({
      name:["",Validators.required],
      description:["",Validators.required],
      price:["",Validators.required],
      imageUrl:["",Validators.required],
      categoryId:["",Validators.required],
    });

  }
  ngOnInit(): void {
      this.createProductAddForm();
      this.categoryService.getcCategories().subscribe(data=>{
        this.categories=data;
      });
    }
  add(){
    if(this.productAddForms.valid){
      this.product=Object.assign({},this.productAddForms.value)
    }
    this.productService.appProduct(this.product).subscribe(data=>{
      this.alertifyService.success(data.name+ " Başarıyla Eklendi.")
    });
  }
  

}
