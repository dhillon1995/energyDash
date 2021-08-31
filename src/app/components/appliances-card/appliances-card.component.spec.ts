import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppliancesCardComponent } from './appliances-card.component';

describe('AppliancesCardComponent', () => {
  let component: AppliancesCardComponent;
  let fixture: ComponentFixture<AppliancesCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppliancesCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppliancesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
