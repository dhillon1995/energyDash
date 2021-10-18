import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dial2Component } from './dial2.component';

describe('Dial2Component', () => {
  let component: Dial2Component;
  let fixture: ComponentFixture<Dial2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Dial2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Dial2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
