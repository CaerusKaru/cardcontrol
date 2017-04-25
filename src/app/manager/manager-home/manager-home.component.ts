import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {UserService} from '../../user/shared/user.service';
import {RequestService} from '../../request/request.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-manager-home',
  templateUrl: './manager-home.component.html',
  styleUrls: ['./manager-home.component.scss']
})
export class ManagerHomeComponent implements OnInit {

  public numAreas = 0;
  public numRequests = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private requestService: RequestService
  ) { }

  ngOnInit() {
    this.userService.userAccount.subscribe(data => {
      this.numAreas = data.access_points_managed.length;
      let apIdReqs = data.access_points_managed.map(d => { return this.requestService.getRequestsForAp(d.id) });
      Observable.forkJoin(apIdReqs).subscribe(data => {
        this.numRequests = data.length;
      });
    });
  }

  public openAreas() {
    this.router.navigate(['areas'], {relativeTo: this.route});
  }

  public openRequests() {
    this.router.navigate(['requests'], {relativeTo: this.route});
  }
}
