/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AircraftPilotComponent } from './aircraft-pilot.component';

describe('AircraftPilotComponent', () => {
  let component: AircraftPilotComponent;
  let fixture: ComponentFixture<AircraftPilotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AircraftPilotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AircraftPilotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
