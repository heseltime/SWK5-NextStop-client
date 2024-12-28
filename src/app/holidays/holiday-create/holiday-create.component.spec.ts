import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidayCreateComponent } from './holiday-create.component';

describe('HolidayCreateComponent', () => {
  let component: HolidayCreateComponent;
  let fixture: ComponentFixture<HolidayCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HolidayCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HolidayCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
