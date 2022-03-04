import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, delay, Observable, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private toaster: ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((e: any) => {
        let err;
        if(e){
          if(e.status === 400){
            if(e.error.errors){
              err = e.error;
              throwError(() => e.error);
            }
            else{
              this.toaster.error(e.error.message, e.error.statusCode);
            }

          }

          if(e.status === 401){
            this.toaster.error(e.error.message, e.error.statusCode);
          }

          if(e.status === 404){
            this.router.navigateByUrl('/notfounderror');
          }
          else if(e.status === 500){
            const navigationExtras: NavigationExtras = {state: {e: e.error}};
            this.router.navigateByUrl('/servererror', navigationExtras);
          }

          err = e;
        }
        return throwError(() => err);
      })
    );
  }
}
