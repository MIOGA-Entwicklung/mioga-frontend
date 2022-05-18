import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Category} from "../models/Category";




@Injectable({providedIn: 'root'})

export class CategoriesService {

  private apiServerUrl = environment.API_BASEURL


  constructor(private http: HttpClient) {}

  public getCategories(): Observable<Category[]> {
    // here is Category i should discript what is coming From the nodejs
    console.log("In service")
    return this.http.get<Category[]>(`${this.apiServerUrl}match`)
  }

}
