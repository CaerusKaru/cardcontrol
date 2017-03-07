import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-manager-home',
  templateUrl: './manager-home.component.html',
  styleUrls: ['./manager-home.component.scss']
})
export class ManagerHomeComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
  }

  openBuildings() {
    this.router.navigate(['buildings'], {relativeTo: this.route});
  }

  openRequests() {
    this.router.navigate(['requests'], {relativeTo: this.route});
  }
}
