import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from "../../auth/services/user.service";

@Injectable({
    providedIn: 'root',
})
export class isAuthenticatedGuard implements CanActivate {

    constructor(
        private userService: UserService,
        private router: Router,
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): boolean {
        const isAuthenticated = this.userService.isAuthenticated();
        if (!isAuthenticated)
            return true;
        else {
            this.router.navigate(['/home']);
            return false;
        }
    }

}
