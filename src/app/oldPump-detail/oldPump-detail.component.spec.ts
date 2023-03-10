import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PumpDetailComponent } from './oldPump-detail.component';

describe('PumpDetailComponent', () => {
  let component: PumpDetailComponent;
  let fixture: ComponentFixture<PumpDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PumpDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PumpDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
