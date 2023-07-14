import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs/internal/Observable"
import { tap } from "rxjs/operators"
import { environment } from "src/environments/environment";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    let authReq = req.clone({
      headers: req.headers
    });

    // @ts-ignore
    if(!environment.production && environment?.['bauth']){
      authReq = req.clone({
        headers: req.headers
          // @ts-ignore
          .set('Authorization', `Basic ${btoa(environment.bauth)}`)
      })
    }

    return next.handle(authReq).pipe(
      tap(
        (event) => {
        },
        (err) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status == 401)
              console.log('Unauthorized')
          }
        }
      )
    )
  }
}