import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HeaderTextService } from 'src/app/services/header-text.service';
import { LogService } from 'src/app/services/log.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private log: LogService,
    private translate: TranslateService,
    private textHeaderService: HeaderTextService
  ){
  }

  ngOnInit(): void {
    this.textHeaderService.text = this.translate.instant('Home');
    this.log.write('Open page *Home*', {someProp: 'page home'});
  }

}
