import {Component, Input, OnInit} from '@angular/core';
import {Domain} from "../../../shared/domain";

@Component({
  selector: 'app-domain-list',
  templateUrl: './domain-list.component.html',
  styleUrls: ['./domain-list.component.scss']
})
export class DomainListComponent implements OnInit {

  @Input ()
  private domains : Domain[];

  constructor() { }

  ngOnInit() {
  }

}
