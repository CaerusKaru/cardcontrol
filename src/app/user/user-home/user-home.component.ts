import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent implements OnInit {

  activeLinkIndex = 0;

  navLinks = [
    {route: '', label: 'My ID'},
    {route: '/areas', label: 'My Areas'},
    {route: '/request', label: 'Request Access'}
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {

    function findTab(nav) {
      if (nav.route === '') {
        return router.url === '' || router.url === '/';
      }
      return router.url.indexOf(nav.route) !== -1;
    }

    this.activeLinkIndex =
      this.navLinks.indexOf(this.navLinks.find(findTab));
  }

  ngOnInit() {
  }

  utln = 'hescott';

}
