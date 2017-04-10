import {Component, Input, OnInit} from '@angular/core';
import {Domain} from "../../../shared/domain";
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";

@Component({
  selector: 'app-domain-list',
  templateUrl: './domain-list.component.html',
  styleUrls: ['./domain-list.component.scss']
})
export class DomainListComponent implements OnInit {

  @Input ()
  private domains : Domain[];

  constructor() {
  }

  ngOnInit() {
    this.domainControl.valueChanges.subscribe(
      data => {
        this.selectedDomain = (typeof data === 'object') ? data : null;
      }
    );
    this.flDomains = this.domainControl.valueChanges
      .startWith(null)
      .map(name => this.filterDomain(name));
  }

  public domainControl = new FormControl();
  public selectedDomain : Domain;
  public flDomains : Observable<Domain[]>;

  public filterDomain(name: string): Domain[] {
    return name ? this.domains.filter((d) => d.domain_name.match(new RegExp(name, 'gi'))) : this.domains;
  }

  public domainName (domain : Domain) : string {
    return domain ? domain.domain_name : '';
  }
}
