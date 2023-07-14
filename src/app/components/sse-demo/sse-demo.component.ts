import { Component, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { HeaderTextService } from 'src/app/services/header-text.service';
import { LogService } from 'src/app/services/log.service';
import { PlatformApiService } from 'src/app/services/platform-api.service';
import { Record } from '../../models/log/record.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sse-demo',
  templateUrl: './sse-demo.component.html',
  styleUrls: ['./sse-demo.component.scss']
})
export class SseDemoComponent {

  serviceID: number = 123;
  stream: Observable<any>;
  subscribeStatus: 'disabled' | 'estabilished' | 'inProgress' = 'disabled'

  sendMessage: string = 'Hello world!';

  records: Record[] = [];

  constructor(
    private platformApiService: PlatformApiService,
    private log: LogService,
    private translate: TranslateService,
    private textHeaderService: HeaderTextService,
    private _zone: NgZone
  ){
    textHeaderService.text = this.translate.instant('SSE Demo');
    this.log.write('Open page', 'SSE Demo');
  }

  onSend(){
    this.platformApiService.sendSseEvent(this.serviceID, {
      someMsg: this.sendMessage 
    }).subscribe(
      x => {
        this.log.write('stream OK: ', x)
      },
      err => {
        this.log.write('stream ERROR: ', err);
      }
    )
  }

  onSubscribe(){
    this.subscribeStatus = 'inProgress';
    this.stream = Observable.create((observer:any) => {
      const eventSource = this.platformApiService.getSseEvent(this.serviceID);
      eventSource.onmessage = event => {
        this._zone.run(() => {
          if(this.subscribeStatus != 'estabilished'){
            this.subscribeStatus = 'estabilished';
          }
          observer.next(event);
        });
      };
      eventSource.onerror = (error:any) => {
        this._zone.run(() => {
          if(this.subscribeStatus != 'disabled'){
            this.subscribeStatus = 'disabled';
          }
          observer.error(error);
        });
      };
    });

    this.records = [];

    this.stream.subscribe(
      x => {
        this.log.write('stream OK: ', x)
        this.records.push({
          message: 'OK',
          data: x,
          date: new Date(Date.now())
        } as Record)
      },
      err => {
        this.log.write('stream ERROR: ', err);
        this.records.push({
          message: 'ERROR',
          data: err,
          date: new Date(Date.now())
        } as Record)
      }
    )
  }

  getTime(date:Date):string{
    const tmp = date.toISOString();
    return tmp.substring(tmp.indexOf('T')+1, tmp.indexOf('Z'));
  }
}
