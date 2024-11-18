import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ListClassManagerComponent } from './list-class-manager.component';

describe('ListClassManagerComponent', () => {
  let component: ListClassManagerComponent;
  let fixture: ComponentFixture<ListClassManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListClassManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListClassManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
