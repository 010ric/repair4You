import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceOverviewComponent } from './maintenance-overview.component';

describe('MaintenanceOverviewComponent', () => {
  let component: MaintenanceOverviewComponent;
  let fixture: ComponentFixture<MaintenanceOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintenanceOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
