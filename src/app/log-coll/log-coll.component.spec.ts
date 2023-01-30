import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogCollComponent } from './log-coll.component';

describe('LogCollComponent', () => {
  let component: LogCollComponent;
  let fixture: ComponentFixture<LogCollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogCollComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogCollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
