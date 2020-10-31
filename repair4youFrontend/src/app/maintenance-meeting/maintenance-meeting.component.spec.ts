import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceMeetingComponent } from './maintenance-meeting.component';

describe('MaintenanceMeetingComponent', () => {
  let component: MaintenanceMeetingComponent;
  let fixture: ComponentFixture<MaintenanceMeetingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintenanceMeetingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
