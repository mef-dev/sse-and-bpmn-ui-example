import { Component } from '@angular/core';

@Component({
  selector: 'server-side-ui-example', // selector is pluginUIName(in platform)
  template: `<router-outlet></router-outlet>`
})
export class AppComponent{
  title = 'platform-connector';
  constructor(  ){
  }
}
