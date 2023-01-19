import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PumpchartComponent } from './pumpchart.component';

describe('PumpchartComponent', () => {
  let component: PumpchartComponent;
  let fixture: ComponentFixture<PumpchartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PumpchartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PumpchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
