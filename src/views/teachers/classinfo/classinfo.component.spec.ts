import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassInfoComponent } from './classinfo.component';

describe('ClassinfoComponent', () => {
  let component: ClassInfoComponent;
  let fixture: ComponentFixture<ClassInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
