import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Warrengruppe} from "../models/Warrengruppen";
import {Category} from "../models/Category";




@Injectable({providedIn: 'root'})

export class CategoriesService {

  private apiServerUrl = environment.API_BASEURL


  constructor(private http: HttpClient) {}

  public getCategories(): Observable<Warrengruppe[]> {
    // here is Category i should discript what is coming From the nodejs
    return this.http.get<Warrengruppe[]>(`${this.apiServerUrl}match`)
  }

  public getWarrengruppen(): Observable<Warrengruppe[]> {
    return this.http.get<Warrengruppe[]>(`${this.apiServerUrl}warrengruppen/all`)
  }

  public getTree(warrengruppeId : string): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiServerUrl}getTree/${warrengruppeId}`)
  }



}
