import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IframetestComponent } from './iframetest.component';

describe('IframetestComponent', () => {
  let component: IframetestComponent;
  let fixture: ComponentFixture<IframetestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IframetestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IframetestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
