import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportGradeComponent } from './import-grade.component';

describe('ImportGradeComponent', () => {
  let component: ImportGradeComponent;
  let fixture: ComponentFixture<ImportGradeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportGradeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportGradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
