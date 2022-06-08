import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Contacts} from "../models/Contacts";
import {Observable} from "rxjs";

@Injectable({providedIn: 'root'})

export class ContactServices {
  private lieferantAPI = environment.lieferantAPI

  constructor(private http: HttpClient) {
  }

  // Create a new Contact
  public createContact(contacts: Contacts): Observable<Contacts> {
    return this.http.post<Contacts>(`${this.lieferantAPI}/contacts/add`, contacts)
  }

  //Get all Contacts
  public getAll(): Observable<Contacts[]> {
    return this.http.get<Contacts[]>(`${this.lieferantAPI}/contacts/all`)
  }

  // Updating an Existing Contact
  public updateContact(contact: Contacts): Observable<Contacts> {
    return this.http.put<Contacts>(`${this.lieferantAPI}/contacts/update/`, contact)
  }

  //Find Contact By Id
  public getContactById(contactId: number): Observable<Contacts[]> {
    return this.http.get<Contacts[]>(`${this.lieferantAPI}/contacts/find/${contactId}`)
  }


  //Delete an contact
  public deleteContact(contactId: number): Observable<void> {
    return this.http.delete<void>(`${this.lieferantAPI}/contacts/delete/${contactId}`)
  }


}
