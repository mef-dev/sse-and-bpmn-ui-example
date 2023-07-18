import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PluginEndpoints } from '../endpoints/plugin';
import { PaggedList } from '../models/pagged-list.model';
import { ServicePublic } from '../models/service-public.model';
import { PlatformConnectorService } from './platform-connector.service';
import { EventSourcePolyfill } from 'ng-event-source';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlatformApiService {
  constructor(
    private platformConnectorService: PlatformConnectorService
  ) { }

  callBpmn(data: any): Observable<any>{
    return this.platformConnectorService.HttpClient.post(PluginEndpoints.FlowDefinition, data);
  }

  getSseEvent(serviceId: number): EventSourcePolyfill{
     return new EventSourcePolyfill(
      `${PluginEndpoints.eventSource}?serviceId=${serviceId}`,
      { 
        headers: { 'Authorization': this.GetAuthorization() }, 
        heartbeatTimeout: 0
      }
    )
  }

  sendSseEvent(serviceId: number, message: any): Observable<any>{
    return this.platformConnectorService.HttpClient.post(
      PluginEndpoints.eventSend,
      {
        serviceId: serviceId,
        message: message
      }
   )
 }

 private GetAuthorization(): string{
  // @ts-ignore
  if(!environment.production && environment?.['bauth']){
    // @ts-ignore
    return `Basic ${btoa(environment.bauth)}`;
  }

  return `Bearer ${localStorage.getItem('token')}`;
 }
}
