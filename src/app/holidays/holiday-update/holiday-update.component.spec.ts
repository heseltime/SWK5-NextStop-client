import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidayUpdateComponent } from './holiday-update.component';

describe('HolidayUpdateComponent', () => {
  let component: HolidayUpdateComponent;
  let fixture: ComponentFixture<HolidayUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HolidayUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HolidayUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
