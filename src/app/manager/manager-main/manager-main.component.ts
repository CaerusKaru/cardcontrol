import { Component, OnInit } from '@angular/core';
import {UserService} from "../../user/shared/user.service";
import {UserAccount} from "../../shared/user_account";

@Component({
  selector: 'app-manager-main',
  templateUrl: 'manager-main.component.html',
  styleUrls: ['manager-main.component.scss']
})
export class ManagerMainComponent implements OnInit {

  constructor(
    private userService : UserService
  ) { }

  ngOnInit() {
    this.userService.userAccount.subscribe(
      data => {
        this.userAccount = data;
        this.utln = data.utln;
        this.isAdmin = data.manager_level == 2;
      }
    );
  }

  public navItems = [
    {route: ".", name: "Home", admin: false},
    {route: "users", name: "Users", admin: true},
    {route: "areas", name: "Areas", admin: false},
    {route: "requests", name: "Requests", admin: false}
  ];

  public utln : string;
  public isAdmin : boolean;

  public logOut() {
    console.log("Logging out!");
  }

  private userAccount : UserAccount;

}
