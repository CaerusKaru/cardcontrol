import { Component, OnInit } from '@angular/core';
import {User} from "../../shared/user";
import {Observable} from "rxjs";
import {FormControl} from "@angular/forms";
import {UserService} from "../../user/shared/user.service";
import {RequestService} from "../../request/request.service";

@Component({
  selector: 'app-manager-account',
  templateUrl: './manager-account.component.html',
  styleUrls: ['./manager-account.component.scss']
})
export class ManagerAccountComponent implements OnInit {

  constructor(
    private requestService : RequestService,
    private userService : UserService
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
