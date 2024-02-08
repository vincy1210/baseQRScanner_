import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/service/auth.service';
import { Router } from '@angular/router';
import { CommonService } from 'src/service/common.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private common: CommonService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const userProfile = this.authService.getUserProfile();
    const selectedCompany = this.authService.getSelectedCompany();
    const isLCAUser = this.authService.getLCAUser();
    this.checkAccessAvailable(route);

    if (this.authService.isAuthenticated()) {
      const requiredRole = route.data?.['role'];

      if (!requiredRole || !Array.isArray(requiredRole)) {
        // If roles are not specified or not an array, return false
        this.router.navigate(['/login']);
        return false;
      }

      const userRole = isLCAUser
        ? this.authService.getLCAUser()
        : this.authService.getSelectedCompany().role;

      if (requiredRole.includes(userRole)) {
        return true;
      } else {
        // Redirect or handle unauthorized access
        // this.router.navigate(['/login']);
        return false;
      }
    } else {
      // Redirect to the login page or another route
      this.router.navigate(['/login']);
      return false;
    }
  }

  checkAccessAvailable(route: ActivatedRouteSnapshot) {
    // const requiredRoles = route.data['requiredRoles'] as number[];
    const name = route.data['name'];
    const requiredRoles = this.common.allPagesDetails(name)?.requiredRoles
      ? this.common.allPagesDetails(name)?.requiredRoles
      : [];
    const { Roles } = this.common.getUserDetails();
    if (Roles != null) {
      const allRoles: number[] = Array.isArray(Roles) ? Roles : [];
      if (this.common.isArrayIncluded(allRoles, requiredRoles)) {
        return true;
      } else {
        this.router.navigate(['/access-denied']);
        return false;
      }
    } else {
      return true;
    }
  }
}
