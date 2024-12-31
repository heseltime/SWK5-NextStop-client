import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulesCreateComponent } from './schedules-create.component';

describe('SchedulesCreateComponent', () => {
  let component: SchedulesCreateComponent;
  let fixture: ComponentFixture<SchedulesCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchedulesCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchedulesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
