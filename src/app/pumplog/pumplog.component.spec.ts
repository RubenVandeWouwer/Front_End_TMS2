import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PumplogComponent } from './pumplog.component';

describe('PumplogComponent', () => {
  let component: PumplogComponent;
  let fixture: ComponentFixture<PumplogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PumplogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PumplogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
