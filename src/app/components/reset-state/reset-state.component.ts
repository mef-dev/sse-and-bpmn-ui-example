import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HeaderTextService } from 'src/app/services/header-text.service';
import { LogService } from 'src/app/services/log.service';

@Component({
  selector: 'app-reset-state',
  templateUrl: './reset-state.component.html',
  styleUrls: ['./reset-state.component.scss']
})
export class ResetStateComponent {
  stages: any[] = [
    {
      label: 'Resource Order Management',
      status: 'Reset completed',
      statusColor: 'green',
    },
    {
      label: 'On-Guard Tour',
      status: 'Reset in progress',
      statusColor: 'red',
    }
  ]

  constructor(
    private log: LogService,
    private translate: TranslateService,
    private textHeaderService: HeaderTextService
  ){
  }

  ngOnInit(): void {
    this.textHeaderService.text = this.translate.instant('Reset state');
    this.log.write('Open page', 'Reset state');
  }

  onReset(){
    console.log('onReset');
    this.log.write('Button click:', 'Reset');
  }
  
}
