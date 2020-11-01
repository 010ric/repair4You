import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Vehicle } from './vehicle';

const baseUrl = 'http://localhost:4242';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  constructor(private http: HttpClient) {}

  private async request(method: string, url: string, data?: any) {
    // We will skip authentication and autorization for now
    // const token = await this.oktaAuth.getAccessToken();
    console.log('request ' + JSON.stringify(data));
    const result = this.http.request(method, url, {
      body: data,
      responseType: 'json',
      observe: 'body',
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }),
      params: new HttpParams().set('maintenanceDate', data)
    });
    return new Promise<any>((resolve, reject) => {
      result.subscribe(resolve as any, reject as any);
    });
  }

  getVehicles(inputDate: Date) {
    // Return all vehicle data
    return this.request('post', `${baseUrl}/api/maintenance`, inputDate);
  }

  createVehicle(Vehicle: Vehicle) {
    console.log('createVehicle ' + JSON.stringify(Vehicle));
    return this.request('post', `${baseUrl}/api/maintenance/new`, Vehicle);
  }
}
