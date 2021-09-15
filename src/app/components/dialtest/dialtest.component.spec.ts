import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialtestComponent } from './dialtest.component';

describe('DialtestComponent', () => {
  let component: DialtestComponent;
  let fixture: ComponentFixture<DialtestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialtestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialtestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
