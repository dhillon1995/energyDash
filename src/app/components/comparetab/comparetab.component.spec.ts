import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparetabComponent } from './comparetab.component';

describe('ComparetabComponent', () => {
  let component: ComparetabComponent;
  let fixture: ComponentFixture<ComparetabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComparetabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparetabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
