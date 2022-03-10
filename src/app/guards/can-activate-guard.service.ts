import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../login/login.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CanActivateGuardService implements CanActivate {

  constructor(private loginService: LoginService, private router: Router, private jwtHelperService: JwtHelperService, private toaster: ToastrService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    console.log(this.router.url)

    const token = sessionStorage.getItem("currentUser") ?
      JSON.parse(sessionStorage.getItem("currentUser") as string).token :
      null;

    const decodedData = this.jwtHelperService.decodeToken(token);

    if (this.loginService.isAuthenticated() &&
      route.data.roles.includes(decodedData.role)) {
      return true; //User can navigate to the requested route
    }
    else {
      this.showError('Unauthorized', 'You are not authorized to access this page')
      this.router.navigate(["/login"])
      return false; // User cannot navigate to the request route
    }
  }

  showError(title: string, message: string) {
    this.toaster.error(title, message)
  }
}
