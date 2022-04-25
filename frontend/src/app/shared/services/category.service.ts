import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private httpClient: HttpClient) {}

  getCategories(type: string) {
    return this.httpClient.get<ICategory>(
      `${environment.api}categories/getCategories/${type}`
    );
  }
}

export interface ICategory {
  success: boolean;
  count: number;
  data?: {
    _id: string;
    name: string;
    type: string;
  }[];
}
