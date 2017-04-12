import { Component, OnInit } from '@angular/core';
import {User} from "../../shared/user";
import {Observable} from "rxjs";
import {FormControl} from "@angular/forms";
import {UserService} from "../shared/user.service";
import {RequestService} from "../../request/request.service";

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements OnInit {

  constructor(
    private userService : UserService,
    private requestService : RequestService
  ) { }

  ngOnInit() {
    this.userControl.valueChanges
      .subscribe(name => {
        this.selectedUser = (typeof name === 'object') ? name : null;
        this.flUsers = this.requestService.getUsersPartial(name);
      });
  }

  public selectedUser : User;
  public userControl = new FormControl();
  public flUsers : Observable<User[]>;

  public change () {
    this.userService.setUtln(this.selectedUser.utln);
  }

  public userName (user : User) : string {
    return user ? user.utln : '';
  }
}
