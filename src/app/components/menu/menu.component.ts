import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PlatformHelper } from '@natec/mef-dev-platform-connector';
import { HeaderTextService } from 'src/app/services/header-text.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  
  private isPluginUrls: boolean = environment.production;

  get URL(): string{
    return this.router.url;
  }

  constructor(
    private router:Router,
  ){
  }

  public isActiveUrl(urlToFind: string):boolean{
    return this.URL.endsWith(urlToFind)
  }

  public formatedUrl(url: string):string{
    if(this.isPluginUrls){
      return `/console/plugins/${PlatformHelper.getPluginData().pluginPath}${url}`;
    }

    return url;
  }

}
