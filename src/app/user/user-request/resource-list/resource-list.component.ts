import {Component, Input, OnInit} from '@angular/core';
import {ManagedResource} from "../../../shared/managed-resource";
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {AccessPoint} from "../../../shared/access-point";
import {RequestService} from "../../../request/request.service";

@Component({
  selector: 'app-resource-list',
  templateUrl: './resource-list.component.html',
  styleUrls: ['./resource-list.component.scss']
})
export class ResourceListComponent implements OnInit {

  @Input()
  private resources : ManagedResource[];

  constructor(
    private requestService : RequestService
  ) { }

  ngOnInit() {
    this.resourceControl.valueChanges.subscribe(
      data => {
        this.selectedResource = (typeof data === 'object') ? data : null;
      }
    );
    this.flResources = this.resourceControl.valueChanges
      .startWith(null)
      .map(name => this.filterResource(name));
  }

  public reasonWhy : string;
  public accessPoints : AccessPoint[];
  public resourceControl = new FormControl();
  public selectedResource : ManagedResource;
  public resource : ManagedResource;
  public flResources : Observable<ManagedResource[]>;

  public filterResource(name: string): ManagedResource[] {
    return name ? this.resources.filter((r) => r.resource_name.match(new RegExp(name, 'gi'))) :
      this.resources;
  }

  public resourceName (resource : ManagedResource) : string {
    return resource ? resource.resource_name : '';
  }

  public sendRequest() {
    console.log(this.accessPoints);
    this.requestService.makeAccessRequest(this.accessPoints, this.reasonWhy);
  }
}
