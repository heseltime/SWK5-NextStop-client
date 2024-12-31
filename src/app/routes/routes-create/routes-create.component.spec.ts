import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutesCreateComponent } from './routes-create.component';

describe('RoutesCreateComponent', () => {
  let component: RoutesCreateComponent;
  let fixture: ComponentFixture<RoutesCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoutesCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoutesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
