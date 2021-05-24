import { Component, OnInit } from '@angular/core';
import { Category } from './category';
import {HttpClient} from '@angular/common/http';
import { CategoryService } from '../services/category.service';
import { AlertifyService } from '../services/alertify.service';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers:[CategoryService]
})
export class CategoryComponent implements OnInit {

  constructor(private categoryService:CategoryService ) { }
  title="Kategori Listesi"
  pathCategories="http://localhost:3000/categories"
  categories: Category[];


  ngOnInit(): void {
    this.categoryService.getcCategories().subscribe(data=>{
      this.categories=data;
    });
  }

}
