import { Component, OnInit } from '@angular/core';
import {MdDialog} from '@angular/material';

@Component({
  selector: 'app-user-area',
  templateUrl: './user-area.component.html',
  styleUrls: ['./user-area.component.scss']
})
export class UserAreaComponent implements OnInit {

  constructor(
    public dialog: MdDialog
  ) { }

  ngOnInit() {
  }

  buildings = [
    {
      name: "Metcalf Hall",
      rooms: [
        {
          name: "East Entrance"
        },
        {
          name: "West Entrance"
        }
      ]
    },
    {
      name: "Harleston Hall",
      rooms: [
        {
          name: "Main Entrance"
        }
      ]
    }
  ];

  chooseBuilding (name : string) {
    this.dialog.open(UserAreaDialog);
  }

  lat: number = 51.678418;
  lng: number = 7.809007;

}

@Component({
  selector: 'app-user-area-dialog',
  template: '<h1>Help!</h1>'
})
export class UserAreaDialog {
}
