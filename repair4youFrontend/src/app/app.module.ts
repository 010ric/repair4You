import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MaintenanceOverviewComponent } from './maintenance-overview/maintenance-overview.component';
import { MaintenanceMeetingComponent } from './maintenance-meeting/maintenance-meeting.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { VehicleService } from './vehicle/vehicle.service';

const appRoutes: Routes = [
  { path: 'overview', component: MaintenanceOverviewComponent },
  { path: 'newMeeting', component: MaintenanceMeetingComponent },
  { path: '', redirectTo: '/overview', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    MaintenanceOverviewComponent,
    MaintenanceMeetingComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserAnimationsModule,
    MatTableModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
