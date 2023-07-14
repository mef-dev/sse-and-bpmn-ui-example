import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HeaderTextService } from 'src/app/services/header-text.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {

  get contentHeader():string{
    return this.textHeaderService.text;
  } 

  constructor(
    private translate: TranslateService,
    private textHeaderService: HeaderTextService,
  ) { 

  }

  ngOnInit(): void {
    console.log(this.translate.instant('test'));
  }

}
