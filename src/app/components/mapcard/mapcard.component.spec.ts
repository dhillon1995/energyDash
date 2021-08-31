import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapcardComponent } from './mapcard.component';

describe('MapcardComponent', () => {
  let component: MapcardComponent;
  let fixture: ComponentFixture<MapcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapcardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
