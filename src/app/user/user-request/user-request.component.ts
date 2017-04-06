import { Component, OnInit } from '@angular/core';
import {ChangeRequest} from "../../shared/change-request";
import {RequestService} from "../../request/request.service";

@Component({
  selector: 'app-user-request',
  templateUrl: './user-request.component.html',
  styleUrls: ['./user-request.component.scss']
})
export class UserRequestComponent implements OnInit {

  constructor(
    private requestService : RequestService
  ) { }

  ngOnInit() {
    this.activeTabIndex = 0;
    this.getRequests();
  }

  activeTabIndex : number;

  requests : ChangeRequest[];

  getRequests () {
    this.requestService.getRequests().filter(data => data !== null).subscribe(data => this.requests = data);
  }

}
