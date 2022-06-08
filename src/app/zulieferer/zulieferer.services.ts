import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Zulieferer} from "../models/Zulieferer";
import {Contacts} from "../models/Contacts";


@Injectable({providedIn: 'root'})

export class ZuliefererServices {

  private lieferantenAPI = environment.lieferantAPI

  constructor(private http: HttpClient) {
  }


  //Get Mioga Zulieferer
  public getMiogaZuLieferer(): Observable<Zulieferer[]> {
    return this.http.get<Zulieferer[]>(`${this.lieferantenAPI}zulieferer/belongs/mioga`)
  }

  //Get EML Zulieferer

  public getEmkZulieferer(): Observable<Zulieferer[]> {
    return this.http.get<Zulieferer[]>(`${this.lieferantenAPI}zulieferer/belongs/emk`)
  }



  //Get all Zulieferer
  public getAll(): Observable<Zulieferer[]> {
    return this.http.get<Zulieferer[]>(`${this.lieferantenAPI}/zulieferer/all`)
  }



  //Find Zulieferer By Id
  public getZuliefererContactsById(zulieferId: number): Observable<Contacts[]> {
    return this.http.get<Contacts[]>(`${this.lieferantenAPI}/zulieferer/contacts/${zulieferId}`)
  }



  // Create a new Zuliefer
  public createZulieferer(zulieferer : Zulieferer ): Observable<Zulieferer>  {
    return this.http.post<Zulieferer>(`${this.lieferantenAPI}/zulieferer/add`, zulieferer)
  }

  // Updating an Existing Zuliefer
  public updateZulieferer(zulieferer: Zulieferer): Observable<Zulieferer> {
    return this.http.put<Zulieferer>(`${this.lieferantenAPI}/zulieferer/update/`, zulieferer)
  }

  //Find Zulieferer By Id
  public getZuliefererById(zulieferId: number): Observable<Zulieferer[]> {
    return this.http.get<Zulieferer[]>(`${this.lieferantenAPI}/zulieferer/find/${zulieferId}`)
  }


  //Delete an Zuliefer
  public deleteZulieferer(zuliefererId: number): Observable<void> {
    return this.http.delete<void>(`${this.lieferantenAPI}/zulieferer/delete/${zuliefererId}`)
  }
}
