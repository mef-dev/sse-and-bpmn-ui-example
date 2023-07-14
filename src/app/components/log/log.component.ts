import { Component } from '@angular/core';
import { Record } from '../../models/log/record.model';
import { LogService } from 'src/app/services/log.service';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent {

  logList: Record[] = [];
  statusList: Record[] = [
    {
      data: 'estabilished',
      date: new Date(Date.now()),
      message: 'Connectivity to ROM: ',
      params: { color: 'red' }
    } as Record,
    {
      data: 'estabilished',
      date: new Date(Date.now()),
      message: 'Connectivity to RPM: ',
      params: { color: 'green' }
    } as Record,
    {
      data: 'estabilished',
      date: new Date(Date.now()),
      message: 'Connectivity to OGT: ',
      params: { color: 'blue' }
    } as Record
  ];


  
  constructor(
    private log: LogService,
  ) { 
    this.log.changeStream.subscribe(x => {
      this.logList = x;
      setTimeout(() => {
        const element = document.getElementById('logs-data')!;
        element.scrollTop = element.scrollHeight;
      }, 50)
    })
  }

  getJson(a:any){ return JSON.parse(JSON.stringify(a.data) || '') }

  getTime(date:Date):string{
    const tmp = date.toISOString();
    return tmp.substring(tmp.indexOf('T')+1, tmp.indexOf('Z'));
  }

}
