import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonService } from 'src/service/common.service';
import { Router } from '@angular/router';

interface RouteDataWithRole {
  role: string;
}


@Injectable({
  providedIn: 'root'
})



export class RoleGuard implements CanActivate {

constructor(private common:CommonService, private router:Router){

}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    //   const requiredRole = (next.data as RouteDataWithRole).role; 
    //   if (this.auth.userRole === requiredRole) {
    //     return true;
    //   }
    //   this.router.navigate(['/unauthorized']);
    //   return false;
    // }

    return true;
  }
  
}
