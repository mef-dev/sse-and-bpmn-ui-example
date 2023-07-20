import { Injectable } from '@angular/core';
import { IHttpService, PluginLocalData, PlatformHelper } from '@natec/mef-dev-platform-connector';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class PlatformConnectorService {
  
  private platformHttpService: IHttpService | undefined = PlatformHelper.getPlatformHttpClient();

  constructor(
    private _http: HttpService // own implement(for ng-serve)
    ) {
  }

  get HttpClient(): IHttpService{
    return this.platformHttpService ?? this._http;
  }

  get PluginData(): PluginLocalData | undefined{
    return PlatformHelper.getPluginData();
  }
  
  getAssetUrl(path: string): string{
    return `${PlatformHelper.getAssetUrl()}/${path}`;
  }
}
