import {AccessPoint} from "./access-point";
export class UserAccount {
  id : number;
  first_name : string;
  last_name : string;
  card : string;
  resource_uri : string;
  utln : string;
  manager_level : number;
  access_points : AccessPoint[];
  access_points_managed : AccessPoint[];
}
