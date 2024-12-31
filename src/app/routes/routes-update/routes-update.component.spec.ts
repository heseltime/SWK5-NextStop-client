import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutesUpdateComponent } from './routes-update.component';

describe('RoutesUpdateComponent', () => {
  let component: RoutesUpdateComponent;
  let fixture: ComponentFixture<RoutesUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoutesUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoutesUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
