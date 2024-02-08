import { Injectable, Injector, Inject } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from 'src/service/auth.service';

@Injectable()
export class TimingInterceptor implements HttpInterceptor {
  authtoken: string = 'not yet set';

  constructor(private injector: Injector, @Inject(Router) private router: Router, private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.auth.token$.pipe(
      switchMap((token) => {
        if (!token) {
          token = sessionStorage.getItem('token') || '';
        }

        this.authtoken = token || '';

        const startTime = Date.now();

        try {
          // Using Injector to dynamically get the current component information
          const componentName = this.router.routerState.snapshot.url;

          // Add the Authorization header with the token
          const modifiedReq = req.clone({
            setHeaders: {
              'X-Component': componentName,
              Authorization: `Bearer ${this.authtoken}`,
            },
          });

          // Continue with the modified request
          return next.handle(modifiedReq).pipe(
            finalize(() => {
              const endTime = Date.now();
              const timeSpent = endTime - startTime;

              // Log or send the timeSpent and component information wherever needed
              console.log(
                `API Call "${req.method} ${req.url}" from component "${componentName}" took ${timeSpent}ms`
              );
            })
          );
        } catch (error) {
          console.error('Error getting component name:', error);
          // Continue with the original request if an error occurs
          return next.handle(req);
        }
      })
    );
  }
}
