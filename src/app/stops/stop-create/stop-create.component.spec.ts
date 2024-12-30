import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StopCreateComponent } from './stop-create.component';

describe('StopCreateComponent', () => {
  let component: StopCreateComponent;
  let fixture: ComponentFixture<StopCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StopCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StopCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
