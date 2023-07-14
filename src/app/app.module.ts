import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { CustomLoader } from './helpers/custom-translate-loader.helper';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthInterceptor } from './intercept/http-mw.intercept';
import { ContainerComponent } from './components/container/container.component';
import { MenuComponent } from './components/menu/menu.component';
import { LogComponent } from './components/log/log.component';
import { HomeComponent } from './components/home/home.component';
import { OptimazeNetworkComponent } from './components/optimaze-network/optimaze-network.component';
import { ResetStateComponent } from './components/reset-state/reset-state.component';
import { MefDevCardModule, MefDevPageLayoutsModule } from '@natec/mef-dev-ui-kit';
import { JsonFormatterComponent } from './components/json-formatter/json-formatter.component';
import { BpmnCallComponent } from './components/bpmn-call/bpmn-call.component';
import { SseDemoComponent } from './components/sse-demo/sse-demo.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    MenuComponent,
    LogComponent,
    HomeComponent,
    OptimazeNetworkComponent,
    ResetStateComponent,
    JsonFormatterComponent,
    BpmnCallComponent,
    SseDemoComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useClass: CustomLoader,
				deps: [HttpClient],
			}
		}),
    MefDevPageLayoutsModule,
    MefDevCardModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private translate:TranslateService) {
    this.translate.setDefaultLang(localStorage.getItem('language') ?? 'en');
	}   
 }
