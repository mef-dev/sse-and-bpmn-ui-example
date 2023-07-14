import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HeaderTextService } from 'src/app/services/header-text.service';
import { LogService } from 'src/app/services/log.service';

@Component({
  selector: 'app-optimaze-network',
  templateUrl: './optimaze-network.component.html',
  styleUrls: ['./optimaze-network.component.scss']
})
export class OptimazeNetworkComponent {

  stages: any[] = [
    {
      label: 'Receive energy consumption data',
      status: 'Energy data received',
      statusColor: 'green',
    },
    {
      label: 'Receive demand data',
      status: 'Demand data received',
      statusColor: 'green',
    },
    {
      label: 'Divide responsibilities',
      status: 'Processing in progress',
      statusColor: 'darkgoldenrod',
    },
    {
      label: 'Update inventory state',
      status: 'To be started',
      statusColor: 'red',
    },
  ]

  constructor(
    private log: LogService,
    private translate: TranslateService,
    private textHeaderService: HeaderTextService
  ){
  }

  ngOnInit(): void {
    this.textHeaderService.text = this.translate.instant('Optimaze network');
    this.log.write('Open page', 'Optimaze network');
  }
  
  onOptimaze(){
    console.log('onOptimaze')
    this.log.write('Button click:', 'Optimaze');
  }

}
