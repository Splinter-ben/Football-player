import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ActionPlayer } from '../actions/action-player';

@Injectable({
  providedIn: 'root',
})
export class EventDrivenService {
  eventDriven: Subject<ActionPlayer<any>> = new Subject<ActionPlayer<any>>();
  eventDrivenObservable$ = this.eventDriven.asObservable();

  publishAction(event: ActionPlayer<any>) {
    this.eventDriven.next(event);
  }
}
