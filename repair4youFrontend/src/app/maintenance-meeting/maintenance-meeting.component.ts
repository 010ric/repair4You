import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VehicleService } from '../vehicle/vehicle.service';
import { Vehicle } from '../vehicle/vehicle';
import { Router } from '@angular/router';

@Component({
  selector: 'app-maintenance-meeting',
  templateUrl: './maintenance-meeting.component.html',
  styleUrls: ['./maintenance-meeting.component.css']
})
export class MaintenanceMeetingComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    public vehicleService: VehicleService,
    private router: Router
  ) {}

  meetingForm: FormGroup;
  public errorMessage: string = 'Nothing bad happend yet...';
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
    this.newVehicle = this.meetingForm.value;
    const result = await this.vehicleService.createVehicle(this.newVehicle);
    console.log(result);
    if (result.success) {
      this.router.navigate(['overview']);
    } else if (!result.success) {
      // Display error message to user
      this.errorMessage = result.errorMessage;
    } else {
      console.log(result);
    }
  }
}
