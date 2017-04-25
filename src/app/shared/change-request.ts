export class ChangeRequest {
  created_by : string;
  modified_by : string;
  new_card : string;
  cur_card: string;
  new_access_points : string[];
  granted_access_points : string[];
  feedback : string;
  reason : string;
  resource_uri : string;
  id : number;
  request_level : number;
  status : number;
  user : string;
  modified_at : string;
  utln: string;
}
