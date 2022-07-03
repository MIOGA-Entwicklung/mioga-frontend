import {EventEmitter, Injectable} from '@angular/core';
import {Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {

  invokeFirstComponentFunction = new EventEmitter();

  updateMioga = new EventEmitter()


  subsVar: Subscription;

  selected = ''

  constructor() { }

  onMatchTreeButtonClick() {
    this.invokeFirstComponentFunction.emit();
  }


  onUpdateMioga(){
    this.updateMioga.emit()
  }
}
