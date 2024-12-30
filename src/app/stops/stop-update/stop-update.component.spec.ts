import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StopUpdateComponent } from './stop-update.component';

describe('StopUpdateComponent', () => {
  let component: StopUpdateComponent;
  let fixture: ComponentFixture<StopUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StopUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StopUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
