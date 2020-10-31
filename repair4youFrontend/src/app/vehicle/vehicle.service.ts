import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OktaAuthService } from '@okta/okta-angular';
import { Vehicle } from './vehicle';

const baseUrl = 'http://localhost:4201';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  constructor(public oktaAuth: OktaAuthService, private http: HttpClient) {}

  private async request(method: string, url: string, data?: any) {
    const token = await this.oktaAuth.getAccessToken();

    console.log('request ' + JSON.stringify(data));
    const result = this.http.request(method, url, {
      body: data,
      responseType: 'json',
      observe: 'body',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return new Promise<any>((resolve, reject) => {
      result.subscribe(resolve as any, reject as any);
    });
  }

  getVehicles() {
    return this.request('get', `${baseUrl}/Vehicle`);
  }

  getVehicle(id: string) {
    return this.request('get', `${baseUrl}/Vehicle/${id}`);
  }

  createVehicle(Vehicle: Vehicle) {
    console.log('createVehicle ' + JSON.stringify(Vehicle));
    return this.request('post', `${baseUrl}/Vehicle`, Vehicle);
  }

  updateVehicle(Vehicle: Vehicle) {
    console.log('updateVehicle ' + JSON.stringify(Vehicle));
    return this.request('post', `${baseUrl}/Vehicle/${Vehicle.id}`, Vehicle);
  }

  deleteVehicle(id: string) {
    return this.request('delete', `${baseUrl}/Vehicle/${id}`);
  }
}
