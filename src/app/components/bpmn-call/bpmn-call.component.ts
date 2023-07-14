import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HeaderTextService } from 'src/app/services/header-text.service';
import { LogService } from 'src/app/services/log.service';
import { PlatformApiService } from 'src/app/services/platform-api.service';

@Component({
  selector: 'app-bpmn-call',
  templateUrl: './bpmn-call.component.html',
  styleUrls: ['./bpmn-call.component.scss']
})
export class BpmnCallComponent {

  constructor(
    private platformApiService: PlatformApiService,
    private log: LogService,
    private translate: TranslateService,
    private textHeaderService: HeaderTextService,
  ){
    textHeaderService.text = this.translate.instant('Bpmn call');
    this.log.write('Open page', 'Bpmn call');
  }

  onCall(){
    this.platformApiService.callBpmn({prop: 'some bpmn echo'}).subscribe(
      x => {
        console.log(x)
        this.log.write('BPMN Call OK: ', x)
      },
      err => {
        console.log(err)
        this.log.write('BPMN Call ERROR: ', err)
      }
    )
  }
}
