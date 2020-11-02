import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VehicleService } from '../vehicle/vehicle.service';
import { Vehicle } from '../vehicle/vehicle';

@Component({
  selector: 'app-maintenance-meeting',
  templateUrl: './maintenance-meeting.component.html',
  styleUrls: ['./maintenance-meeting.component.css']
})
export class MaintenanceMeetingComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    public vehicleService: VehicleService
  ) {}

  meetingForm: FormGroup;
  newVehicle: Vehicle = new Vehicle();

  ngOnInit() {
    this.meetingForm = this.formBuilder.group({
      id: [null, [Validators.required]],
      vehicleBrand: [null, Validators.required],
      vehicleLicencePlate: [null, Validators.required],
      maintenanceDate: [null, Validators.required],
      vehicleContactPerson: [null],
      vehicleContactNumber: [null]
    });
  }

  async submit() {
    if (!this.meetingForm.valid) {
      return;
    }
    console.log(this.meetingForm.value);
    this.newVehicle = this.meetingForm.value;
    const result = await this.vehicleService.createVehicle(this.newVehicle);
    console.log(result);
  }
}
