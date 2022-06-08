import { Component, OnInit } from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Contacts} from "../models/Contacts";
import {ContactServices} from "./contact.service";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {


  closeResult = '';


  public contacts: Contacts[] | undefined;


  Contactdefaultvalue = 'Ms';
  contactName = '';


  constructor(private contactService: ContactServices, private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.getContacts();
  }

  openAddForm(contact : any) {
    this.modalService.open(contact, {ariaLabelledBy: 'addModelForm'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  public getContacts(): void {
    this.contactService.getAll().subscribe(
      (response: Contacts[]) => {
        this.contacts = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onAddContact(addContactForm: NgForm): void {
    this.contactService.createContact(addContactForm.value).subscribe(
      (response: Contacts) => {
        console.log(response);
        this.getContacts();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )


  }

  public onUpdateContact(updateContact: Contacts): void {
    this.contactService.updateContact(updateContact).subscribe(
      (response: Contacts) => {
        console.log(response);
        this.getContacts();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onDeleteContact(contactId: any): void {

    this.contactService.deleteContact(contactId).subscribe(
      (response: void) => {
        console.log(response);
        this.getContacts();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
