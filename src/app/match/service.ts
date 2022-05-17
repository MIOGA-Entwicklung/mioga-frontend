import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Category} from "../tree/warrengruppe";



@Injectable({providedIn: 'root'})

export class CategoriesService {

  private apiServerUrl = environment.API_BASEURL

  constructor(private http: HttpClient) {
  }

  public getCategories(): Observable<Category[]> {
    console.log(this.http.get<Category[]>(`${this.apiServerUrl}match`))
    return this.http.get<Category[]>(`${this.apiServerUrl}match`)
  }

}
