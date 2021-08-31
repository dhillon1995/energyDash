import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppliancestabComponent } from './appliancestab.component';

describe('AppliancestabComponent', () => {
  let component: AppliancestabComponent;
  let fixture: ComponentFixture<AppliancestabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppliancestabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppliancestabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
