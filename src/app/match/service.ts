import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Warrengruppe} from "../models/Warrengruppen";
import {Category} from "../models/Category";


@Injectable({providedIn: 'root'})

export class CategoriesService {

  private apiServerUrl = environment.API_BASEURL


  constructor(private http: HttpClient) {
  }

  public getCategories(): Observable<Warrengruppe[]> {
    // here is Category i should discript what is coming From the nodejs
    return this.http.get<Warrengruppe[]>(`${this.apiServerUrl}match`)
  }

  public getWarrengruppen(): Observable<Warrengruppe[]> {
    return this.http.get<Warrengruppe[]>(`${this.apiServerUrl}warrengruppen/all`)
  }

  public getTree(warrengruppeId: string): Observable<Warrengruppe[]> {
    return this.http.get<Warrengruppe[]>(`${this.apiServerUrl}getTree/${warrengruppeId}`)
  }


  // Updating an Existing category
  public updateCategory(miogeCategory: Category, toMatchCategory: Category []): Observable<Category> {

      //UPDATE ALL CATEGORIES CONNECTION  ID
      toMatchCategory.map(cat => cat.connectionId = miogeCategory.connectionId )

/*    return this.http.put<Category>(`${this.apiServerUrl}match/update`,
      {miogaCategory: miogeCategory, toMatchCategory: toMatchCategory})  */

    return this.http.put<Category>(`${this.apiServerUrl}match/update`, toMatchCategory)

  }


}
