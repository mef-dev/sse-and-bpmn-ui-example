import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderTextService {

  private _newTextEvent: EventEmitter<string> = new EventEmitter<string>();

  private _text : string;
  public get text() : string {
    return this._text;
  }
  public set text(v : string) {
    this._text = v;
    this._newTextEvent.next(v);
  }
  
  public get TextStream(): Observable<string>{
    return this._newTextEvent.asObservable();
  }

  constructor() {
  }
}
