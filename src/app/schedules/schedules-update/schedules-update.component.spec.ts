import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulesUpdateComponent } from './schedules-update.component';

describe('SchedulesUpdateComponent', () => {
  let component: SchedulesUpdateComponent;
  let fixture: ComponentFixture<SchedulesUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchedulesUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchedulesUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
