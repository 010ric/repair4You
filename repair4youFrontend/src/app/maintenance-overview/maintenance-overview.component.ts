import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { VehicleService } from '../vehicle/vehicle.service';
import { Vehicle } from '../vehicle/vehicle';

@Component({
  selector: 'app-maintenance-overview',
  templateUrl: './maintenance-overview.component.html',
  styleUrls: ['./maintenance-overview.component.css']
})
export class MaintenanceOverviewComponent implements OnInit {
  constructor(public vehicleService: VehicleService) {}

  displayedColumns: string[] = [
    'Id',
    'vehicleBrand',
    'vehicleLicencePlate',
    'maintenanceDate',
    'vehicleContactPerson',
    'vehicleContactNumber'
  ];
  dataSource = new MatTableDataSource<Vehicle>();
  loading = false;

  selectedVehicle: Vehicle = new Vehicle();
  selectedDate: Date = new Date();

  ngOnInit(): void {
    this.refresh();
  }

  async refresh() {
    this.loading = true;
    const data = await this.vehicleService.getVehicles(this.selectedDate);
    console.log(data);
    this.dataSource.data = data;
    this.loading = false;
  }

  async updateSelectedDate() {
    this.selectedDate = new Date();
    this.refresh();
  }
}
