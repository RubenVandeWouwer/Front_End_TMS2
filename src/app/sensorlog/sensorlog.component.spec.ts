import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorlogComponent } from './sensorlog.component';

describe('SensorlogComponent', () => {
  let component: SensorlogComponent;
  let fixture: ComponentFixture<SensorlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SensorlogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SensorlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
