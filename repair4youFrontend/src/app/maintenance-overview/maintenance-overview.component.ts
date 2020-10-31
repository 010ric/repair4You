import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-maintenance-overview',
  templateUrl: './maintenance-overview.component.html',
  styleUrls: ['./maintenance-overview.component.css']
})
export class MaintenanceOverviewComponent implements OnInit {
  constructor() {}

  /*
  
  id: Numeric (Mandatory),
  vehicleBrand: String(Mandatory),
  vehicleLicencePlate: String(Mandatory),
  maintenanceDate: Date (Mandatory)
  vehicleContactPerson: String,
  vehicleContactNumber: String
  
  */

  data = [];
  displayColumns: string[] = [
    'ID',
    'vehicleBrand',
    'vehicleLicencePlate',
    'maintenanceDate',
    'vehicleContactPerson',
    'vehicleContactNumber'
  ];
  dataSource = new MatTableDataSource<any>();

  ngOnInit(): void {
    this.data = this.getData();
    this.dataSource.data = this.data;
  }

  private getData(): any {
    return [
      {
        year: 1991,
        movie: 'Critters 3',
        role: 'Josh',
        director: 'Kristine Peterson',
        notes: 'Direct-to-video'
      },
      {
        year: 1992,
        movie: 'Poison Ivy',
        role: 'Guy',
        director: 'Katt Shea',
        notes: 'Credited as Leonardo Di Caprio'
      },
      {
        year: 1993,
        movie: "This Boy's Life",
        role: 'Tobias Toby Wolff',
        director: 'Michael Caton-Jones'
      }
    ];
  }
}
