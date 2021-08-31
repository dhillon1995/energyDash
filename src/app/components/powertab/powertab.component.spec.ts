import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PowertabComponent } from './powertab.component';

describe('PowertabComponent', () => {
  let component: PowertabComponent;
  let fixture: ComponentFixture<PowertabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PowertabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PowertabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
