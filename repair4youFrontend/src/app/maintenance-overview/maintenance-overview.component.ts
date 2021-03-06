import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {
  MatDatepickerModule,
  MatDatepickerInputEvent
} from '@angular/material/datepicker';
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
    const result = await this.vehicleService.getVehicles(this.selectedDate);
    this.dataSource.data = result.data;
    this.loading = false;
  }

  async updateSelectedDate(type: string, event: MatDatepickerInputEvent<Date>) {
    console.log(event.value);
    this.selectedDate = new Date(event.value);
    this.refresh();
  }
}
