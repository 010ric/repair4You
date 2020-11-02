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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

const appRoutes: Routes = [
  { path: 'overview', component: MaintenanceOverviewComponent },
  { path: 'newMeeting', component: MaintenanceMeetingComponent },
  { path: '', redirectTo: '/overview', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

/* 

Nice new issue: ERROR Error: mat-form-field must contain a MatFormFieldControl.

related to: https://github.com/angular/components/issues/7898 && 
https://stackoverflow.com/questions/53935928/angular-mat-form-field-must-contain-a-matformfieldcontrol/54532814

*/

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
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  exports: [MatFormFieldModule, MatInputModule],
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
