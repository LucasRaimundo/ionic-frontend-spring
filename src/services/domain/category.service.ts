import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { CategoryDTO } from "../../models/category.dto";

@Injectable()
export class CategoryService{

    constructor(public http: HttpClient){

    }

    findAll() : Observable<CategoryDTO[]> {
        return this.http.get<CategoryDTO[]>(`${API_CONFIG.baseUrl}/categories`);
    }
}