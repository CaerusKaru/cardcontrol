import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {UserService} from "../user/shared/user.service";
import {UserAccount} from "./user_account";

@Injectable()
export class ManagerGuard implements CanActivate {

  constructor (private userService : UserService) {
    this.userService.userAccount.subscribe(data => this.userAccount = data);
  }

  private userAccount : UserAccount;

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.userService.userAccount.filter(data => data !== null).map((userAccount) => {
      return userAccount.manager_level > 0
    }).first();
  }
}
