import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  navLinks = [
    {route: 'request', label: 'Request Access'},
    {route: 'areas', label: 'My Areas'},
  ];

  utln : string = 'hescott';

}
