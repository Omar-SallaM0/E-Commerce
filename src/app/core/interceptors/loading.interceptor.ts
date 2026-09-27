import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
//import { Observable } from 'rxjs/internal/Observable';
import { finalize, Observable } from 'rxjs';
@Injectable()
export class loadingInterceptorTsInterceptor implements HttpInterceptor {
  constructor(private spinner: NgxSpinnerService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.spinner.show();
    return next.handle(req).pipe(
      finalize(() => {
        this.spinner.hide();
      })
    );
  }
}

// import { HttpInterceptorFn } from '@angular/common/http';
// import { inject } from '@angular/core';


// export const myLoadingInterceptor: HttpInterceptorFn = (req, next) => {
//   const spiner = inject(NgxSpinnerService);
//   spiner.show();
//   return next(req).pipe(
//     finalize(() => {
//       spiner.hide();
//     })
//   );
// };
