import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CosttabComponent } from './costtab.component';

describe('CosttabComponent', () => {
  let component: CosttabComponent;
  let fixture: ComponentFixture<CosttabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CosttabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CosttabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
