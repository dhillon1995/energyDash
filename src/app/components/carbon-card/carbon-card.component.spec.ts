import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarbonCardComponent } from './carbon-card.component';

describe('CarbonCardComponent', () => {
  let component: CarbonCardComponent;
  let fixture: ComponentFixture<CarbonCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarbonCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarbonCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
