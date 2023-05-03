/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AppCentralService } from './app-central.service';

describe('Service: AppCentral', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppCentralService]
    });
  });

  it('should ...', inject([AppCentralService], (service: AppCentralService) => {
    expect(service).toBeTruthy();
  }));
});
