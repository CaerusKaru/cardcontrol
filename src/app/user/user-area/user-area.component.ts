import { Component, OnInit } from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';

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

  chooseBuilding (resource) {
    let dialogRef = this.dialog.open(UserAreaDialog);
    dialogRef.componentInstance.name = resource.name;
  }

  lat: number = 51.678418;
  lng: number = 7.809007;

}

@Component({
  selector: 'app-user-area-dialog',
  templateUrl: 'user-area-building-dialog.component.html'
})
export class UserAreaDialog {

  constructor (dialogRef : MdDialogRef<UserAreaDialog>) {
  }
  name : string;
}
