import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphtestComponent } from './graphtest.component';

describe('GraphtestComponent', () => {
  let component: GraphtestComponent;
  let fixture: ComponentFixture<GraphtestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphtestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphtestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
