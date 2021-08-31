import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvironmenttabComponent } from './environmenttab.component';

describe('EnvironmenttabComponent', () => {
  let component: EnvironmenttabComponent;
  let fixture: ComponentFixture<EnvironmenttabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnvironmenttabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvironmenttabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
