import { EventEmitter, Injectable } from '@angular/core';
import { Record } from '../models/log/record.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  private _log: Record[] = [];
  get log(): Record[]{
    return [...this._log];
  }
  
  private _change: EventEmitter<Record[]> = new EventEmitter();
  get changeStream(): Observable<Record[]>{
    return this._change.asObservable();
  }

  public write(message:string, data: any | string, params:any = null){
    
    this._log.push(
      {
        data: data,
        date: new Date(Date.now()),
        message: message,
        params: params
      } as Record  
    );

    this._change.next(this._log);
  }
}
