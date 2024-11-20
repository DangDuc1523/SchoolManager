import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllGradeComponent } from './all-grade.component';

describe('AllGradeComponent', () => {
  let component: AllGradeComponent;
  let fixture: ComponentFixture<AllGradeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllGradeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllGradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
