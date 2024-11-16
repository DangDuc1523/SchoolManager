import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainManagerComponent } from './main-manager.component';

describe('MainManagerComponent', () => {
  let component: MainManagerComponent;
  let fixture: ComponentFixture<MainManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
