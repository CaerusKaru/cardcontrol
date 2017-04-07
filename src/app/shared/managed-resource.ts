import {AccessPoint} from "./access-point";
export class ManagedResource {
  city : string;
  country : string;
  resource_name : string;
  resource_uri : string;
  state : string;
  id : number;
  address : string;
  zipcode : string;
  children : AccessPoint[];
  parent : string;
}
