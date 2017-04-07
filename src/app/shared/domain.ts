import {ManagedResource} from "./managed-resource";
export class Domain {
  domain_name : string;
  id : number;
  resource_uri : string;
  parent : string;
  resource_children : ManagedResource[];
  domain_children : Domain[];
}
