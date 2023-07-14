import {TranslateLoader} from '@ngx-translate/core';
import { IHttpService, PlatformHelper } from '@natec/mef-dev-platform-connector';
import { Observable , forkJoin} from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from '../services/http.service';

export class CustomLoader implements TranslateLoader {

  httpClient: IHttpService = PlatformHelper.getPlatformHttpClient();
  constructor(
      private httpService: HttpService
    ) {
      if(!this.httpClient){
        this.httpClient = this.httpService;
      }
    }

  getTranslation(langCountry: string): Observable<any> {
    if(!langCountry){
      langCountry = 'en';
    }
    
    if (!langCountry.includes('_')) {
      return this.httpClient.get(PlatformHelper.getAssetUrl() + '/i18n/' + langCountry + '.json');
    }

    const arr = langCountry.split('_');
    return forkJoin([
       this.httpClient.get(PlatformHelper.getAssetUrl() + '/i18n/' + arr[0] + '.json'),
       this.httpClient.get(PlatformHelper.getAssetUrl() + '/i18n/' + arr[1] + '/' + langCountry + '.json')
      ])
      .pipe(map(data => {
        const res = {};
        data.forEach((obj) => {
          Object.assign(res, obj);
        });
        return res;
      }));
  }
}