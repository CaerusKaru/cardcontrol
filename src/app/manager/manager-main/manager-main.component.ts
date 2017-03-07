import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manager-main',
  templateUrl: 'manager-main.component.html',
  styleUrls: ['manager-main.component.scss']
})
export class ManagerMainComponent implements OnInit {

  navItems = [
    {route: ".", name: "Home", admin: false},
    {route: "buildings", name: "My Buildings", admin: false},
    {route: "requests", name: "Pending Requests", admin: false},
    {route: "createID", name: "Create ID", admin: true},
    {route: "createBuilding", name: "Create Building", admin: true},
    {route: "search", name: "Search", admin: false},
  ];

  constructor() { }

  ngOnInit() {
  }

  utln = "hescott";
  isAdmin = true;

  logOut() {
    alert("Logging out!");
  }

}
