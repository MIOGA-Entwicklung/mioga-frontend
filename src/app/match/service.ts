import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Warrengruppe} from "../models/Warrengruppen";
import {Category} from "../models/Category";
import {Zulieferer} from "../models/Zulieferer";


@Injectable({providedIn: 'root'})

export class CategoriesService {

  private apiServerUrl = environment.API_BASEURL

  private lieferantenUrl = environment.lieferantAPI


  constructor(private http: HttpClient) {
  }

  public getCategories(wantToMatchShopId: string): Observable<Warrengruppe[]> {
    // here is Category i should discript what is coming From the nodejs
    return this.http.get<Warrengruppe[]>(`${this.apiServerUrl}match/${wantToMatchShopId}`)
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
    toMatchCategory.map(cat => cat.connectionId = miogeCategory.connectionId)

    /*    return this.http.put<Category>(`${this.apiServerUrl}match/update`,
          {miogaCategory: miogeCategory, toMatchCategory: toMatchCategory})  */

    return this.http.put<Category>(`${this.apiServerUrl}match/update`, toMatchCategory)

  }


  public getZulieferer(): Observable<Zulieferer[]> {
    return this.http.get<Zulieferer[]>(`${this.lieferantenUrl}zulieferer/all`)
  }


  public postWarrengruppe(name: String, connectionId: number): Observable<void> {

    return this.http.post<void>(`${this.apiServerUrl}add-warrengruppe`, {name: name, connectionId: connectionId})

  }

  public deleteWarrengruppe(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}delete-warrengruppe/${id}`)
  }

  public importTree(warrengruppeId: string, connectionId: number): Observable<void> {
    return this.http.post<void>(`${this.apiServerUrl}import/${warrengruppeId}/${connectionId}`, {})
  }

  deleteAllWarengruppen() {
    return this.http.delete<void>(`${this.apiServerUrl}deleteAllWarrengruppen`)
  }


  requestBackup() {
    return this.http.get<void>(`${this.apiServerUrl}backup`)
  }


  importAllWarengruppen() {
    return this.http.get<void>(`${this.apiServerUrl}importAllWarrengruppen`)
  }
}
