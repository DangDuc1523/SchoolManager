import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeClassComponent } from './time-class.component';

describe('TimeClassComponent', () => {
  let component: TimeClassComponent;
  let fixture: ComponentFixture<TimeClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeClassComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
