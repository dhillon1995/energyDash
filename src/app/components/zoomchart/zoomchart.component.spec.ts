import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoomchartComponent } from './zoomchart.component';

describe('ZoomchartComponent', () => {
  let component: ZoomchartComponent;
  let fixture: ComponentFixture<ZoomchartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZoomchartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoomchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
