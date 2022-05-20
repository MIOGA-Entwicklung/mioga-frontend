import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Category} from "../models/Category";
import {Warrengruppe} from "../models/Warrengruppen";




@Injectable({providedIn: 'root'})

export class CategoriesService {

  private apiServerUrl = environment.API_BASEURL


  constructor(private http: HttpClient) {}

  public getCategories(): Observable<Warrengruppe[]> {
    // here is Category i should discript what is coming From the nodejs
    console.log("In service")
    return this.http.get<Warrengruppe[]>(`${this.apiServerUrl}match`)
  }

}
